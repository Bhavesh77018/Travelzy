import React from 'react';
import { useAppState } from './hooks/useAppState';
import { CustomerHomePage } from './components/CustomerHomePage';
import { TripDetailPage } from './components/TripDetailPage';
import { BookingCheckout } from './components/BookingCheckout';
import { BookingConfirmation } from './components/BookingConfirmation';
import { CustomerDashboard } from './components/CustomerDashboard';
import { VendorLanding } from './components/LandingPage';
import { DashboardOverview } from './components/DashboardOverview';
import { VendorTripsPage } from './components/vendor/VendorTripsPage';
import { AddTripForm } from './components/vendor/AddTripForm';
import { VendorBookingsPage } from './components/vendor/VendorBookingsPage';

import { DestinationsPage } from './components/public/DestinationsPage';
import { DealsPage } from './components/public/DealsPage';
import { AboutPage } from './components/public/AboutPage';
import { MarketingTools } from './components/vendor/MarketingTools';
import { FinancialManagement } from './components/vendor/FinancialManagement';
import { CustomerManagement } from './components/vendor/CustomerManagement';
import { ProfileManagement } from './components/vendor/ProfileManagement';
import { PlatformTutorial } from './components/vendor/PlatformTutorial';
import { SupportPage } from './components/vendor/SupportPage';
import { VendorOnboarding } from './components/VendorOnboarding';
import { ChatSupportPage } from './components/support/ChatSupportPage';
import { VendorLoginPage } from './components/auth/VendorLoginPage';
import { VendorSignupPage } from './components/auth/VendorSignupPage';
import { AiTravelAssistant } from './components/AiTravelAssistant';
import { VendorMessagesPage } from './components/messaging/VendorMessagesPage';
import { SearchResultsPage } from './components/SearchResultsPage';


const App: React.FC = () => {
  const { view } = useAppState();

  const renderView = () => {
    switch (view) {
      case 'CUSTOMER_HOME':
        return <CustomerHomePage />;
      case 'SEARCH_RESULTS':
        return <SearchResultsPage />;
      case 'TRIP_DETAIL':
        return <TripDetailPage />;
      case 'BOOKING_CHECKOUT':
        return <BookingCheckout />;
      case 'BOOKING_CONFIRMATION':
        return <BookingConfirmation />;
      case 'CUSTOMER_DASHBOARD':
        return <CustomerDashboard />;
      case 'VENDOR_LANDING':
        return <VendorLanding />;
      case 'VENDOR_DASHBOARD':
        return <DashboardOverview />;
      case 'VENDOR_TRIPS':
        return <VendorTripsPage />;
      case 'VENDOR_ADD_TRIP':
        return <AddTripForm />;
      case 'VENDOR_BOOKINGS':
        return <VendorBookingsPage />;
      case 'VENDOR_MARKETING':
        return <MarketingTools />;
      case 'VENDOR_FINANCE':
        return <FinancialManagement />;
      case 'VENDOR_CUSTOMERS':
        return <CustomerManagement />;
      case 'VENDOR_PROFILE':
        return <ProfileManagement />;
      case 'VENDOR_TUTORIAL':
        return <PlatformTutorial />;
      case 'VENDOR_SUPPORT':
        return <SupportPage />;
      case 'VENDOR_ONBOARDING':
        return <VendorOnboarding />;
      case 'VENDOR_LOGIN':
        return <VendorLoginPage />;
      case 'VENDOR_SIGNUP':
        return <VendorSignupPage />;
      case 'VENDOR_MESSAGES':
        return <VendorMessagesPage />;

      // Admin routes removed from Client App
      case 'DESTINATIONS':
        return <DestinationsPage />;
      case 'DEALS':
        return <DealsPage />;
      case 'ABOUT':
        return <AboutPage />;
      case 'SUPPORT':
        return <ChatSupportPage />;
      default:
        return <CustomerHomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased text-balance">
      {renderView()}
      <AiTravelAssistant />
    </div>
  );
};

export default App;
