import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import {
    LayoutDashboard,
    Plane,
    CalendarCheck,
    Wallet,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    GraduationCap,
    Megaphone
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Sidebar: React.FC = () => {
    const {
        view,
        navigateToVendorDashboard,
        navigateToVendorTrips,
        navigateToVendorBookings,
        navigateToVendorMarketing,
        navigateToVendorFinance,
        navigateToVendorCustomers,
        navigateToVendorProfile,
        navigateToVendorSupport,
        navigateToVendorTutorial,
        navigateToCustomerHome
    } = useAppState();

    const NavItem = ({ label, icon: Icon, onClick, active }: { label: string, icon: any, onClick: () => void, active: boolean }) => (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start gap-3 p-3 h-auto font-medium transition-all duration-200",
                active ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            )}
            onClick={onClick}
        >
            <Icon className={cn("h-5 w-5", active ? "text-primary" : "text-gray-400")} />
            {label}
        </Button>
    );

    return (
        <div className="w-64 bg-white border-r border-gray-100 h-screen flex flex-col fixed left-0 top-0 z-40 shadow-xl shadow-gray-200/50">
            <div className="p-6">
                <div className="flex items-center gap-2 text-2xl font-black tracking-tighter text-gray-900">
                    <Plane className="h-6 w-6 text-primary" /> Vendor<span className="text-primary">Panel</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-4">Overview</div>
                <NavItem label="Dashboard" icon={LayoutDashboard} onClick={navigateToVendorDashboard} active={view === 'VENDOR_DASHBOARD'} />
                <NavItem label="My Trips" icon={Plane} onClick={navigateToVendorTrips} active={view === 'VENDOR_TRIPS' || view === 'VENDOR_ADD_TRIP'} />
                <NavItem label="Bookings" icon={CalendarCheck} onClick={navigateToVendorBookings} active={view === 'VENDOR_BOOKINGS'} />

                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">Growth</div>
                <NavItem label="Marketing" icon={Megaphone} onClick={navigateToVendorMarketing} active={view === 'VENDOR_MARKETING'} />
                <NavItem label="Finance" icon={Wallet} onClick={navigateToVendorFinance} active={view === 'VENDOR_FINANCE'} />
                <NavItem label="Customers" icon={Users} onClick={navigateToVendorCustomers} active={view === 'VENDOR_CUSTOMERS'} />

                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-6">System</div>
                <NavItem label="Profile" icon={Settings} onClick={navigateToVendorProfile} active={view === 'VENDOR_PROFILE'} />
                <NavItem label="Tutorial" icon={GraduationCap} onClick={navigateToVendorTutorial} active={view === 'VENDOR_TUTORIAL'} />
                <NavItem label="Support" icon={HelpCircle} onClick={navigateToVendorSupport} active={view === 'VENDOR_SUPPORT'} />
            </div>

            <div className="p-4 border-t border-gray-100">
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100" onClick={navigateToCustomerHome}>
                    <LogOut className="mr-2 h-4 w-4" /> Exit to App
                </Button>
            </div>
        </div>
    );
};
