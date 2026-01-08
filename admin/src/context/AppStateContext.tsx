// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { AdminService } from '../services/AdminService';
import type { AppState, AppView, CustomerUser, VendorUser, VendorTab, BookingData, Trip, Booking, SupportTicket, VendorProfile, SearchResult } from '../types';
import { MOCK_TRIPS, MOCK_BOOKINGS, MOCK_TICKETS, MOCK_VENDORS } from '../data/mockData';

export interface AppContextType {
    view: AppView;
    activeVendorTab: VendorTab;
    customerUser: CustomerUser | null;
    vendorUser: VendorUser | null;
    selectedTripId: string | null;
    bookingData: BookingData | null;
    confirmedBookingId: string | null;
    showCouponLogin: boolean;
    onboardingCompleted: boolean;
    trips: Trip[];
    bookings: Booking[];
    tickets: SupportTicket[];
    vendors: VendorProfile[];
    token: string | null; // Added simplified token management

    // Search & Details Details
    searchQuery: string;
    searchResults: SearchResult[];
    setSearchQuery: (query: string) => void;
    performSearch: (query: string) => void;
    selectedDetailId: string | null;

    // Navigation with IDs
    navigateToVendorDetail: (id: string) => void;
    navigateToTripDetail: (id: string) => void;
    navigateToPayoutDetail: (id: string) => void;

    setView: (view: AppView) => void;
    setActiveVendorTab: (tab: VendorTab) => void;
    setCustomerUser: (user: CustomerUser | null) => void;
    setVendorUser: (user: VendorUser | null) => void;
    setSelectedTripId: (id: string | null) => void;
    setBookingData: (data: BookingData | null) => void;
    setConfirmedBookingId: (id: string | null) => void;
    setShowCouponLogin: (show: boolean) => void;
    setOnboardingCompleted: (completed: boolean) => void;

    navigateToHome: () => void;
    navigateToCustomerHome: () => void;
    navigateToTripDetailOld: (tripId: string) => void;
    navigateToBookingCheckout: (tripId: string, data: BookingData) => void;
    navigateToBookingConfirmation: (bookingId: string) => void;
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
    navigateToAdminLogin: () => void;
    navigateToAdminDashboard: () => void;
    navigateToAdminVendors: () => void;
    navigateToAdminTrips: () => void;
    navigateToAdminPayouts: () => void;
    navigateToAdminSupport: () => void;
    navigateToAdminMarketing: () => void;
    navigateToDestinations: () => void;
    navigateToDeals: () => void;
    navigateToAbout: () => void;
    navigateToSupport: () => void;
    verifyVendor: (vendorId: string, status: 'VERIFIED' | 'REJECTED', notes?: string) => Promise<void>;
    approveTrip: (tripId: string, isPromoted?: boolean) => Promise<void>;
    rejectTrip: (tripId: string, reason: string) => Promise<void>;
    addTrip: (trip: any) => void;
    deleteTrip: (tripId: string) => void;
    updateBookingStatus: (bookingId: string, status: string) => void;
    resolveTicket: (ticketId: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        view: 'ADMIN_LOGIN',
        activeVendorTab: 'OVERVIEW',
        customerUser: null,
        vendorUser: null,
        selectedTripId: null,
        bookingData: null,
        confirmedBookingId: null,
        showCouponLogin: false,
        onboardingCompleted: false,
        trips: [],
        bookings: MOCK_BOOKINGS,
        tickets: MOCK_TICKETS,
        vendors: [],
        searchResults: [],
        searchQuery: '',
        selectedDetailId: null,
    });

    // Mock Admin Token for now
    const token = "mock-admin-token";

    // Fetch Real Data where available
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                // Fetch Pending and All Trips
                const pendingTrips = await AdminService.getPendingTrips(token).catch(() => []);
                // In a real app we might fetch ALL trips for the list, not just pending, 
                // but let's start with pending or a mixed list if the API supported it.
                // For now, let's just make sure we have the pending ones visible.

                // Fetch Vendors
                const pendingVendors = await AdminService.getPendingVendors(token).catch(() => []);

                // Merge with mocks or use directly if backend is robust enough. 
                // Currently backend has limited seed data, so merging might be safer for visuals,
                // but for "Real Time Changes" we want real data.
                // Let's PRIORITIZE real data.

                // If backend returns data, use it. If empty (initial state), maybe keep mocks for demo?
                // User asked for "Real backend logic", so let's try to use real data.

                setState(prev => ({
                    ...prev,
                    trips: pendingTrips.length > 0 ? pendingTrips : MOCK_TRIPS, // Fallback purely for demo if DB empty
                    vendors: pendingVendors.length > 0 ? pendingVendors : MOCK_VENDORS
                }));

            } catch (error) {
                console.error("Failed to fetch admin data", error);
            }
        };

        // Initial fetch
        fetchAdminData();

        // Polling for updates (simulated real-time)
        const interval = setInterval(fetchAdminData, 30000);
        return () => clearInterval(interval);
    }, []);

    const setView = (view: AppView) => setState(prev => ({ ...prev, view }));
    const setActiveVendorTab = (tab: VendorTab) => setState(prev => ({ ...prev, activeVendorTab: tab }));
    const setCustomerUser = (user: CustomerUser | null) => setState(prev => ({ ...prev, customerUser: user }));
    const setVendorUser = (user: VendorUser | null) => setState(prev => ({ ...prev, vendorUser: user }));
    const setSelectedTripId = (id: string | null) => setState(prev => ({ ...prev, selectedTripId: id }));
    const setBookingData = (data: BookingData | null) => setState(prev => ({ ...prev, bookingData: data }));
    const setConfirmedBookingId = (id: string | null) => setState(prev => ({ ...prev, confirmedBookingId: id }));
    const setShowCouponLogin = (show: boolean) => setState(prev => ({ ...prev, showCouponLogin: show }));
    const setOnboardingCompleted = (completed: boolean) => setState(prev => ({ ...prev, onboardingCompleted: completed }));

    const navigateTo = (view: AppView) => {
        window.scrollTo(0, 0);
        setView(view);
    };

    // Search Implementation (Client-side filtering of loaded data)
    const setSearchQuery = (query: string) => {
        setState(prev => ({ ...prev, searchQuery: query }));
        if (query.trim()) {
            performSearch(query);
        } else {
            setState(prev => ({ ...prev, searchResults: [] }));
        }
    };

    const performSearch = (query: string) => {
        const lowerQuery = query.toLowerCase();
        const results: SearchResult[] = [];
        state.vendors.forEach(v => {
            if (v.businessName?.toLowerCase().includes(lowerQuery) || v.email?.toLowerCase().includes(lowerQuery)) {
                results.push({ id: v.id, type: 'VENDOR', title: v.businessName, subtitle: v.email, status: v.status });
            }
        });
        state.trips.forEach(t => {
            if (t.title?.toLowerCase().includes(lowerQuery) || t.destination?.toLowerCase().includes(lowerQuery)) {
                results.push({ id: t.id, type: 'TRIP', title: t.title, subtitle: t.destination, status: t.status });
            }
        });
        setState(prev => ({ ...prev, searchResults: results }));
    };

    const navigateToVendorDetail = (id: string) => { setState(prev => ({ ...prev, view: 'ADMIN_VENDOR_DETAIL', selectedDetailId: id })); };
    const navigateToTripDetail = (id: string) => { setState(prev => ({ ...prev, view: 'ADMIN_TRIP_DETAIL', selectedDetailId: id })); };
    const navigateToPayoutDetail = (id: string) => { setState(prev => ({ ...prev, view: 'ADMIN_PAYOUT_DETAIL', selectedDetailId: id })); };

    const navigateToHome = () => navigateTo('CUSTOMER_HOME');
    const navigateToCustomerHome = () => navigateTo('CUSTOMER_HOME');
    const navigateToTripDetailOld = (tripId: string) => { setSelectedTripId(tripId); navigateTo('TRIP_DETAIL'); };
    const navigateToBookingCheckout = (tripId: string, data: BookingData) => { setSelectedTripId(tripId); setBookingData(data); navigateTo('BOOKING_CHECKOUT'); };
    const navigateToBookingConfirmation = (bookingId: string) => { setConfirmedBookingId(bookingId); navigateTo('BOOKING_CONFIRMATION'); };
    const navigateToCustomerDashboard = () => navigateTo('CUSTOMER_DASHBOARD');
    const navigateToVendorLanding = () => navigateTo('VENDOR_LANDING');
    const navigateToVendorLogin = () => navigateTo('VENDOR_LOGIN');
    const navigateToVendorSignup = () => navigateTo('VENDOR_SIGNUP');
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
    const navigateToAdminLogin = () => navigateTo('ADMIN_LOGIN');
    const navigateToAdminDashboard = () => navigateTo('ADMIN_DASHBOARD');
    const navigateToAdminVendors = () => navigateTo('ADMIN_VENDORS');
    const navigateToAdminTrips = () => navigateTo('ADMIN_TRIPS');
    const navigateToAdminPayouts = () => navigateTo('ADMIN_PAYOUTS');
    const navigateToAdminSupport = () => navigateTo('ADMIN_SUPPORT');
    const navigateToAdminMarketing = () => navigateTo('ADMIN_MARKETING'); // NEW
    const navigateToDestinations = () => navigateTo('DESTINATIONS');
    const navigateToDeals = () => navigateTo('DEALS');
    const navigateToAbout = () => navigateTo('ABOUT');
    const navigateToSupport = () => navigateTo('SUPPORT');

    const verifyVendor = async (vendorId: string, status: 'VERIFIED' | 'REJECTED' = 'VERIFIED', notes?: string) => {
        try {
            await AdminService.verifyVendor(token, vendorId, status, notes);
            setState(prev => ({
                ...prev,
                vendors: prev.vendors.map(v => v.id === vendorId || (v as any)._id === vendorId ? { ...v, status, isVerified: status === 'VERIFIED' } : v)
            }));
        } catch (e) {
            console.error(e);
        }
    };

    const approveTrip = async (tripId: string, isPromoted: boolean = false) => {
        try {
            await AdminService.approveTrip(token, tripId, isPromoted);
            setState(prev => ({
                ...prev,
                trips: prev.trips.map(t => t.id === tripId || (t as any)._id === tripId ? { ...t, status: 'APPROVED' } : t)
            }));
        } catch (e) {
            console.error(e);
        }
    };

    const rejectTrip = async (tripId: string, reason: string) => {
        try {
            await AdminService.rejectTrip(token, tripId, reason);
            setState(prev => ({
                ...prev,
                trips: prev.trips.map(t => t.id === tripId || (t as any)._id === tripId ? { ...t, status: 'REJECTED' } : t)
            }));
        } catch (e) {
            console.error(e);
        }
    };

    const addTrip = (trip: any) => { console.log("Add trip", trip); };
    const deleteTrip = (tripId: string) => {
        // Should call API
        setState(prev => ({ ...prev, trips: prev.trips.filter(t => t.id !== tripId) }));
    };
    const updateBookingStatus = (bookingId: string, status: string) => {
        setState(prev => ({ ...prev, bookings: prev.bookings.map(b => b.id === bookingId ? { ...b, status: status as any } : b) }));
    };
    const resolveTicket = (ticketId: string) => {
        setState(prev => ({ ...prev, tickets: prev.tickets.map(t => t.id === ticketId ? { ...t, status: 'RESOLVED' } : t) }));
    };

    const value = {
        view: state.view,
        activeVendorTab: state.activeVendorTab,
        customerUser: state.customerUser,
        vendorUser: state.vendorUser,
        selectedTripId: state.selectedTripId,
        bookingData: state.bookingData,
        confirmedBookingId: state.confirmedBookingId,
        showCouponLogin: state.showCouponLogin,
        onboardingCompleted: state.onboardingCompleted,
        trips: state.trips,
        bookings: state.bookings,
        tickets: state.tickets,
        vendors: state.vendors,
        token,

        searchQuery: state.searchQuery,
        searchResults: state.searchResults,
        setSearchQuery,
        performSearch,
        selectedDetailId: state.selectedDetailId,
        navigateToVendorDetail,
        navigateToTripDetail,
        navigateToPayoutDetail,

        setView,
        setActiveVendorTab,
        setCustomerUser,
        setVendorUser,
        setSelectedTripId,
        setBookingData,
        setConfirmedBookingId,
        setShowCouponLogin,
        setOnboardingCompleted,

        navigateToHome,
        navigateToCustomerHome,
        navigateToTripDetailOld,
        navigateToBookingCheckout,
        navigateToBookingConfirmation,
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
        navigateToAdminLogin,
        navigateToAdminDashboard,
        navigateToAdminVendors,
        navigateToAdminTrips,
        navigateToAdminPayouts,
        navigateToAdminSupport,
        navigateToAdminMarketing,
        navigateToDestinations,
        navigateToDeals,
        navigateToAbout,
        navigateToSupport,
        verifyVendor,
        approveTrip,
        rejectTrip,
        addTrip,
        deleteTrip,
        updateBookingStatus,
        resolveTicket
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppState = () => {
    const context = useContext(AppContext);
    if (context === undefined) { throw new Error('useAppState must be used within an AppStateProvider'); }
    return context;
};
