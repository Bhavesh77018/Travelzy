import type { Trip } from '../types';

export const TRIPS: Trip[] = [
    {
        id: 't1',
        title: 'Magical Ladakh Adventure',
        destination: 'Ladakh, India',
        duration: 7,
        price: 24999,
        images: ['https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80'],
        description: 'Experience the breathtaking landscapes of Ladakh.',
        type: 'adventure',
        rating: 4.8,
        reviews: 124,
        itinerary: [
            { day: 1, title: 'Arrival in Leh', activities: ['Acclimatization', 'Market Visit'] },
            { day: 2, title: 'Leh Local Sightseeing', activities: ['Shanti Stupa', 'Leh Palace'] },
            // ... more days
        ],
        inclusions: ['Accommodation', 'Breakfast', 'Inner Line Permits'],
        exclusions: ['Airfare', 'Lunch & Dinner'],
        vendorId: 'v1',
        status: 'APPROVED',
        dates: ['2024-06-15', '2024-07-01']
    },
    {
        id: 't2',
        title: 'Goa Beach Retreat',
        destination: 'Goa, India',
        duration: 4,
        price: 12999,
        images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80'],
        description: 'Relax on the pristine beaches of Goa.',
        type: 'leisure',
        rating: 4.5,
        reviews: 89,
        itinerary: [],
        inclusions: [],
        exclusions: [],
        vendorId: 'v1',
        status: 'APPROVED',
        dates: []
    },
    {
        id: 't3',
        title: 'Kerala Backwaters',
        destination: 'Kerala, India',
        duration: 5,
        price: 18999,
        images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'],
        description: 'Houseboat stay and nature walks.',
        type: 'romantic',
        rating: 4.9,
        reviews: 210,
        itinerary: [],
        inclusions: [],
        exclusions: [],
        vendorId: 'v1',
        status: 'APPROVED',
        dates: []
    },
    // Add more mock trips as needed
];

export const MOCK_CUSTOMER = {
    id: 'c1',
    name: 'Bhavesh Aggarwal',
    email: 'bhavesh@example.com',
    bookings: []
};
