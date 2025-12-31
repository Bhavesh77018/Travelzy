import type { Trip, Booking, VendorProfile, SupportTicket } from '../types';

export const MOCK_TRIPS: Trip[] = [
    {
        id: '1',
        title: 'Magical Ladakh Expedition',
        description: 'Experience the breathtaking landscapes of Ladakh, from the high passes to the serene lakes. This 7-day adventure takes you through Leh, Nubra Valley, and Pangong Tso.',
        image: 'https://images.unsplash.com/photo-1483196913501-c88f98c8c767?q=80&w=2070',
        price: 24999,
        rating: 4.8,
        reviews: 124,
        destination: 'Ladakh',
        type: 'adventure',
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
        ],
        inclusions: ['Accommodation', 'Breakfast & Dinner', 'Transport'],
        exclusions: ['Airfare', 'Lunch', 'Personal Expenses'],
        status: 'APPROVED'
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
        type: 'leisure',
        duration: 5,
        dates: ['2025-02-10', '2025-03-05', '2025-04-01'],
        itinerary: [
            { day: 1, title: 'Arrival in Goa', activities: ['Airport pickup', 'Check-in to resort', 'Leisure time'] },
            { day: 2, title: 'North Goa Tour', activities: ['Calangute Beach', 'Baga Beach', 'Fort Aguada'] },
            { day: 3, title: 'South Goa Tour', activities: ['Basilica of Bom Jesus', 'Mangueshi Temple', 'Miramar Beach'] },
            { day: 4, title: 'Water Sports', activities: ['Parasailing', 'Jet Skiing', 'Banana Boat Ride'] },
            { day: 5, title: 'Departure', activities: ['Drop at Airport'] }
        ],
        inclusions: ['Resort Stay', 'Breakfast'],
        exclusions: ['Flights', 'Water Sports Charges'],
        status: 'APPROVED'
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
        type: 'family',
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
        ],
        inclusions: ['Hotels', 'Breakfast', 'Guide'],
        exclusions: ['Entry Fees', 'Tips'],
        status: 'PENDING'
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
        type: 'romantic',
        duration: 5,
        dates: ['2025-02-14', '2025-03-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Male', activities: ['Seaplane transfer to resort', 'Check-in to Water Villa'] },
            { day: 2, title: 'Water Sports', activities: ['Snorkeling', 'Jet Skiing'] },
            { day: 3, title: 'Spa & Relaxation', activities: ['Couples Massage', 'Sunset Cruise'] },
            { day: 4, title: 'Private Dining', activities: ['Candlelight Dinner on the beach'] },
            { day: 5, title: 'Departure', activities: ['Seaplane transfer to Airport'] }
        ],
        inclusions: ['All Meals', 'Drinks', 'Spa Credit'],
        exclusions: ['International Flights'],
        status: 'REJECTED'
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
        type: 'spiritual',
        duration: 4,
        dates: ['2025-02-01', '2025-03-10'],
        itinerary: [
            { day: 1, title: 'Arrival in Varanasi', activities: ['Transfer to Hotel', 'Evening Ganga Aarti at Dashashwamedh Ghat'] },
            { day: 2, title: 'Kashi Vishwanath & Temples', activities: ['Kashi Vishwanath Temple', 'Annapurna Temple', 'Kal Bhairav Temple'] },
            { day: 3, title: 'Sunrise Boat Ride & Sarnath', activities: ['Boat ride on Ganges', 'Sarnath Tour'] },
            { day: 4, title: 'Departure', activities: ['Shopping in Godowlia', 'Airport Drop'] }
        ],
        inclusions: ['Hotel', 'Breakfast', 'Guide'],
        exclusions: ['Tips', 'Donations'],
        status: 'APPROVED'
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
        type: 'spiritual',
        duration: 5,
        dates: ['2025-03-15', '2025-04-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Rishikesh', activities: ['Transfer to Ashram/Resort', 'Evening Aarti at Triveni Ghat'] },
            { day: 2, title: 'Yoga & Meditation', activities: ['Morning Yoga', 'Beatles Ashram', 'Meditation Session'] },
            { day: 3, title: 'Adventure & Spirituality', activities: ['River Rafting', 'Neer Garh Waterfall'] },
            { day: 4, title: 'Temple Tour', activities: ['Neelkanth Mahadev Temple', 'Parmarth Niketan'] },
            { day: 5, title: 'Departure', activities: ['Morning Yoga', 'Airport Drop'] }
        ],
        inclusions: ['Ashram Stay', 'All Meals', 'Yoga Classes'],
        exclusions: ['Rafting Charges', 'Personal Expenses'],
        status: 'APPROVED'
    }
];

export const MOCK_BOOKINGS: Booking[] = [
    { id: 'BK123', trip: 'Magical Ladakh', customer: 'Alice Johnson', date: '2025-04-15', status: 'CONFIRMED', guests: 2, total: 49998 },
    { id: 'BK124', trip: 'Goa Beach Retreat', customer: 'Bob Smith', date: '2025-03-10', status: 'PENDING', guests: 1, total: 15999 },
    { id: 'BK125', trip: 'Magical Ladakh', customer: 'Charlie Brown', date: '2025-05-20', status: 'CANCELLED', guests: 4, total: 99996 },
];

export const MOCK_VENDORS: VendorProfile[] = [
    {
        id: 'v1',
        businessName: 'Himalayan Adven.',
        email: 'himalaya@vendor.com',
        isVerified: true,
        revenue: 150000,
        joinedDate: '2024-01-15',
        credits: 100,
        status: 'VERIFIED',
        documents: [
            { type: 'company', urls: ['https://via.placeholder.com/150'] }
        ]
    },
    {
        id: 'v2',
        businessName: 'Goa Explores',
        email: 'goa@vendor.com',
        isVerified: false,
        revenue: 45000,
        joinedDate: '2024-03-10',
        credits: 50,
        status: 'PENDING',
        documents: [
            { type: 'individual', urls: ['https://via.placeholder.com/150'] }
        ]
    },
];

export const MOCK_TICKETS: SupportTicket[] = [
    { id: 'TK1', user: 'Alice Johnson', subject: 'Refund Request', status: 'OPEN', messages: [{ sender: 'user', text: 'I need a refund for my trip.', timestamp: '2025-01-01' }] },
    { id: 'TK2', user: 'Bob Smith', subject: 'Booking Issue', status: 'RESOLVED', messages: [{ sender: 'user', text: 'Cannot book trip.', timestamp: '2024-12-20' }] },
];

export const MOCK_PAYOUTS = [
    { id: 'PO-001', vendor: 'Global Travels', amount: 45000, date: '2024-04-10', status: 'PENDING' },
    { id: 'PO-002', vendor: 'Himalayan Adven.', amount: 12000, date: '2024-04-08', status: 'PAID' },
];
