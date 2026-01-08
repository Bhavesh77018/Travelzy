
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { ShieldCheck, DollarSign, TrendingUp } from 'lucide-react';
import { cn } from '../../utils/cn';

export const AdminSidebar: React.FC = () => {
    const {
        view,
        vendors,
        tickets,
        navigateToAdminDashboard,
        navigateToAdminVendors,
        navigateToAdminTrips,
        navigateToAdminPayouts,
        navigateToAdminSupport,
        navigateToAdminMarketing,
        navigateToCustomerHome,
        // Search
        searchQuery,
        setSearchQuery,
        searchResults,
        navigateToVendorDetail,
        navigateToTripDetail,
        navigateToPayoutDetail
    } = useAppState();

    const pendingVerifications = vendors.filter(v => !v.isVerified).length;
    const openTickets = tickets.filter(t => t.status === 'OPEN').length;

    const NavItem = ({ label, onClick, active, badge, icon: Icon }: { label: string, onClick: () => void, active: boolean, badge?: number, icon?: any }) => (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start font-medium",
                active ? "bg-primary/10 text-primary" : "text-gray-500"
            )}
            onClick={onClick}
        >
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            <span className="flex-1 text-left">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                    {badge}
                </span>
            )}
        </Button>
    );

    return (
        <div className="w-64 bg-white border-r border-gray-100 p-6 space-y-8 flex flex-col h-screen fixed left-0 top-0 shadow-xl z-50">
            <div className="flex items-center gap-2 font-black text-2xl text-primary tracking-tighter">
                <ShieldCheck className="h-8 w-8" /> ADMIN
            </div>

            {/* Global Search */}
            <div className="relative z-50">
                <input
                    type="text"
                    placeholder="Search vendors, trips..."
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded-md bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-muted-foreground">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </div>

                {/* Search Results Dropdown */}
                {searchQuery.trim() !== '' && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg border border-gray-100 max-h-64 overflow-y-auto">
                        {searchResults.length > 0 ? (
                            <div className="py-1">
                                {searchResults.map((result) => (
                                    <button
                                        key={result.id}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                        onClick={() => {
                                            if (result.type === 'VENDOR') navigateToVendorDetail(result.id);
                                            else if (result.type === 'TRIP') navigateToTripDetail(result.id);
                                            else if (result.type === 'PAYOUT') navigateToPayoutDetail(result.id);
                                            setSearchQuery(''); // Clear search after selection
                                        }}
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${result.type === 'VENDOR' ? 'bg-blue-100 text-blue-700' :
                                            result.type === 'TRIP' ? 'bg-orange-100 text-orange-700' :
                                                'bg-green-100 text-green-700'
                                            }`}>
                                            {result.type[0]}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm text-gray-900 line-clamp-1">{result.title}</div>
                                            <div className="text-xs text-gray-500 line-clamp-1">{result.subtitle}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">No results found</div>
                        )}
                    </div>
                )}
            </div>

            <nav className="space-y-2 flex-1">
                <NavItem
                    label="Overview"
                    onClick={navigateToAdminDashboard}
                    active={view === 'ADMIN_DASHBOARD'}
                />
                <NavItem
                    label="Vendors"
                    onClick={navigateToAdminVendors}
                    active={view === 'ADMIN_VENDORS'}
                    badge={pendingVerifications}
                />
                <NavItem
                    label="Trip Requests"
                    onClick={navigateToAdminTrips}
                    active={view === 'ADMIN_TRIPS'}
                />
                <NavItem
                    label="Financial Payouts"
                    onClick={navigateToAdminPayouts}
                    active={view === 'ADMIN_PAYOUTS'}
                    icon={DollarSign}
                />
                <NavItem
                    label="Support Tickets"
                    onClick={navigateToAdminSupport}
                    active={view === 'ADMIN_SUPPORT'}
                    badge={openTickets}
                />
                <NavItem
                    label="Marketing Tools"
                    onClick={navigateToAdminMarketing}
                    active={view === 'ADMIN_MARKETING'}
                    icon={TrendingUp}
                />
            </nav>
        </div>
    );
};
