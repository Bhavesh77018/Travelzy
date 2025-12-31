
// Types
export interface Trip {
    id: string;
    title: string;
    description: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    destination: string;
    category: 'Adventure' | 'Relaxation' | 'Cultural' | 'Honeymoon' | 'Luxury' | 'Spiritual';
    duration: number;
    dates: string[];
    itinerary: { day: number; title: string; activities: string[] }[];
}

export interface Booking {
    id: string;
    trip: string;
    customer: string;
    date: string;
    status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
    guests: number;
    total: number;
}

export interface VendorProfile {
    id: string;
    businessName: string;
    email: string;
    isVerified: boolean;
    revenue: number;
    joinedDate: string;
    credits: number;
}

// Mock Data
export const TRIPS: Trip[] = [
    {
        id: '1',
        title: 'Magical Ladakh Expedition',
        description: 'Experience the breathtaking landscapes of Ladakh, from the high passes to the serene lakes. This 7-day adventure takes you through Leh, Nubra Valley, and Pangong Tso.',
        image: 'https://images.unsplash.com/photo-1483196913501-c88f98c8c767?q=80&w=2070',
        price: 24999,
        rating: 4.8,
        reviews: 124,
        destination: 'Ladakh',
        category: 'Adventure',
        duration: 7,
        dates: ['2025-04-10', '2025-05-15', '2025-06-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Leh', activities: ['Airport pickup', 'Acclimatization', 'Leh Market visit'] },
            { day: 2, title: 'Leh Local Sightseeing', activities: ['Shanti Stupa', 'Leh Palace', 'Hall of Fame'] },
            { day: 3, title: 'Leh to Nubra Valley', activities: ['Drive via Khardung La', 'Hunder Sand Dunes', 'Camel Safari'] },
            { day: 4, title: 'Nubra to Pangong Tso', activities: ['Diskit Monastery', 'Drive to Pangong Lake', 'Camping by the lake'] },
            { day: 5, title: 'Pangong to Leh', activities: ['Sunrise at Pangong', 'Chang La Pass', 'Return to Leh'] },
            { day: 6, title: 'Leh to Sham Valley', activities: ['Magnetic Hill', 'Gurudwara Pathar Sahib', 'Sangam'] },
            { day: 7, title: 'Departure', activities: ['Drop at Airport'] }
        ]
    },
    {
        id: '2',
        title: 'Goa Beach Retreat',
        description: 'Relax and unwind on the pristine beaches of Goa. Enjoy water sports, nightlife, and delicious seafood.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974',
        price: 15999,
        rating: 4.5,
        reviews: 89,
        destination: 'Goa',
        category: 'Relaxation',
        duration: 5,
        dates: ['2025-02-10', '2025-03-05', '2025-04-01'],
        itinerary: [
            { day: 1, title: 'Arrival in Goa', activities: ['Airport pickup', 'Check-in to resort', 'Leisure time'] },
            { day: 2, title: 'North Goa Tour', activities: ['Calangute Beach', 'Baga Beach', 'Fort Aguada'] },
            { day: 3, title: 'South Goa Tour', activities: ['Basilica of Bom Jesus', 'Mangueshi Temple', 'Miramar Beach'] },
            { day: 4, title: 'Water Sports', activities: ['Parasailing', 'Jet Skiing', 'Banana Boat Ride'] },
            { day: 5, title: 'Departure', activities: ['Drop at Airport'] }
        ]
    },
    {
        id: '3',
        title: 'Heritage Rajasthan',
        description: 'Explore the royal palaces and forts of Rajasthan. A journey through Jaipur, Jodhpur, and Udaipur.',
        image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070',
        price: 35000,
        rating: 4.9,
        reviews: 210,
        destination: 'Rajasthan',
        category: 'Cultural',
        duration: 8,
        dates: ['2025-01-20', '2025-02-15'],
        itinerary: [
            { day: 1, title: 'Arrival in Jaipur', activities: ['Airport pickup', 'Chokhi Dhani visit'] },
            { day: 2, title: 'Jaipur Sightseeing', activities: ['Amber Fort', 'Hawa Mahal', 'City Palace'] },
            { day: 3, title: 'Jaipur to Jodhpur', activities: ['Drive to Jodhpur', 'Mehrangarh Fort'] },
            { day: 4, title: 'Jodhpur Sightseeing', activities: ['Umaid Bhawan Palace', 'Jaswant Thada'] },
            { day: 5, title: 'Jodhpur to Udaipur', activities: ['Drive to Udaipur', 'Ranakpur Jain Temple en route'] },
            { day: 6, title: 'Udaipur Sightseeing', activities: ['City Palace', 'Lake Pichola Boat Ride'] },
            { day: 7, title: 'Udaipur Leisure', activities: ['Saheliyon Ki Bari', 'Shopping'] },
            { day: 8, title: 'Departure', activities: ['Drop at Airport'] }
        ]
    },
    {
        id: '4',
        title: 'Kerala Backwaters',
        description: 'Experience the tranquility of Kerala backwaters with a houseboat stay in Alleppey and a visit to Munnar tea gardens.',
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070',
        price: 28000,
        rating: 4.7,
        reviews: 156,
        destination: 'Kerala',
        category: 'Relaxation',
        duration: 6,
        dates: ['2025-03-10', '2025-04-05'],
        itinerary: [
            { day: 1, title: 'Arrival in Kochi', activities: ['Transfer to Munnar', 'Cheeyappara Waterfalls'] },
            { day: 2, title: 'Munnar Sightseeing', activities: ['Tea Museum', 'Mattupetty Dam', 'Echo Point'] },
            { day: 3, title: 'Munnar to Thekkady', activities: ['Drive to Thekkady', 'Periyar Wildlife Sanctuary'] },
            { day: 4, title: 'Thekkady to Alleppey', activities: ['Drive to Alleppey', 'Houseboat Check-in'] },
            { day: 5, title: 'Alleppey to Kochi', activities: ['Drive to Kochi', 'Fort Kochi Sightseeing'] },
            { day: 6, title: 'Departure', activities: ['Drop at Airport'] }
        ]
    },
    {
        id: '5',
        title: 'Paris Romantic Getaway',
        description: 'A dream vacation in the city of lights. Visit the Eiffel Tower, Louvre Museum, and enjoy a Seine River cruise.',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
        price: 120000,
        rating: 4.9,
        reviews: 342,
        destination: 'Paris, France',
        category: 'Cultural',
        duration: 5,
        dates: ['2025-05-01', '2025-06-10'],
        itinerary: [
            { day: 1, title: 'Arrival in Paris', activities: ['Transfer to Hotel', 'Evening Seine Cruise'] },
            { day: 2, title: 'Paris Essentials', activities: ['Eiffel Tower', 'Louvre Museum'] },
            { day: 3, title: 'Palace of Versailles', activities: ['Day trip to Versailles'] },
            { day: 4, title: 'Montmartre & Shopping', activities: ['Sacre-Coeur', 'Champs-Elysees'] },
            { day: 5, title: 'Departure', activities: ['Airport Drop'] }
        ]
    },
    {
        id: '6',
        title: 'Bali Budget Backpacking',
        description: 'Explore the beaches, temples, and rice terraces of Bali on a budget. Perfect for solo travelers and backpackers.',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038',
        price: 45000,
        rating: 4.6,
        reviews: 189,
        destination: 'Bali, Indonesia',
        category: 'Adventure',
        duration: 7,
        dates: ['2025-04-20', '2025-05-25'],
        itinerary: [
            { day: 1, title: 'Arrival in Denpasar', activities: ['Transfer to Kuta', 'Beach Sunset'] },
            { day: 2, title: 'Ubud Exploration', activities: ['Monkey Forest', 'Rice Terraces'] },
            { day: 3, title: 'Nusa Penida Trip', activities: ['Kelingking Beach', 'Angel Billabong'] },
            { day: 4, title: 'Uluwatu Temple', activities: ['Kecak Fire Dance'] },
            { day: 5, title: 'Seminyak Vibes', activities: ['Cafe hopping', 'Beach Clubs'] },
            { day: 6, title: 'Free Day', activities: ['Surfing lesson or Spa'] },
            { day: 7, title: 'Departure', activities: ['Airport Drop'] }
        ]
    },
    {
        id: '7',
        title: 'Maldives Luxury Villa',
        description: 'Ultimate luxury in an overwater villa. All-inclusive plan with water sports, spa treatments, and private dining.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065',
        price: 250000,
        rating: 5.0,
        reviews: 88,
        destination: 'Maldives',
        category: 'Honeymoon',
        duration: 5,
        dates: ['2025-02-14', '2025-03-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Male', activities: ['Seaplane transfer to resort', 'Check-in to Water Villa'] },
            { day: 2, title: 'Water Sports', activities: ['Snorkeling', 'Jet Skiing'] },
            { day: 3, title: 'Spa & Relaxation', activities: ['Couples Massage', 'Sunset Cruise'] },
            { day: 4, title: 'Private Dining', activities: ['Candlelight Dinner on the beach'] },
            { day: 5, title: 'Departure', activities: ['Seaplane transfer to Airport'] }
        ]
    },
    {
        id: '8',
        title: 'Dubai Future Tour',
        description: 'Witness the future in Dubai. Burj Khalifa, Museum of the Future, and Desert Safari.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea904ac66de?q=80&w=2009',
        price: 85000,
        rating: 4.7,
        reviews: 215,
        destination: 'Dubai, UAE',
        category: 'Luxury',
        duration: 6,
        dates: ['2025-01-15', '2025-02-10'],
        itinerary: [
            { day: 1, title: 'Arrival in Dubai', activities: ['Transfer to Downtown Hotel', 'Dubai Mall'] },
            { day: 2, title: 'Top of the World', activities: ['Burj Khalifa At the Top', 'Fountain Show'] },
            { day: 3, title: 'Old & New Dubai', activities: ['Dubai Frame', 'Gold Souk'] },
            { day: 4, title: 'Desert Safari', activities: ['Dune Bashing', 'BBQ Dinner'] },
            { day: 5, title: 'Future & Palms', activities: ['Museum of the Future', 'Palm Jumeirah'] },
            { day: 6, title: 'Departure', activities: ['Airport Drop'] }
        ]
    },
    {
        id: '9',
        title: 'Varanasi Spiritual Awakening',
        description: 'Experience the divine energy of Kashi. Witness the Ganga Aarti, visit ancient temples, and take a boat ride on the Ganges.',
        image: 'https://images.unsplash.com/photo-1561361513-35bd4f9b4536?q=80&w=2070',
        price: 18000,
        rating: 4.8,
        reviews: 320,
        destination: 'Varanasi',
        category: 'Spiritual',
        duration: 4,
        dates: ['2025-02-01', '2025-03-10'],
        itinerary: [
            { day: 1, title: 'Arrival in Varanasi', activities: ['Transfer to Hotel', 'Evening Ganga Aarti at Dashashwamedh Ghat'] },
            { day: 2, title: 'Kashi Vishwanath & Temples', activities: ['Kashi Vishwanath Temple', 'Annapurna Temple', 'Kal Bhairav Temple'] },
            { day: 3, title: 'Sunrise Boat Ride & Sarnath', activities: ['Boat ride on Ganges', 'Sarnath Tour'] },
            { day: 4, title: 'Departure', activities: ['Shopping in Godowlia', 'Airport Drop'] }
        ]
    },
    {
        id: '10',
        title: 'Rishikesh Yoga Retreat',
        description: 'Rejuvenate your soul in the Yoga Capital of the World. Includes daily yoga sessions, meditation, and rafting for adventure lovers.',
        image: 'https://images.unsplash.com/photo-1596706057039-bb6d0c73295e?q=80&w=2070',
        price: 22000,
        rating: 4.9,
        reviews: 150,
        destination: 'Rishikesh',
        category: 'Spiritual',
        duration: 5,
        dates: ['2025-03-15', '2025-04-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Rishikesh', activities: ['Transfer to Ashram/Resort', 'Evening Aarti at Triveni Ghat'] },
            { day: 2, title: 'Yoga & Meditation', activities: ['Morning Yoga', 'Beatles Ashram', 'Meditation Session'] },
            { day: 3, title: 'Adventure & Spirituality', activities: ['River Rafting', 'Neer Garh Waterfall'] },
            { day: 4, title: 'Temple Tour', activities: ['Neelkanth Mahadev Temple', 'Parmarth Niketan'] },
            { day: 5, title: 'Departure', activities: ['Morning Yoga', 'Airport Drop'] }
        ]
        ]
    }
];

export const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK123', trip: 'Magical Ladakh', customer: 'Alice Johnson', date: '2025-04-15', status: 'CONFIRMED', guests: 2, total: 49998 },
    { id: 'BK124', trip: 'Goa Beach Retreat', customer: 'Bob Smith', date: '2025-03-10', status: 'PENDING', guests: 1, total: 15999 },
    { id: 'BK125', trip: 'Magical Ladakh', customer: 'Charlie Brown', date: '2025-05-20', status: 'CANCELLED', guests: 4, total: 99996 },
];

export const MOCK_VENDORS: VendorProfile[] = [
    { id: 'v1', businessName: 'Himalayan Adven.', email: 'himalaya@vendor.com', isVerified: true, revenue: 150000, joinedDate: '2024-01-15', credits: 100 },
    { id: 'v2', businessName: 'Goa Explores', email: 'goa@vendor.com', isVerified: false, revenue: 45000, joinedDate: '2024-03-10', credits: 50 },
];

export interface SupportTicket {
    id: string;
    user: string;
    subject: string;
    status: 'OPEN' | 'RESOLVED' | 'CLOSED';
    messages: { sender: 'user' | 'admin'; text: string; timestamp: string }[];
}

export const MOCK_TICKETS: SupportTicket[] = [
    { id: 'TK1', user: 'Alice Johnson', subject: 'Refund Request', status: 'OPEN', messages: [{ sender: 'user', text: 'I need a refund for my trip.', timestamp: '2025-01-01' }] },
    { id: 'TK2', user: 'Bob Smith', subject: 'Booking Issue', status: 'RESOLVED', messages: [{ sender: 'user', text: 'Cannot book trip.', timestamp: '2024-12-20' }] },
];
