
import type { Trip } from '../types';
import { MOCK_TRIPS } from '../data/mockData';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class TripServiceName {
    private trips: Trip[] = [...MOCK_TRIPS];

    async getAllTrips(): Promise<Trip[]> {
        await delay(500); // Simulate network latency
        return [...this.trips];
    }

    async getTripById(id: string): Promise<Trip | undefined> {
        await delay(300);
        return this.trips.find(t => t.id === id);
    }

    async createTrip(trip: Trip): Promise<Trip> {
        await delay(800);
        this.trips.push(trip);
        return trip;
    }

    async updateTrip(updatedTrip: Trip): Promise<Trip> {
        await delay(600);
        this.trips = this.trips.map(t => t.id === updatedTrip.id ? updatedTrip : t);
        return updatedTrip;
    }

    async deleteTrip(tripId: string): Promise<void> {
        await delay(400);
        this.trips = this.trips.filter(t => t.id !== tripId);
    }
}

export const TripService = new TripServiceName();
