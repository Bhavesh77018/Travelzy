import type { Trip } from '../types';

export const MOCK_TRIPS: Trip[] = [
    {
        id: '1',
        title: 'Magical Ladakh Expedition',
        isPromoted: true,
        description: 'Experience the breathtaking landscapes of Ladakh, from the high passes to the serene lakes. This 7-day adventure takes you through Leh, Nubra Valley, and Pangong Tso.',
        images: [
            'https://images.unsplash.com/photo-1483196913501-c88f98c8c767?q=80&w=2070',
            'https://images.unsplash.com/photo-1518182170562-c6628619bc9e?q=80&w=2070', // Pangong
            'https://images.unsplash.com/photo-1542475734-2e99e0300a29?q=80&w=2070', // Monastery
            'https://images.unsplash.com/photo-1506103608713-39f1c7f07755?q=80&w=2070'  // Landscape
        ],
        price: 24999,
        rating: 4.8,
        reviews: 124,
        destination: 'Ladakh',
        type: 'adventure',
        duration: 7,
        category: 'Adventure',
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
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '2',
        title: 'Goa Beach Retreat',
        description: 'Relax and unwind on the pristine beaches of Goa. Enjoy water sports, nightlife, and delicious seafood.',
        images: [
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974',
            'https://images.unsplash.com/photo-1544256627-c10ba2d0af1b?q=80&w=2070', // Beach
            'https://images.unsplash.com/photo-1587921674409-a1fc41473fa5?q=80&w=2070', // Palm trees
            'https://images.unsplash.com/photo-1590497539077-bd201255e2e4?q=80&w=2070'  // Sunset
        ],
        price: 15999,
        rating: 4.5,
        reviews: 89,
        destination: 'Goa',
        type: 'leisure',
        category: 'Relaxation',
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
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '3',
        title: 'Heritage Rajasthan',
        description: 'Explore the royal palaces and forts of Rajasthan. A journey through Jaipur, Jodhpur, and Udaipur.',
        images: [
            'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2070', // Hawa Mahal
            'https://images.unsplash.com/photo-1524314488960-e4a81ba08a18?q=80&w=2070', // Fort
            'https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=3094'  // Udaipur
        ],
        price: 35000,
        rating: 4.9,
        reviews: 210,
        destination: 'Rajasthan',
        type: 'family',
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
        ],
        inclusions: ['Hotels', 'Breakfast', 'Guide'],
        exclusions: ['Entry Fees', 'Tips'],
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '4',
        title: 'Kerala Backwaters',
        description: 'Cruise through the serene backwaters of Alleppey and explore the tea gardens of Munnar.',
        images: [
            'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2070',
            'https://images.unsplash.com/photo-1593693396885-5a589778ee6c?q=80&w=2070', // Boat
            'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070', // Tea
            'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2066'  // Kerala
        ],
        price: 28000,
        rating: 4.7,
        reviews: 150,
        destination: 'Kerala',
        type: 'leisure',
        category: 'Relaxation',
        duration: 6,
        dates: ['2025-01-15', '2025-02-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Kochi', activities: ['Transfer to Munnar', 'Cheeyappara Waterfalls'] },
            { day: 2, title: 'Munnar Sightseeing', activities: ['Tea Museum', 'Mattupetty Dam', 'Echo Point'] },
            { day: 3, title: 'Munnar to Thekkady', activities: ['Spice Plantation Tour', 'Periyar Lake Boat Ride'] },
            { day: 4, title: 'Thekkady to Alleppey', activities: ['Houseboat Check-in', 'Backwater Cruise'] },
            { day: 5, title: 'Alleppey to Kochi', activities: ['Fort Kochi', 'Chinese Fishing Nets'] },
            { day: 6, title: 'Departure', activities: ['Airport Drop'] }
        ],
        inclusions: ['Houseboat Stay', 'Breakfast & Dinner', 'Transport'],
        exclusions: ['Airfare', 'Lunch'],
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '6',
        title: 'Dubai Extravaganza',
        isPromoted: true,
        description: 'Explore the futuristic city of Dubai. Visit Burj Khalifa, Desert Safari, and Palm Jumeirah.',
        images: [
            'https://images.unsplash.com/photo-1512453979798-5ea904ac6686?q=80&w=2070',
            'https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=2070', // Burj Khalifa
            'https://images.unsplash.com/photo-1492051602693-5c02b9cd062a?q=80&w=2070', // Desert
            'https://images.unsplash.com/photo-1549557723-da7ae560d294?q=80&w=2070'  // Marina
        ],
        price: 85000,
        rating: 4.8,
        reviews: 300,
        destination: 'Dubai',
        type: 'leisure',
        category: 'Luxury',
        duration: 6,
        dates: ['2025-02-01', '2025-03-15'],
        itinerary: [
            { day: 1, title: 'Arrival in Dubai', activities: ['Airport pickup', 'Dhow Cruise Dinner'] },
            { day: 2, title: 'Dubai City Tour', activities: ['Burj Khalifa', 'Dubai Mall', 'Fountain Show'] },
            { day: 3, title: 'Desert Safari', activities: ['Dune Bashing', 'BBQ Dinner', 'Belly Dance'] },
            { day: 4, title: 'Abu Dhabi Tour', activities: ['Sheikh Zayed Mosque', 'Ferrari World'] },
            { day: 5, title: 'Future & Palms', activities: ['Museum of the Future', 'Palm Jumeirah'] },
            { day: 6, title: 'Departure', activities: ['Airport Drop'] }
        ],
        inclusions: ['5 Star Hotel', 'Visa', 'All Tours'],
        exclusions: ['Flights', 'Personal Shopping'],
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '8',
        title: 'Swiss Alpine Wonder',
        description: 'Breathtaking views of the Swiss Alps. Visit Zurich, Lucerne, Interlaken, and take the Jungfraujoch train.',
        images: [
            'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070',
            'https://images.unsplash.com/photo-1506506200949-df8794af83dd?q=80&w=2070', // Train
            'https://images.unsplash.com/photo-1520608754407-3cabf55c3c0a?q=80&w=2070', // Alps
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070'  // Lake
        ],
        price: 150000,
        rating: 4.9,
        reviews: 95,
        destination: 'Switzerland',
        type: 'romantic',
        category: 'Honeymoon',
        duration: 7,
        dates: ['2025-05-01', '2025-06-15'],
        itinerary: [
            { day: 1, title: 'Arrival in Zurich', activities: ['Transfer to Hotel', 'Lake Zurich walk'] },
            { day: 2, title: 'Zurich to Lucerne', activities: ['Chapel Bridge', 'Lion Monument'] },
            { day: 3, title: 'Mt. Titlis', activities: ['Cable car ride', 'Ice Cave', 'Cliff Walk'] },
            { day: 4, title: 'Interlaken', activities: ['Lake Brienz Cruise', 'Harder Kulm'] },
            { day: 5, title: 'Jungfraujoch', activities: ['Top of Europe train', 'Ice Palace'] },
            { day: 6, title: 'Zermatt (Optional)', activities: ['Matterhorn view', 'Gornergrat'] },
            { day: 7, title: 'Departure', activities: ['Train to Zurich Airport'] }
        ],
        inclusions: ['Swiss Travel Pass', 'Hotels', 'Breakfast'],
        exclusions: ['Flights', 'Lunch & Dinner'],
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '9',
        title: 'Varanasi Spiritual Awakening',
        description: 'Experience the divine energy of Kashi. Witness the Ganga Aarti, visit ancient temples, and take a boat ride on the Ganges.',
        images: [
            'https://images.unsplash.com/photo-1561361513-35bd4f9b4536?q=80&w=2070',
            'https://images.unsplash.com/photo-1626017658746-81427c3e80b2?q=80&w=2070', // Ghats
            'https://images.unsplash.com/photo-1591807383794-04285df64969?q=80&w=2070', // Aarti
            'https://images.unsplash.com/photo-1599309252063-ce070624003d?q=80&w=2070'  // Boat
        ],
        price: 18000,
        rating: 4.8,
        reviews: 320,
        destination: 'Varanasi',
        type: 'spiritual',
        category: 'Spiritual',
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
        vendorId: 'v1',
        status: 'APPROVED'
    },
    {
        id: '10',
        title: 'Rishikesh Yoga Retreat',
        description: 'Rejuvenate your soul in the Yoga Capital of the World. Includes daily yoga sessions, meditation, and rafting for adventure lovers.',
        images: [
            'https://images.unsplash.com/photo-1596706057039-bb6d0c73295e?q=80&w=2070',
            'https://images.unsplash.com/photo-1603043868205-d143c683c316?q=80&w=2128', // Laxman Jhula
            'https://images.unsplash.com/photo-1580974852861-c381510bc98a?q=80&w=2138', // Yoga
            'https://images.unsplash.com/photo-1577977465365-27a3c3017a56?q=80&w=2070'  // River
        ],
        price: 22000,
        rating: 4.9,
        reviews: 150,
        destination: 'Rishikesh',
        type: 'spiritual',
        category: 'Spiritual',
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
        vendorId: 'v1',
        status: 'APPROVED'
    },
    // New International Gems
    {
        id: '11',
        title: 'Paris Romantic Getaway',
        description: 'Experience the city of love. Eiffel Tower dinner, Louvre Museum tour, and a romantic Seine river cruise.',
        images: [
            'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073',
            'https://images.unsplash.com/photo-1499856871940-a09627c6d7db?q=80&w=2070', // Eiffel
            'https://images.unsplash.com/photo-1565099824688-e9d997d627c1?q=80&w=2070', // Louvre
            'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?q=80&w=2100'  // Streets
        ],
        price: 120000,
        rating: 4.9,
        reviews: 410,
        destination: 'Paris',
        type: 'romantic',
        category: 'International',
        duration: 6,
        dates: ['2025-05-10', '2025-06-15'],
        itinerary: [
            { day: 1, title: 'Arrival in Paris', activities: ['Transfer to Hotel', 'Seine Cruise'] },
            { day: 2, title: 'Eiffel & Louvre', activities: ['Eiffel Tower Summit', 'Louvre Guided Tour'] },
            { day: 3, title: 'Montmartre', activities: ['Sacre Coeur', 'Art District Walk'] },
            { day: 4, title: 'Versailles Day Trip', activities: ['Palace of Versailles', 'Gardens'] },
            { day: 5, title: 'Shopping & Leisure', activities: ['Champs-Elysees', 'Galeries Lafayette'] },
            { day: 6, title: 'Departure', activities: ['Airport Drop'] }
        ],
        inclusions: ['4-Star Hotel', 'Breakfast', 'Museum Passes'],
        exclusions: ['Flights', 'City Tax'],
        vendorId: 'v2',
        status: 'APPROVED'
    },
    {
        id: '12',
        title: 'Bali Island Paradise',
        description: 'Tropical bliss in Bali. Explore Ubud rice terraces, Uluwatu temple, and relax on Kuta beach.',
        images: [
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038',
            'https://images.unsplash.com/photo-1552695701-d419d1dc9080?q=80&w=2070', // Ubud
            'https://images.unsplash.com/photo-1537953773345-d172790806f7?q=80&w=2000', // Rice Terrace
            'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070'  // Temple
        ],
        price: 45000,
        rating: 4.7,
        reviews: 280,
        destination: 'Bali',
        type: 'leisure',
        category: 'International',
        duration: 7,
        dates: ['2025-04-01', '2025-05-20'],
        itinerary: [
            { day: 1, title: 'Arrival in Bali', activities: ['Airport check-in', 'Welcome Dinner'] },
            { day: 2, title: 'Ubud Tour', activities: ['Monkey Forest', 'Tegalalang Rice Terrace', 'Bali Swing'] },
            { day: 3, title: 'Kintamani Volcano', activities: ['Mt. Batur View', 'Coffee Plantation'] },
            { day: 4, title: 'Water Sports', activities: ['Nusa Dua Watersports', 'Uluwatu Temple'] },
            { day: 5, title: 'Nusa Penida Day Trip', activities: ['Kelingking Beach', 'Broken Beach'] },
            { day: 6, title: 'Leisure Day', activities: ['Spa & Massage', 'Shopping'] },
            { day: 7, title: 'Departure', activities: ['Airport Drop'] }
        ],
        inclusions: ['Resort Stay', 'Breakfast', 'Transfers'],
        exclusions: ['Flight', 'Personal Expenses'],
        vendorId: 'v1',
        status: 'APPROVED'
    },
    // Adventure Sports
    {
        id: '13',
        title: 'Skydiving in Dubai',
        description: 'The ultimate adrenaline rush. Tandem skydive over the Palm Jumeirah.',
        images: [
            'https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=2072',
            'https://images.unsplash.com/photo-1583567554900-561b34a6efc0?q=80&w=2070', // Skydiving
            'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=2070', // Dubai View
            'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070'  // Adrenaline
        ],
        price: 55000,
        rating: 5.0,
        reviews: 85,
        destination: 'Dubai',
        type: 'adventure',
        category: 'Adventure Sports',
        duration: 1,
        dates: ['2025-02-10', '2025-03-05'],
        itinerary: [
            { day: 1, title: 'The Jump', activities: ['Briefing', 'Skydive over Palm', 'Video Collection'] }
        ],
        inclusions: ['Skydive Ticket', 'Photos & Video'],
        exclusions: ['Transport', 'Insurance'],
        vendorId: 'v2',
        status: 'APPROVED'
    },
    {
        id: '14',
        title: 'Scuba Diving in Maldives',
        description: 'Explore the vibrant coral reefs and marine life of the Maldives.',
        images: [
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070',
            'https://images.unsplash.com/photo-1582967788606-a171f1080ca8?q=80&w=2070', // Underwater
            'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=2070', // Coral
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070'  // Beach
        ],
        price: 75000,
        rating: 4.8,
        reviews: 120,
        destination: 'Maldives',
        type: 'adventure',
        category: 'Adventure Sports',
        duration: 5,
        dates: ['2025-01-25', '2025-03-15'],
        itinerary: [
            { day: 1, title: 'Arrival', activities: ['Speedboat transfer', 'Resort Check-in'] },
            { day: 2, title: 'Dive 1', activities: ['Training', 'House Reef Dive'] },
            { day: 3, title: 'Deep Sea Dive', activities: ['Boat Trip', 'Manta Ray Point'] },
            { day: 4, title: 'Relaxation', activities: ['Beach tim', 'Sunset Cruise'] },
            { day: 5, title: 'Departure', activities: ['Speedboat to Airport'] }
        ],
        inclusions: ['Overwater Villa', 'All Meals', 'Diving Gear'],
        exclusions: ['Flights', 'Green Tax'],
        vendorId: 'v1',
        status: 'APPROVED'
    },
    // Hidden Gems
    {
        id: '15',
        title: 'Meghalaya: Abode of Clouds',
        description: 'Visit the cleanest village in Asia, walk on living root bridges, and witness the majestic Nohkalikai Falls.',
        images: [
            'https://images.unsplash.com/photo-1626078306076-237cb113702a?q=80&w=1974',
            'https://images.unsplash.com/photo-1517427677506-ade074eb1432?q=80&w=2070', // Waterfall
            'https://images.unsplash.com/photo-1627914848574-c2c6d4f9b870?q=80&w=2070', // Hills
            'https://images.unsplash.com/photo-1596484552882-62f7909ec253?q=80&w=2070'  // Root Bridge
        ],
        price: 26000,
        rating: 4.6,
        reviews: 65,
        destination: 'Meghalaya',
        type: 'adventure',
        category: 'Hidden Gems',
        duration: 6,
        dates: ['2025-04-10', '2025-05-15'],
        itinerary: [
            { day: 1, title: 'Arrival in Guwahati', activities: ['Drive to Shillong', 'Umiam Lake'] },
            { day: 2, title: 'Cherrapunji', activities: ['Nohkalikai Falls', 'Mawsmai Cave'] },
            { day: 3, title: 'Living Root Bridges', activities: ['Trek to Double Decker Bridge'] },
            { day: 4, title: 'Dawki & Mawlynnong', activities: ['Umngot River Boating', 'Cleanest Village Walk'] },
            { day: 5, title: 'Shillong Sightseeing', activities: ['Don Bosco Museum', 'Police Bazar'] },
            { day: 6, title: 'Departure', activities: ['Drop at Guwahati Airport'] }
        ],
        inclusions: ['Homestays/Hotels', 'Breakfast', 'Transport'],
        exclusions: ['Airfare', 'Lunch'],
        vendorId: 'v1',
        status: 'APPROVED'
    }
];
