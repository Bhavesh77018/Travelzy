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
    Megaphone,
    MessageCircle
} from 'lucide-react';
import { cn } from '../../utils/cn';

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
    Megaphone,
    MessageCircle,
    ChevronRight
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
        navigateToVendorMessages,
        navigateToCustomerHome
    } = useAppState();

    const NavItem = ({ label, icon: Icon, onClick, active, badge }: { label: string, icon: any, onClick: () => void, active: boolean, badge?: string }) => (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start gap-3 p-3 h-11 font-medium transition-all duration-200 group relative overflow-hidden",
                active
                    ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/10 text-white shadow-lg shadow-blue-900/20 border-l-4 border-blue-500"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
            )}
            onClick={onClick}
        >
            <div className={cn("absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 transition-opacity duration-300", active && "opacity-100")} />
            <Icon className={cn("h-5 w-5 z-10 transition-colors duration-200", active ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
            <span className="z-10 flex-1 text-left">{label}</span>
            {badge && (
                <span className="z-10 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{badge}</span>
            )}
            {active && <ChevronRight className="h-4 w-4 text-blue-500 ml-auto opacity-50 z-10" />}
        </Button>
    );

    const SectionHeader = ({ title }: { title: string }) => (
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 mb-2 mt-6">
            {title}
        </div>
    );

    return (
        <div className="w-64 bg-slate-950 border-r border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-50">
            {/* Logo Section */}
            <div className="p-6 pb-2">
                <div className="flex items-center gap-2.5 text-2xl font-black tracking-tighter text-white">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-xl shadow-lg shadow-blue-500/20">
                        <Plane className="h-5 w-5 text-white" />
                    </div>
                    <span>Vendor<span className="text-blue-500">Panel</span></span>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
                <SectionHeader title="Overview" />
                <NavItem label="Dashboard" icon={LayoutDashboard} onClick={navigateToVendorDashboard} active={view === 'VENDOR_DASHBOARD'} />
                <NavItem label="Messages" icon={MessageCircle} onClick={navigateToVendorMessages} active={view === 'VENDOR_MESSAGES'} badge="3" />
                <NavItem label="My Trips" icon={Plane} onClick={navigateToVendorTrips} active={view === 'VENDOR_TRIPS' || view === 'VENDOR_ADD_TRIP'} />
                <NavItem label="Bookings" icon={CalendarCheck} onClick={navigateToVendorBookings} active={view === 'VENDOR_BOOKINGS'} />

                <SectionHeader title="Growth Engine" />
                <NavItem label="Marketing" icon={Megaphone} onClick={navigateToVendorMarketing} active={view === 'VENDOR_MARKETING'} badge="New" />
                <NavItem label="Finance" icon={Wallet} onClick={navigateToVendorFinance} active={view === 'VENDOR_FINANCE'} />
                <NavItem label="Customers" icon={Users} onClick={navigateToVendorCustomers} active={view === 'VENDOR_CUSTOMERS'} />

                <SectionHeader title="Settings" />
                <NavItem label="Profile" icon={Settings} onClick={navigateToVendorProfile} active={view === 'VENDOR_PROFILE'} />
                <NavItem label="Tutorial" icon={GraduationCap} onClick={navigateToVendorTutorial} active={view === 'VENDOR_TUTORIAL'} />
                <NavItem label="Support" icon={HelpCircle} onClick={navigateToVendorSupport} active={view === 'VENDOR_SUPPORT'} />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-900 bg-slate-950">
                <Button
                    variant="ghost"
                    className="w-full text-slate-400 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all group"
                    onClick={navigateToCustomerHome}
                >
                    <LogOut className="mr-2 h-4 w-4 group-hover:text-red-400 transition-colors" />
                    Exit to App
                </Button>
            </div>
        </div>
    );
};
