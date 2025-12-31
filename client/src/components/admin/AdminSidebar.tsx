
import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { Button } from '../ui/button';
import { ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

export const AdminSidebar: React.FC = () => {
    const {
        view,
        vendors,
        tickets,
        navigateToAdminDashboard,
        navigateToAdminVendors,
        navigateToAdminTrips,
        navigateToAdminSupport,
        navigateToCustomerHome
    } = useAppState();

    const pendingVerifications = vendors.filter(v => !v.isVerified).length;
    const openTickets = tickets.filter(t => t.status === 'OPEN').length;

    const NavItem = ({ label, onClick, active, badge }: { label: string, onClick: () => void, active: boolean, badge?: number }) => (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start font-medium",
                active ? "bg-primary/10 text-primary" : "text-gray-500"
            )}
            onClick={onClick}
        >
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
                    label="Support Tickets"
                    onClick={navigateToAdminSupport}
                    active={view === 'ADMIN_SUPPORT'}
                    badge={openTickets}
                />
            </nav>

            <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50" onClick={navigateToCustomerHome}>
                Exit Admin Panel
            </Button>
        </div>
    );
};
