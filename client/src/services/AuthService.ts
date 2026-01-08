
import type { CustomerUser, VendorUser } from '../types';
import { API_BASE_URL } from '../config';

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
    async loginCustomer(email: string, password?: string): Promise<CustomerUser> {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: password || 'password123', role: 'customer' })
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        // Store token
        localStorage.setItem('token', data.token);
        return data.user;
    }

    async loginVendor(email: string, password?: string): Promise<VendorUser> {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password: password || 'password123', role: 'vendor' })
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return data.user;
    }

    async signupVendor(data: any): Promise<VendorUser> {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, role: 'vendor' })
        });
        if (!response.ok) throw new Error('Signup failed');
        const resData = await response.json();
        localStorage.setItem('token', resData.token);
        return resData.user;
    }

    async logout(): Promise<void> {
        localStorage.removeItem('token');
    }
}

export const AuthService = new AuthServiceName();
