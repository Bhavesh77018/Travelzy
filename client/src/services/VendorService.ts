import { API_BASE_URL } from '../config';

export const VendorService = {
    async getStats(token: string) {
        const response = await fetch(`${API_BASE_URL}/api/vendors/stats`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch stats');
        return response.json();
    },

    async updateProfile(token: string, data: any) {
        const response = await fetch(`${API_BASE_URL}/api/vendors/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Failed to update profile');
        return response.json();
    }
};
