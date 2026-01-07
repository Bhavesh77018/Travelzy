
import type { CustomerUser, VendorUser } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Users
const MOCK_CUSTOMER: CustomerUser = {
    id: 'c1',
    name: 'Bhavesh Aggarwal',
    email: 'bhavesh@example.com',
    bookings: [],
};

const MOCK_VENDOR: VendorUser = {
    id: 'v1',
    businessName: 'Himalayan Adventures',
    email: 'vendor@example.com',
    credits: 100,
    status: 'VERIFIED',
};

class AuthServiceName {
    async loginCustomer(email: string): Promise<CustomerUser> {
        await delay(500);
        // Simulating login - in real app, verify credentials
        return { ...MOCK_CUSTOMER, email };
    }

    async loginVendor(email: string): Promise<VendorUser> {
        await delay(500);
        return { ...MOCK_VENDOR, email };
    }

    async signupVendor(data: any): Promise<VendorUser> {
        await delay(1000);
        return {
            id: 'v_' + Date.now(),
            businessName: data.businessName,
            email: data.email,
            credits: 50,
            status: 'PENDING'
        };
    }

    async logout(): Promise<void> {
        await delay(200);
    }
}

export const AuthService = new AuthServiceName();
