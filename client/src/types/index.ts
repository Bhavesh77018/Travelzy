export interface Trip {
    id: string;
    title: string;
    destination: string;
    duration: number; // days
    price: number;
    images: string[];
    description: string;
    type: 'adventure' | 'leisure' | 'family' | 'romantic' | 'spiritual';
    category?: string;
    rating: number;
    reviews: number;
    itinerary: ItineraryDay[];
    inclusions: string[];
    exclusions: string[];
    dates: string[];
    vendorId: string; // Added for messaging context
    pricing?: { // Made optional for backward compatibility
        single: number;
        double: number;
        triple: number;
        quad: number;
    };
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    isPromoted?: boolean;
}

export interface ItineraryDay {
    day: number;
    title: string;
    activities: string[];
}

export interface CustomerUser {
    id: string;
    name: string;
    email: string;
    phone?: string;
    bookings: string[]; // Booking IDs
}

export interface VendorUser {
    id: string;
    businessName: string;
    email: string;
    mobile?: string;
    credits: number;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    documents?: {
        type: 'company' | 'individual';
        urls: string[];
    };
}

export interface BookingData {
    tripId: string;
    date: string;
    guests: {
        adults: number;
        children: number;
    };
    totalPrice: number;
    sharing: 'single' | 'double' | 'triple';
}

export type AppView =
    | 'CUSTOMER_HOME'
    | 'CUSTOMER_LOGIN'
    | 'TRIP_DETAIL'
    | 'BOOKING_CHECKOUT'
    | 'BOOKING_CONFIRMATION'
    | 'CUSTOMER_DASHBOARD'
    | 'VENDOR_LANDING'
    | 'VENDOR_LOGIN'
    | 'VENDOR_ONBOARDING'
    | 'VENDOR_SIGNUP'
    | 'VENDOR_DASHBOARD'
    | 'VENDOR_TRIPS'
    | 'VENDOR_ADD_TRIP'
    | 'VENDOR_BOOKINGS'
    | 'VENDOR_MARKETING'
    | 'VENDOR_FINANCE'
    | 'VENDOR_CUSTOMERS'
    | 'VENDOR_PROFILE'
    | 'VENDOR_TUTORIAL'
    | 'VENDOR_SUPPORT'
    | 'VENDOR_MESSAGES'
    | 'ADMIN_LOGIN'  // New Separate Login
    | 'ADMIN_DASHBOARD'
    | 'ADMIN_VENDORS'
    | 'ADMIN_TRIPS'  // New Trip Verification Page
    | 'ADMIN_SUPPORT'
    | 'DESTINATIONS'
    | 'DEALS'
    | 'ABOUT'
    | 'SUPPORT'
    | 'SEARCH_RESULTS';

export interface SupportTicket {
    id: string;
    user: string;
    subject: string;
    status: 'OPEN' | 'RESOLVED';
    messages: { sender: 'user' | 'admin', text: string, timestamp: string }[];
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    senderRole: 'customer' | 'vendor';
    text: string;
    timestamp: string;
    tripId?: string;
}

export interface Conversation {
    id: string;
    vendorId: string;
    vendorName: string;
    customerId: string;
    customerName: string;
    tripId?: string;
    tripTitle?: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    unreadCount: number;
}

export interface VendorProfile extends VendorUser {
    isVerified: boolean; // Keeping for backward compatibility, sync with status
    revenue: number;
    joinedDate: string;
}

export type VendorTab =
    | 'OVERVIEW'
    | 'TRIPS'
    | 'BOOKINGS'
    | 'ANALYTICS'
    | 'FINANCIAL'
    | 'MARKETING'
    | 'CUSTOMERS'
    | 'PROFILE'
    | 'SUPPORT'
    | 'TUTORIAL';

export interface AppState {
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
    // Messaging State
    messages: Message[];
    conversations: Conversation[];
}

export interface Booking {
    id: string;
    trip: string;
    customer: string;
    date: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
    guests: number;
    total: number;
}
