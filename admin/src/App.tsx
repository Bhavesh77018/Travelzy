import React from 'react';
import { useAppState } from './hooks/useAppState';

import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminVendorsPage } from './components/admin/AdminVendorsPage';
import { AdminTripRequestsPage } from './components/admin/AdminTripRequestsPage';
import { AdminPayoutsPage } from './components/admin/AdminPayoutsPage';
import { AdminVendorDetailPage } from './components/admin/AdminVendorDetailPage';
import { AdminTripDetailPage } from './components/admin/AdminTripDetailPage';
import { AdminPayoutDetailPage } from './components/admin/AdminPayoutDetailPage';
import { AdminSupportPage } from './components/admin/AdminSupportPage';
import { AdminMarketingPage } from './components/admin/AdminMarketingPage';

import { AdminLoginPage } from './components/admin/AdminLoginPage';

const App: React.FC = () => {
  console.log('App.tsx is rendering');
  const { view } = useAppState();

  const renderView = () => {
    switch (view) {
      case 'ADMIN_LOGIN':
        return <AdminLoginPage />;
      case 'ADMIN_DASHBOARD':
        return <AdminDashboard />;
      case 'ADMIN_VENDORS':
        return <AdminVendorsPage />;
      case 'ADMIN_VENDOR_DETAIL':
        return <AdminVendorDetailPage />;
      case 'ADMIN_TRIPS':
        return <AdminTripRequestsPage />;
      case 'ADMIN_TRIP_DETAIL':
        return <AdminTripDetailPage />;
      case 'ADMIN_PAYOUTS':
        return <AdminPayoutsPage />;
      case 'ADMIN_PAYOUT_DETAIL':
        return <AdminPayoutDetailPage />;
      case 'ADMIN_SUPPORT':
        return <AdminSupportPage />;
      case 'ADMIN_MARKETING':
        return <AdminMarketingPage />;
      default:
        // Default to login for any other state in the separate Admin Portal
        return <AdminLoginPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased text-balance">
      {renderView()}
    </div>
  );
};

export default App;
