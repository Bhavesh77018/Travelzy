import { API_BASE_URL } from '../config';

export const MarketingService = {
    async createCampaign(token: string, campaignData: any) {
        const response = await fetch(`${API_BASE_URL}/api/marketing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(campaignData)
        });
        if (!response.ok) throw new Error('Failed to create campaign');
        return response.json();
    },

    async getMyCampaigns(token: string) {
        const response = await fetch(`${API_BASE_URL}/api/marketing/my`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch campaigns');
        return response.json();
    },

    async updateStatus(token: string, id: string, status: string) {
        const response = await fetch(`${API_BASE_URL}/api/marketing/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });
        if (!response.ok) throw new Error('Failed to update status');
        return response.json();
    }
};
