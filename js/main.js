// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Bike data
// Updated bikes array with complete details
const bikes = [
    {
        id: 'reco-classic',
        name: 'RECO Wave Trekking 750',
        motto: 'The Original',
        price: '€2,999',
        image: 'images/bikes/reco-classic.png',
        description: 'Perfect for city commuting and weekend adventures. German engineering meets sustainable design with our 100% recyclable carbon frame.',
        features: ['City Commute', 'Weekend Tours', 'Made in Germany']
    },
    {
        id: 'reco-urban',
        name: 'RECO Urban',
        motto: 'City Spirit',
        price: '€3,199',
        image: 'images/bikes/reco-urban.png',
        description: 'Urban performance meets comfort and practicality. Designed for everyday commuting in style and ease.',
        features: ['Urban Use', 'Low Step Frame', 'Reinforced Rims']
    },
    {
        id: 'alpha-sport',
        name: 'Alpha Sport',
        motto: 'Speed Meets Style',
        price: '€2,799',
        image: 'images/bikes/alpha-sport.png',
        description: 'The Alpha Sport is for those who demand both speed and comfort. Lightweight and stylish for your everyday rides.',
        features: ['Lightweight', 'High Speed', 'Ergonomic Grips']
    },
    {
        id: 'alpha-commuter',
        name: 'Alpha Commuter',
        motto: 'The Complete',
        price: '€2,199',
        image: 'images/bikes/alpha-commuter.jpg',
        description: 'The complete electric bike package for leisure or commuting. Quality components and European manufacture give this bike all round appeal.',
        features: ['All Weather', 'Leisure & Commute', '24 Speed']
    },
    {
        id: 'delta-mtb',
        name: 'Delta MTB',
        motto: 'The Adventure',
        price: '€2,599',
        image: 'images/bikes/delta-mtb.jpg',
        description: 'A great looking and highly spec\'d hardtail MTB style electric bike. Perfect for trail adventures and off-road excitement.',
        features: ['Trail Ready', '27 Speed', 'Suspension Fork']
    },
    {
        id: 'delta-pro',
        name: 'Delta Pro',
        motto: 'Dominate the Trails',
        price: '€3,099',
        image: 'images/bikes/delta-pro.png',
        description: 'Top-tier mountain e-bike with enhanced components for superior performance on tough terrain.',
        features: ['Off-Road Beast', 'Hydraulic Brakes', 'Pro Suspension']
    }
];

// Populate bikes dropdown
function populateBikesDropdown() {
    const bikesGrid = document.getElementById('bikes-grid');
    bikesGrid.innerHTML = '';

    bikes.forEach(bike => {
        const bikeCard = document.createElement('div');
        bikeCard.className = 'bike-card';
        bikeCard.innerHTML = `
                    <img src="${bike.image}" alt="${bike.name}">
                    <h4>${bike.name}</h4>
                    <div class="bike-price">${bike.price}</div>
                `;
        bikeCard.addEventListener('click', () => {
            // Navigate to individual bike page
            console.log(`Navigate to ${bike.id} page`);
        });
        bikesGrid.appendChild(bikeCard);
    });
}

// Navigation scroll behavior
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// E-bikes dropdown functionality
const ebikesMenu = document.getElementById('ebikes-menu');
const bikesDropdown = document.getElementById('bikes-dropdown');
const closeDropdown = document.getElementById('close-dropdown');

ebikesMenu.addEventListener('click', (e) => {
    e.preventDefault();
    bikesDropdown.classList.add('active');
    populateBikesDropdown();
});

closeDropdown.addEventListener('click', () => {
    bikesDropdown.classList.remove('active');
});

bikesDropdown.addEventListener('click', (e) => {
    if (e.target === bikesDropdown) {
        bikesDropdown.classList.remove('active');
    }
});

// Contact modal functionality
const bookCallBtn = document.getElementById('book-call-btn');
const letsCallModal = document.getElementById('lets-call-modal');
const contactModal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modal-close');

function openContactModal() {
    contactModal.classList.add('active');
}

function closeContactModal() {
    contactModal.classList.remove('active');
}

bookCallBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openContactModal();
});

letsCallModal.addEventListener('click', openContactModal);
modalClose.addEventListener('click', closeContactModal);

contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// Features slider functionality
const featuresSlider = document.getElementById('features-slider');
const prevSlide = document.getElementById('prev-slide');
const nextSlide = document.getElementById('next-slide');
let currentSlide = 0;
const slideWidth = 320; // 300px + 20px gap

nextSlide.addEventListener('click', () => {
    const maxSlides = document.querySelectorAll('.feature-card').length - 3;
    if (currentSlide < maxSlides) {
        currentSlide++;
        featuresSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
});

prevSlide.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        featuresSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }
});

// Smooth scrolling for floating arrows
document.querySelectorAll('.floating-arrow').forEach(arrow => {
    arrow.addEventListener('click', () => {
        const currentCard = arrow.closest('.hero-card');
        const nextCard = currentCard.nextElementSibling;
        if (nextCard) {
            nextCard.scrollIntoView({behavior: 'smooth'});
        }
    });
});

// Test ride buttons functionality
document.querySelectorAll('.test-ride-btn').forEach(btn => {
    btn.addEventListener('click', openContactModal);
});

// Explore buttons functionality
document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Navigate to individual bike page');
        // You can implement navigation to specific bike pages here
    });
});

// Learn more button functionality
document.querySelector('.learn-more-btn').addEventListener('click', () => {
    console.log('Navigate to types/usage page');
    // You can implement navigation to the types page here
});

// Auto-hide features slider arrows on mobile
function checkSliderArrows() {
    const container = document.querySelector('.slider-container');
    if (window.innerWidth <= 768) {
        prevSlide.style.display = currentSlide === 0 ? 'none' : 'flex';
        nextSlide.style.display = currentSlide >= 3 ? 'none' : 'flex';
    } else {
        prevSlide.style.display = 'flex';
        nextSlide.style.display = 'flex';
    }
}

window.addEventListener('resize', checkSliderArrows);
checkSliderArrows();

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (contactModal.classList.contains('active') && e.key === 'Escape') {
        closeContactModal();
    }
    if (bikesDropdown.classList.contains('active') && e.key === 'Escape') {
        bikesDropdown.classList.remove('active');
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('E-BIKE-MD website loaded successfully!');
});

function generateHeroCards() {
    const heroSection = document.querySelector('.hero-section');
    heroSection.innerHTML = ''; // Clear old content

    const firstThree = bikes.slice(0, 3);

    firstThree.forEach((bike, index) => {
        const isFlipped = index % 2 === 0 ? 'flip' : '';
        const orderText = index % 2 === 0 ? '' : 'order-lg-2';
        const orderImage = index % 2 === 0 ? '' : 'order-lg-1';

        const arrowHTML = index === 0
            ? `<div class="floating-arrow" aria-label="Scroll to next">↓</div>`
            : '';

        const card = document.createElement('section');
        card.className = 'hero-card';
        card.setAttribute('data-aos', 'fade-up');

        card.innerHTML = `
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 ${orderText}">
                        <div class="bike-content">
                            <p class="bike-name">${bike.name}</p>
                            <h1 class="bike-motto">"${bike.motto}"</h1>
                            <div class="bike-actions">
                                <button class="explore-btn" data-id="${bike.id}">Explore</button>
                                <span class="bike-price-display">From ${bike.price}</span>
                                <button class="test-ride-btn">Book a test ride</button>
                            </div>
                            <div class="bike-description">
                                ${bike.description}
                            </div>
                            <div class="bike-features">
                                ${bike.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 ${orderImage}">
                        <div class="bike-image ${isFlipped}" data-aos="${index % 2 === 0 ? 'slide-left' : 'slide-right'}">
                            <img src="${bike.image}" alt="${bike.name}" />
                        </div>
                    </div>
                </div>
                ${arrowHTML}
            </div>
        `;

        heroSection.appendChild(card);
    });

    AOS.refresh();
}

function bindFloatingArrows() {
    document.querySelectorAll('.floating-arrow').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const currentCard = arrow.closest('.hero-card');
            const nextCard = currentCard.nextElementSibling;
            if (nextCard) {
                nextCard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Run this on page load
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    generateHeroCards(); // ✅ Load hero cards

    // 🔁 Re-bind floating arrows after cards are rendered
    bindFloatingArrows();
});
