// ==========================================
// Bike Data - Specifications and Information
// ==========================================

const BIKE_DATA = {
    classic: {
        id: 'classic',
        name: 'RECO Classic',
        nickname: 'The Original',
        price: 2299,
        currency: '€',
        colors: ['cream', 'white', 'beige'],
        primaryColor: 'cream',
        category: 'cruiser',
        images: {
            main: './images/bikes/classic-1.jpg',
            gallery: [
                './images/bikes/classic-1.jpg',
                './images/bikes/classic-2.jpg'
            ],
            lifestyle: './images/lifestyle/riding-city.jpg'
        },
        description: 'Perfect for city commuting and leisurely rides. German engineering meets sustainable design in our flagship model.',
        shortDescription: 'Comfortable city cruiser with premium features',
        tags: ['City Comfort', '100% Recyclable', '30yr Warranty'],
        specifications: {
            frame: {
                material: '100% recyclable carbon composite',
                warranty: '30 years',
                manufacturing: 'Made in Germany',
                design: 'Single mould construction'
            },
            motor: {
                brand: 'Bosch',
                power: '250W',
                type: 'Mid-drive',
                torque: '65 Nm',
                warranty: '3 years'
            },
            battery: {
                capacity: '500Wh',
                type: 'Lithium-ion',
                range: 'Up to 80km',
                chargeTime: '4-6 hours',
                warranty: '3 years'
            },
            drivetrain: {
                gears: '8-speed',
                brand: 'Shimano Acera',
                type: 'Internal hub'
            },
            brakes: {
                type: 'Hydraulic disc brakes',
                brand: 'Shimano',
                size: '160mm rotors'
            },
            wheels: {
                size: '28 inches',
                tires: 'Premium comfort tires',
                suspension: 'Front suspension fork'
            },
            weight: {
                total: '22kg',
                maxLoad: '120kg'
            },
            features: [
                'Integrated LED lighting system',
                'Digital display with 5 assistance levels',
                'Anti-theft alarm system',
                'Removable battery',
                'Adjustable stem and seat',
                'Mudguards included',
                'Rear rack compatible'
            ]
        },
        sustainability: {
            carbonSavings: '68% less CO2 emissions',
            recyclable: '100% frame recyclability',
            materials: '40% recycled automotive carbon waste',
            endOfLife: 'Full material recovery possible'
        },
        warranty: {
            frame: '30 years',
            motor: '3 years',
            battery: '3 years (upgradeable to 5)',
            components: '2 years'
        },
        financing: {
            available: true,
            options: ['0% interest for 12 months', 'Extended payment plans', 'Bank financing'],
            minDownPayment: '20%'
        },
        accessories: {
            included: ['Charger', 'User manual', 'Basic toolkit'],
            recommended: ['Premium helmet', 'Security lock', 'Phone mount', 'Panniers']
        },
        usage: ['Urban commuting', 'Leisure rides', 'Short tours', 'Daily transport'],
        reviews: {
            rating: 4.8,
            count: 156,
            highlights: ['Incredibly smooth ride', 'Amazing battery life', 'Premium build quality']
        }
    },

    trekking: {
        id: 'trekking',
        name: 'Alpha Trekking',
        nickname: 'The Explorer',
        price: 2599,
        currency: '€',
        colors: ['brown', 'forest-green', 'midnight-blue'],
        primaryColor: 'brown',
        category: 'trekking',
        images: {
            main: './images/bikes/trekking-1.jpg',
            gallery: [
                './images/bikes/trekking-1.jpg',
                './images/bikes/trekking-2.jpg'
            ],
            lifestyle: './images/lifestyle/riding-mountain.jpg'
        },
        description: 'Built for adventure. From city streets to mountain trails, this versatile e-bike handles all terrains with confidence.',
        shortDescription: 'Versatile all-terrain e-bike for every adventure',
        tags: ['All-Terrain', '61 Mile Range', '24-Speed Gears'],
        specifications: {
            frame: {
                material: 'Aluminum alloy',
                size: '48cm',
                type: 'Step-through design',
                warranty: '5 years'
            },
            motor: {
                brand: 'Promovec',
                power: '250W',
                type: 'Rear hub',
                warranty: '3 years'
            },
            battery: {
                capacity: '460Wh (standard) / 625Wh (long range)',
                type: 'Lithium-ion',
                range: 'Up to 98km (long range)',
                chargeTime: '4-6 hours',
                weight: '2.4kg',
                removable: true
            },
            drivetrain: {
                gears: '24-speed (8x3)',
                brand: 'Shimano Acera',
                type: 'Derailleur system'
            },
            brakes: {
                type: 'Hydraulic disc brakes',
                brand: 'Shimano',
                front: '180mm rotor',
                rear: '160mm rotor'
            },
            wheels: {
                size: '26 inches',
                tires: 'All-terrain tires with puncture protection',
                rims: 'Double-wall aluminum'
            },
            suspension: {
                front: 'Suspension fork with lockout',
                travel: '100mm',
                adjustable: true
            },
            weight: {
                total: '22.7kg (with standard battery)',
                withoutBattery: '19.8kg',
                maxLoad: '120kg',
                rackCapacity: '25kg'
            },
            features: [
                'Integrated LED lighting (system powered)',
                'LCD display with 4-5 power levels',
                'Mudguards and chain guard',
                'Rear rack included',
                'Kickstand',
                'Bell',
                'Reflectors'
            ]
        },
        powerLevels: {
            eco: 'Maximum range, gentle assistance',
            normal: 'Balanced power and range',
            sport: 'Increased power for hills',
            turbo: 'Maximum power assistance'
        },
        dimensions: {
            length: '177cm',
            height: '110cm',
            width: '64cm',
            saddleHeightMin: '91cm',
            saddleHeightMax: '111cm',
            wheelbase: '111cm'
        },
        warranty: {
            frame: '5 years',
            motor: '3 years',
            battery: '3 years (upgradeable to 5)',
            cycleParts: '2 years'
        },
        range: {
            eco: '30-68km',
            standard: '36-80km',
            longRange: '33-98km'
        },
        usage: ['Long-distance touring', 'Mountain trails', 'Urban commuting', 'Weekend adventures'],
        reviews: {
            rating: 4.7,
            count: 203,
            highlights: ['Excellent for long rides', 'Handles hills effortlessly', 'Very comfortable']
        }
    },

    mountain: {
        id: 'mountain',
        name: 'Delta Mountain',
        nickname: 'The Beast',
        price: 2799,
        currency: '€',
        colors: ['matte-black', 'racing-red', 'electric-blue'],
        primaryColor: 'red',
        category: 'mountain',
        images: {
            main: './images/bikes/mountain-1.jpg',
            gallery: [
                './images/bikes/mountain-1.jpg',
                './images/bikes/mountain-2.jpg'
            ],
            lifestyle: './images/lifestyle/riding-towards-camera.jpg'
        },
        description: 'Conquer any mountain with power and precision. Lightweight frame, hydraulic brakes, and unmatched performance.',
        shortDescription: 'High-performance mountain e-bike for serious riders',
        tags: ['Mountain Ready', '62 Mile Range', 'Hydraulic Disc'],
        specifications: {
            frame: {
                material: 'Lightweight aluminum',
                size: '51cm',
                type: 'Hardtail MTB',
                geometry: 'Aggressive mountain geometry',
                warranty: '5 years'
            },
            motor: {
                brand: 'Promovec',
                power: '250W',
                type: 'Rear hub',
                torque: 'High torque for climbing',
                warranty: '3 years'
            },
            battery: {
                capacity: '375Wh (standard) / 460Wh (long range)',
                type: 'Lithium-ion',
                range: 'Up to 100km',
                chargeTime: '4-6 hours',
                weight: '2.4kg',
                integration: 'In-frame design'
            },
            drivetrain: {
                gears: '27-speed (9x3)',
                brand: 'Shimano Acera',
                type: 'Derailleur system',
                cassette: 'Wide-range cassette'
            },
            brakes: {
                type: 'Shimano hydraulic disc brakes',
                rotorSize: '180mm front, 160mm rear',
                performance: 'All-weather stopping power'
            },
            wheels: {
                size: '28/29 inches',
                tires: 'Schwalbe Rapid Rob with Kevlar guard',
                tread: 'Aggressive mountain tread pattern',
                rims: 'Tubeless ready'
            },
            suspension: {
                front: 'Suntour suspension fork',
                travel: '100mm',
                lockout: 'Hydraulic lockout',
                adjustable: 'Preload and rebound'
            },
            weight: {
                total: '20.5kg (with standard battery)',
                withoutBattery: '18.1kg',
                maxLoad: '120kg'
            },
            features: [
                'System-powered LED lights',
                'Center LCD display (5 power levels)',
                'Chain guide for chain retention',
                'Tubeless-ready wheels',
                'Quick-release wheels',
                'Mountain-specific geometry',
                'Aggressive tire tread'
            ]
        },
        mountainFeatures: {
            climbing: 'Optimized for steep ascents',
            descending: 'Stable and controlled on descents',
            traction: 'Superior grip on loose terrain',
            durability: 'Built to withstand rough use'
        },
        dimensions: {
            length: '186cm',
            height: '113cm',
            width: '69cm',
            saddleHeightMin: '89cm',
            saddleHeightMax: '107cm',
            wheelbase: '112cm'
        },
        warranty: {
            frame: '5 years',
            motor: '3 years',
            battery: '3 years (upgradeable to 5)',
            cycleParts: '2 years'
        },
        range: {
            standard: '36-80km',
            longRange: '45-100km'
        },
        usage: ['Mountain biking', 'Trail riding', 'Steep climbs', 'Technical terrain'],
        reviews: {
            rating: 4.9,
            count: 87,
            highlights: ['Incredible climbing power', 'Rock solid build', 'Handles any terrain']
        }
    }
};

// Why choose us data
const WHY_CHOOSE_US = [
    {
        icon: '🛡️',
        title: '30-Year Warranty',
        description: 'Unmatched protection on our carbon frames. Built to last a lifetime.',
        details: 'Industry-leading warranty coverage on frame components with full replacement guarantee.'
    },
    {
        icon: '🚚',
        title: 'Easy Delivery',
        description: 'Free delivery to your doorstep. Professional assembly available.',
        details: 'Nationwide delivery within 3-5 business days. White-glove assembly service optional.'
    },
    {
        icon: '🚴',
        title: 'Test Rides',
        description: 'Try before you buy. Schedule a test ride at your convenience.',
        details: 'Book a 30-minute test ride at your location. No commitment required.'
    },
    {
        icon: '⭐',
        title: 'Premium Quality',
        description: 'German engineering with sustainable materials and Bosch motors.',
        details: 'Every component selected for durability, performance, and environmental responsibility.'
    },
    {
        icon: '💳',
        title: 'Flexible Payment',
        description: 'Bank financing available. Pay in installments with 0% interest options.',
        details: 'Multiple payment options including 12-month interest-free financing.'
    },
    {
        icon: '♻️',
        title: '100% Recyclable',
        description: 'Sustainable choice. Our frames are completely recyclable.',
        details: 'End-of-life recycling program ensures zero waste and material recovery.'
    }
];

// Contact information
const CONTACT_INFO = {
    phone: '+373 XX XXX XXX',
    whatsapp: '+373 XX XXX XXX',
    telegram: '@ebikemd',
    instagram: '@ebikemd',
    email: 'info@e-bike-md.com',
    address: {
        street: 'Street Name 123',
        city: 'Chisinau',
        country: 'Moldova',
        zipCode: 'MD-2000'
    },
    businessHours: {
        monday: '09:00 - 18:00',
        tuesday: '09:00 - 18:00',
        wednesday: '09:00 - 18:00',
        thursday: '09:00 - 18:00',
        friday: '09:00 - 18:00',
        saturday: '10:00 - 16:00',
        sunday: 'Closed'
    }
};

// Utility functions for bike data
const BikeDataUtils = {
    getBike: (bikeId) => BIKE_DATA[bikeId] || null,

    getAllBikes: () => Object.values(BIKE_DATA),

    getBikesByCategory: (category) =>
        Object.values(BIKE_DATA).filter(bike => bike.category === category),

    getBikesByPriceRange: (min, max) =>
        Object.values(BIKE_DATA).filter(bike => bike.price >= min && bike.price <= max),

    getBikeColors: (bikeId) => BIKE_DATA[bikeId]?.colors || [],

    formatPrice: (price, currency = '€') => `${currency}${price.toLocaleString()}`,

    getSpecification: (bikeId, category, spec) => {
        const bike = BIKE_DATA[bikeId];
        return bike?.specifications?.[category]?.[spec] || null;
    },

    searchBikes: (query) => {
        const lowercaseQuery = query.toLowerCase();
        return Object.values(BIKE_DATA).filter(bike =>
            bike.name.toLowerCase().includes(lowercaseQuery) ||
            bike.nickname.toLowerCase().includes(lowercaseQuery) ||
            bike.description.toLowerCase().includes(lowercaseQuery) ||
            bike.category.toLowerCase().includes(lowercaseQuery) ||
            bike.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    },

    compareSpecs: (bikeId1, bikeId2, specCategory) => {
        const bike1 = BIKE_DATA[bikeId1];
        const bike2 = BIKE_DATA[bikeId2];

        if (!bike1 || !bike2) return null;

        return {
            [bike1.name]: bike1.specifications[specCategory] || {},
            [bike2.name]: bike2.specifications[specCategory] || {}
        };
    },

    getRecommendedBikes: (currentBikeId, limit = 2) => {
        const currentBike = BIKE_DATA[currentBikeId];
        if (!currentBike) return [];

        const otherBikes = Object.values(BIKE_DATA)
            .filter(bike => bike.id !== currentBikeId)
            .sort((a, b) => b.reviews.rating - a.reviews.rating);

        return otherBikes.slice(0, limit);
    }
};

// Export data and utilities
window.BIKE_DATA = BIKE_DATA;
window.WHY_CHOOSE_US = WHY_CHOOSE_US;
window.CONTACT_INFO = CONTACT_INFO;
window.BikeDataUtils = BikeDataUtils;

// Initialize data validation in development
if (typeof console !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Bike data loaded:', Object.keys(BIKE_DATA));
    console.log('Total bikes:', Object.keys(BIKE_DATA).length);
    console.log('Why choose us items:', WHY_CHOOSE_US.length);
}