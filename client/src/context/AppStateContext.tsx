import React, { createContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type {
    AppState,
    AppView,
    VendorTab,
    CustomerUser,
    VendorUser,
    BookingData,
    Booking,
    Trip,
    SupportTicket,
    VendorProfile
} from '../types';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { TripService } from '../services/TripService';
// import { AuthService } from '../services/AuthService';
import { MessageService } from '../services/MessageService';

// --- Mock Data moved from hook ---
const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK123', trip: 'Magical Ladakh', customer: 'Alice Johnson', date: '2025-04-15', status: 'CONFIRMED', guests: 2, total: 49998 },
    { id: 'BK124', trip: 'Goa Beach Retreat', customer: 'Bob Smith', date: '2025-03-10', status: 'PENDING', guests: 1, total: 15999 },
    { id: 'BK125', trip: 'Magical Ladakh', customer: 'Charlie Brown', date: '2025-05-20', status: 'CANCELLED', guests: 4, total: 99996 },
];

const MOCK_TICKETS: SupportTicket[] = [
    { id: 'TK1', user: 'Alice Johnson', subject: 'Refund Request', status: 'OPEN', messages: [{ sender: 'user', text: 'I need a refund for my trip.', timestamp: '2025-01-01' }] },
    { id: 'TK2', user: 'Bob Smith', subject: 'Booking Issue', status: 'RESOLVED', messages: [{ sender: 'user', text: 'Cannot book trip.', timestamp: '2024-12-20' }] },
];

const MOCK_VENDORS: VendorProfile[] = [
    { id: 'v1', businessName: 'Himalayan Adven.', email: 'himalaya@vendor.com', isVerified: true, revenue: 150000, joinedDate: '2024-01-15', credits: 100, status: 'VERIFIED' },
    { id: 'v2', businessName: 'Goa Explores', email: 'goa@vendor.com', isVerified: false, revenue: 45000, joinedDate: '2024-03-10', credits: 50, status: 'PENDING' },
];

const INITIAL_STATE: AppState = {
    view: 'CUSTOMER_HOME',
    activeVendorTab: 'OVERVIEW',
    customerUser: null,
    vendorUser: null,
    selectedTripId: null,
    bookingData: null,
    confirmedBookingId: null,
    showCouponLogin: false,
    onboardingCompleted: false,
    trips: [], // Initial empty state, will fetch from API
    bookings: MOCK_BOOKINGS,
    tickets: MOCK_TICKETS,
    vendors: MOCK_VENDORS,
    messages: [],
    conversations: [],
};

// Define the Context Type
export interface AppContextType extends AppState {
    navigateToCustomerHome: () => void;
    navigateToSearchResults: (query: string) => void;
    navigateToCustomerDashboard: () => void;
    navigateToVendorLanding: () => void;
    navigateToVendorDashboard: () => void;
    navigateToVendorTrips: () => void;
    navigateToVendorAddTrip: () => void;
    navigateToVendorBookings: () => void;
    navigateToVendorMarketing: () => void;
    navigateToVendorFinance: () => void;
    navigateToVendorCustomers: () => void;
    navigateToVendorProfile: () => void;
    navigateToVendorTutorial: () => void;
    navigateToVendorSupport: () => void;
    navigateToVendorOnboarding: () => void;
    navigateToVendorLogin: () => void;

    navigateToVendorSignup: () => void;
    navigateToVendorMessages: () => void;
    navigateToTripDetail: (tripId: string) => void;
    navigateToBookingCheckout: (bookingData: BookingData) => void;
    navigateToBookingConfirmation: (bookingId: string) => void;
    navigateToAdminLogin: () => void;
    navigateToAdminDashboard: () => void;
    navigateToAdminVendors: () => void;
    navigateToAdminTrips: () => void;
    navigateToAdminSupport: () => void;
    navigateToDestinations: () => void;
    navigateToDeals: () => void;
    navigateToAbout: () => void;
    navigateToSupport: () => void;
    setCustomerUser: (user: CustomerUser | null) => void;
    setVendorUser: (user: VendorUser | null) => void;
    setActiveVendorTab: (tab: VendorTab) => void;
    addTrip: (trip: Trip) => void;
    deleteTrip: (tripId: string) => void;
    updateBookingStatus: (bookingId: string, status: 'CONFIRMED' | 'CANCELLED') => void;
    verifyVendor: (vendorId: string) => void;
    resolveTicket: (ticketId: string) => void;
    sendMessage: (text: string, tripId: string, vendorId: string, senderRole: 'customer' | 'vendor') => void;
    getConversationsForVendor: (vendorId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>(INITIAL_STATE);

    useEffect(() => {
        const fetchDeep = async () => {
            try {
                // Initialize with Service Layer calls
                const trips = await TripService.getAllTrips();
                // Simulate other fetches or keep mocks for now

                setState(prev => ({
                    ...prev,
                    trips: trips,
                    vendors: MOCK_VENDORS, // Can migrate to VendorService later
                    tickets: MOCK_TICKETS
                }));

            } catch (error) {
                console.error('Failed to fetch initial data:', error);
                // Fallback handled by initial state
            }
        };

        fetchDeep();
    }, []);

    const navigateTo = useCallback((view: AppView) => {
        setState(prev => ({ ...prev, view }));
        window.scrollTo(0, 0);
    }, []);

    // Navigation Wrappers
    const navigateToCustomerHome = () => navigateTo('CUSTOMER_HOME');
    const navigateToSearchResults = (query: string) => {
        // We use window.history to update URL for query params
        window.history.pushState({}, '', `/?q=${query}&view=search`);
        setState(prev => ({ ...prev, view: 'SEARCH_RESULTS' }));
        window.scrollTo(0, 0);
    };
    const navigateToCustomerDashboard = () => navigateTo('CUSTOMER_DASHBOARD');
    const navigateToVendorLanding = () => navigateTo('VENDOR_LANDING');
    const navigateToVendorDashboard = () => navigateTo('VENDOR_DASHBOARD');
    const navigateToVendorTrips = () => navigateTo('VENDOR_TRIPS');
    const navigateToVendorAddTrip = () => navigateTo('VENDOR_ADD_TRIP');
    const navigateToVendorBookings = () => navigateTo('VENDOR_BOOKINGS');
    const navigateToVendorMarketing = () => navigateTo('VENDOR_MARKETING');
    const navigateToVendorFinance = () => navigateTo('VENDOR_FINANCE');
    const navigateToVendorCustomers = () => navigateTo('VENDOR_CUSTOMERS');
    const navigateToVendorProfile = () => navigateTo('VENDOR_PROFILE');
    const navigateToVendorTutorial = () => navigateTo('VENDOR_TUTORIAL');
    const navigateToVendorSupport = () => navigateTo('VENDOR_SUPPORT');
    const navigateToVendorOnboarding = () => navigateTo('VENDOR_ONBOARDING');
    const navigateToVendorLogin = () => navigateTo('VENDOR_LOGIN');

    const navigateToVendorSignup = () => navigateTo('VENDOR_SIGNUP');
    const navigateToVendorMessages = () => navigateTo('VENDOR_MESSAGES');

    const navigateToAdminLogin = () => navigateTo('ADMIN_LOGIN');
    const navigateToAdminDashboard = () => navigateTo('ADMIN_DASHBOARD');
    const navigateToAdminVendors = () => navigateTo('ADMIN_VENDORS');
    const navigateToAdminTrips = () => navigateTo('ADMIN_TRIPS');
    const navigateToAdminSupport = () => navigateTo('ADMIN_SUPPORT');

    const navigateToDestinations = () => navigateTo('DESTINATIONS');
    const navigateToDeals = () => navigateTo('DEALS');
    const navigateToAbout = () => navigateTo('ABOUT');
    const navigateToSupport = () => navigateTo('SUPPORT');

    const navigateToTripDetail = (tripId: string) => {
        setState(prev => ({ ...prev, selectedTripId: tripId, view: 'TRIP_DETAIL' }));
        window.scrollTo(0, 0);
    };

    const navigateToBookingCheckout = (bookingData: BookingData) => {
        setState(prev => ({
            ...prev,
            bookingData,
            view: 'BOOKING_CHECKOUT'
        }));
        window.scrollTo(0, 0);
    };

    const navigateToBookingConfirmation = (bookingId: string) => {
        setState(prev => ({
            ...prev,
            confirmedBookingId: bookingId,
            view: 'BOOKING_CONFIRMATION'
        }));
        window.scrollTo(0, 0);
    };

    // State Setters
    const setCustomerUser = (user: CustomerUser | null) => {
        setState(prev => ({ ...prev, customerUser: user }));
    };

    const setVendorUser = (user: VendorUser | null) => {
        setState(prev => ({ ...prev, vendorUser: user }));
    };

    const setActiveVendorTab = (tab: VendorTab) => {
        setState(prev => ({ ...prev, activeVendorTab: tab }));
    };

    // Actions
    const addTrip = (trip: Trip) => {
        setState(prev => ({ ...prev, trips: [...prev.trips, trip], view: 'VENDOR_TRIPS' }));
    };

    const deleteTrip = (tripId: string) => {
        setState(prev => ({ ...prev, trips: prev.trips.filter(t => t.id !== tripId) }));
    };

    const updateBookingStatus = (bookingId: string, status: 'CONFIRMED' | 'CANCELLED') => {
        setState(prev => ({
            ...prev,
            bookings: prev.bookings.map(b => b.id === bookingId ? { ...b, status } : b)
        }));
    };

    const verifyVendor = async (vendorId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/verify`, {
                method: 'POST'
            });

            if (response.ok) {
                setState(prev => ({
                    ...prev,
                    vendors: prev.vendors.map(v => v.id === vendorId ? { ...v, isVerified: !v.isVerified } : v)
                }));
            }
        } catch (error) {
            console.error('Failed to verify vendor:', error);
        }
    };

    const resolveTicket = async (ticketId: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/resolve`, {
                method: 'POST'
            });

            if (response.ok) {
                setState(prev => ({
                    ...prev,
                    tickets: prev.tickets.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED' } : t)
                }));
            }
        } catch (error) {
            console.error('Failed to resolve ticket:', error);
        }
    };

    // --- Messaging Logic (Via Service) ---
    const sendMessage = async (text: string, tripId: string, vendorId: string, senderRole: 'customer' | 'vendor') => {
        const newMessageTemplate: any = {
            id: 'msg_' + Date.now(),
            senderId: senderRole === 'customer' ? (state.customerUser?.id || 'guest') : vendorId,
            receiverId: senderRole === 'customer' ? vendorId : (state.customerUser?.id || 'guest'),
            senderRole,
            text,
            timestamp: new Date().toISOString(),
            tripId
        };

        // Call Service
        const savedMessage = await MessageService.sendMessage(newMessageTemplate);

        setState(prev => {
            // Update or create conversation
            const existingConvIndex = prev.conversations.findIndex(c => c.tripId === tripId && c.vendorId === vendorId);
            let updatedConversations = [...prev.conversations];

            if (existingConvIndex >= 0) {
                updatedConversations[existingConvIndex] = {
                    ...updatedConversations[existingConvIndex],
                    lastMessage: text,
                    lastMessageTimestamp: newMessageTemplate.timestamp,
                    unreadCount: senderRole === 'customer' ? updatedConversations[existingConvIndex].unreadCount + 1 : 0
                };
            } else {
                const trip = prev.trips.find(t => t.id === tripId);
                updatedConversations.push({
                    id: 'conv_' + Date.now(),
                    vendorId,
                    vendorName: prev.vendors.find(v => v.id === vendorId)?.businessName || 'Agency',
                    customerId: state.customerUser?.id || 'guest',
                    customerName: state.customerUser?.name || 'Guest User',
                    tripId,
                    tripTitle: trip?.title || 'Trip Inquiry',
                    lastMessage: text,
                    lastMessageTimestamp: newMessageTemplate.timestamp,
                    unreadCount: 1
                });
            }

            return {
                ...prev,
                messages: [...prev.messages, savedMessage],
                conversations: updatedConversations
            };
        });
    };

    const getConversationsForVendor = (vendorId: string) => {
        // This is just a helper, state already has all conversations.
        // In a real app, this might fetch from backend.
        console.log('Fetching conversations for vendor:', vendorId);
    };

    const value: AppContextType = {
        ...state,
        navigateToCustomerHome,
        navigateToSearchResults,
        navigateToCustomerDashboard,
        navigateToVendorLanding,
        navigateToVendorDashboard,
        navigateToVendorTrips,
        navigateToVendorAddTrip,
        navigateToVendorBookings,
        navigateToVendorMarketing,
        navigateToVendorFinance,
        navigateToVendorCustomers,
        navigateToVendorProfile,
        navigateToVendorTutorial,
        navigateToVendorSupport,
        navigateToVendorOnboarding,
        navigateToVendorLogin,
        navigateToVendorSignup,
        navigateToVendorMessages,
        navigateToTripDetail,
        navigateToBookingCheckout,
        navigateToBookingConfirmation,
        navigateToAdminLogin,
        navigateToAdminDashboard,
        navigateToAdminVendors,
        navigateToAdminTrips,
        navigateToAdminSupport,
        navigateToDestinations,
        navigateToDeals,
        navigateToAbout,
        navigateToSupport,
        setCustomerUser,
        setVendorUser,
        setActiveVendorTab,
        addTrip,
        deleteTrip,
        updateBookingStatus,
        verifyVendor,
        resolveTicket,
        sendMessage,
        getConversationsForVendor,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
