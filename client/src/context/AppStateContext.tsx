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
    { id: 'v1', businessName: 'Himalayan Adven.', email: 'himalaya@vendor.com', isVerified: true, revenue: 150000, joinedDate: '2024-01-15', credits: 100 },
    { id: 'v2', businessName: 'Goa Explores', email: 'goa@vendor.com', isVerified: false, revenue: 45000, joinedDate: '2024-03-10', credits: 50 },
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
};

// Define the Context Type
export interface AppContextType extends AppState {
    navigateToCustomerHome: () => void;
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
    navigateToTripDetail: (tripId: string) => void;
    navigateToBookingCheckout: (bookingData: BookingData) => void;
    navigateToBookingConfirmation: (bookingId: string) => void;
    navigateToAdminLogin: () => void;
    navigateToAdminDashboard: () => void;
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>(INITIAL_STATE);

    useEffect(() => {
        const fetchDeep = async () => {
            try {
                const [tripsRes, vendorsRes, ticketsRes] = await Promise.all([
                    fetch('http://localhost:3000/api/trips'),
                    fetch('http://localhost:3000/api/vendors'),
                    fetch('http://localhost:3000/api/tickets')
                ]);

                if (tripsRes.ok && vendorsRes.ok && ticketsRes.ok) {
                    const trips = await tripsRes.json();
                    const vendors = await vendorsRes.json();
                    const tickets = await ticketsRes.json();

                    setState(prev => ({
                        ...prev,
                        trips: trips.length > 0 ? trips : [], // Fallback if API returns empty but we want robustness
                        vendors: vendors,
                        tickets: tickets
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch initial data:', error);
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
            const response = await fetch(`http://localhost:3000/api/vendors/${vendorId}/verify`, {
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
            const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}/resolve`, {
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

    const value: AppContextType = {
        ...state,
        navigateToCustomerHome,
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
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
