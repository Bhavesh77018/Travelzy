
import type { Trip } from '../types';
// import { MOCK_TRIPS } from '../data/mockData';


import { API_BASE_URL } from '../config';

class TripServiceName {
    async getAllTrips(): Promise<Trip[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/trips`);
            if (!response.ok) throw new Error('Failed to fetch trips');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching trips:', error);
            return [];
        }
    }

    async getTripById(id: string): Promise<Trip | undefined> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/trips/${id}`);
            if (!response.ok) return undefined;
            return await response.json();
        } catch (error) {
            console.error(`Error fetching trip ${id}:`, error);
            return undefined;
        }
    }

    async createTrip(trip: Trip): Promise<Trip> {
        const response = await fetch(`${API_BASE_URL}/api/trips`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(trip)
        });
        if (!response.ok) throw new Error('Failed to create trip');
        return await response.json();
    }

    async updateTrip(updatedTrip: Trip): Promise<Trip> {
        const response = await fetch(`${API_BASE_URL}/api/trips/${updatedTrip.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTrip)
        });
        if (!response.ok) throw new Error('Failed to update trip');
        return await response.json();
    }

    async deleteTrip(tripId: string): Promise<void> {
        await fetch(`${API_BASE_URL}/api/trips/${tripId}`, {
            method: 'DELETE'
        });
    }
}

export const TripService = new TripServiceName();
