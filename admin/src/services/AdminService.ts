import { API_BASE_URL } from '../config';

// Helper to handle admin auth header (assuming token is stored or passed)
// For now we'll assume the context passes the token or we retrieve it from storage if we had it
// But Admin App might not use the same auth flow yet. Let's assume we pass token.

export const AdminService = {
    // Vendors
    async getPendingVendors(token: string) {
        const response = await fetch(`${API_BASE_URL}/api/vendors/pending`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch pending vendors');
        return response.json();
    },

    async verifyVendor(token: string, vendorId: string, status: 'VERIFIED' | 'REJECTED', notes?: string) {
        const response = await fetch(`${API_BASE_URL}/api/vendors/${vendorId}/verify`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status, notes })
        });
        if (!response.ok) throw new Error('Failed to verify vendor');
        return response.json();
    },

    // Trips
    async getPendingTrips(token: string) {
        const response = await fetch(`${API_BASE_URL}/api/trips/admin/pending`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch pending trips');
        return response.json();
    },

    async approveTrip(token: string, tripId: string, isPromoted: boolean = false) {
        const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}/approve`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ isPromoted })
        });
        if (!response.ok) throw new Error('Failed to approve trip');
        return response.json();
    },

    async rejectTrip(token: string, tripId: string, reason: string) {
        const response = await fetch(`${API_BASE_URL}/api/trips/${tripId}/reject`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ reason })
        });
        if (!response.ok) throw new Error('Failed to reject trip');
        return response.json();
    },

    // Marketing
    async getAllCampaigns(token: string) {
        const response = await fetch(`${API_BASE_URL}/api/marketing/all`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch campaigns');
        return response.json();
    }
};
