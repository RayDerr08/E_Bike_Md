// ==========================================
// Carousel Manager - Why Us Section
// ==========================================

class CarouselManager {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.visibleSlides = 3;
        this.slideWidth = 320; // 300px + 20px gap
        this.carousel = null;
        this.wrapper = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.autoplayInterval = null;
        this.autoplayDelay = 4000;
        this.isAutoplayEnabled = true;
        this.init();
    }

    init() {
        this.cacheElements();
        this.createCarouselContent();
        this.updateVisibleSlides();
        this.bindEvents();
        this.setupAutoplay();
        this.setupTouchEvents();
        this.setupKeyboardNavigation();
    }

    cacheElements() {
        this.carousel = document.getElementById('why-carousel');
        this.prevBtn = document.getElementById('carousel-prev');
        this.nextBtn = document.getElementById('carousel-next');
        this.wrapper = this.carousel?.parentElement;
    }

    createCarouselContent() {
        if (!this.carousel || typeof window.WHY_CHOOSE_US === 'undefined') return;

        const items = window.WHY_CHOOSE_US;
        this.totalSlides = items.length;

        this.carousel.innerHTML = items.map((item, index) => `
            <div class="why-card" data-slide="${index}">
                <div class="why-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <div class="card-overlay">
                    <p class="overlay-text">${item.details}</p>
                </div>
            </div>
        `).join('');
        this.updateCarouselPosition();
    }

    updateVisibleSlides() {
        const width = window.innerWidth;

        if (width < 576) {
            this.visibleSlides = 1;
            this.slideWidth = 250;
        } else if (width < 768) {
            this.visibleSlides = 1;
            this.slideWidth = 280;
        } else if (width < 992) {
            this.visibleSlides = 2;
            this.slideWidth = 300;
        } else {
            this.visibleSlides = 3;
            this.slideWidth = 320;
        }

        this.updateCarouselPosition();
        this.updateButtonStates();
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Pause autoplay on hover
        if (this.carousel) {
            this.carousel.addEventListener('mouseenter', () => this.pauseAutoplay());
            this.carousel.addEventListener('mouseleave', () => this.resumeAutoplay());
        }

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.updateVisibleSlides();
        }, 250));

        // Handle focus events for accessibility
        document.querySelectorAll('.why-card').forEach((card, index) => {
            card.addEventListener('focus', () => {
                this.goToSlide(Math.floor(index / this.visibleSlides) * this.visibleSlides);
            });
        });
    }

    setupTouchEvents() {
        if (!this.carousel) return;

        let startX = 0;
        let endX = 0;
        let isDragging = false;

        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoplay();
        }, { passive: true });

        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            endX = e.touches[0].clientX;
        }, { passive: true });

        this.carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const difference = startX - endX;
            const threshold = 50;

            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            this.resumeAutoplay();
        }, { passive: true });

        // Mouse drag support for desktop
        let mouseStartX = 0;
        let mouseEndX = 0;
        let isMouseDragging = false;

        this.carousel.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isMouseDragging = true;
            this.carousel.style.cursor = 'grabbing';
            this.pauseAutoplay();
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isMouseDragging) return;
            mouseEndX = e.clientX;
        });

        document.addEventListener('mouseup', () => {
            if (!isMouseDragging) return;
            isMouseDragging = false;
            this.carousel.style.cursor = 'grab';

            const difference = mouseStartX - mouseEndX;
            const threshold = 50;

            if (Math.abs(difference) > threshold) {
                if (difference > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            this.resumeAutoplay();
        });
    }

    setupKeyboardNavigation() {
        if (!this.wrapper) return;

        this.wrapper.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prevSlide();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSlide(Math.max(0, this.totalSlides - this.visibleSlides));
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.toggleAutoplay();
                    break;
            }
        });

        // Make wrapper focusable
        this.wrapper.setAttribute('tabindex', '0');
        this.wrapper.setAttribute('aria-label', 'Why choose us carousel. Use arrow keys to navigate.');
    }

    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
            this.updateCarouselPosition();
            this.updateButtonStates();
            this.announceSlideChange();
        } else if (this.isLooping()) {
            // Loop to end
            this.currentSlide = Math.max(0, this.totalSlides - this.visibleSlides);
            this.updateCarouselPosition();
            this.updateButtonStates();
            this.announceSlideChange();
        }
    }

    nextSlide() {
        const maxSlide = Math.max(0, this.totalSlides - this.visibleSlides);

        if (this.currentSlide < maxSlide) {
            this.currentSlide++;
            this.updateCarouselPosition();
            this.updateButtonStates();
            this.announceSlideChange();
        } else if (this.isLooping()) {
            // Loop to beginning
            this.currentSlide = 0;
            this.updateCarouselPosition();
            this.updateButtonStates();
            this.announceSlideChange();
        }
    }

    goToSlide(slideIndex) {
        const maxSlide = Math.max(0, this.totalSlides - this.visibleSlides);
        this.currentSlide = Math.max(0, Math.min(slideIndex, maxSlide));
        this.updateCarouselPosition();
        this.updateButtonStates();
        this.announceSlideChange();
    }

    updateCarouselPosition() {
        if (!this.carousel) return;

        const translateX = -this.currentSlide * this.slideWidth;
        this.carousel.style.transform = `translateX(${translateX}px)`;

        // Update active indicators if they exist
        this.updateActiveIndicators();
    }

    updateButtonStates() {
        if (!this.prevBtn || !this.nextBtn) return;

        const maxSlide = Math.max(0, this.totalSlides - this.visibleSlides);

        if (this.isLooping()) {
            // Always enable buttons if looping
            this.prevBtn.disabled = false;
            this.nextBtn.disabled = false;
        } else {
            this.prevBtn.disabled = this.currentSlide === 0;
            this.nextBtn.disabled = this.currentSlide >= maxSlide;
        }

        // Update ARIA labels
        this.prevBtn.setAttribute('aria-label', `Previous slide (${this.currentSlide + 1} of ${Math.ceil(this.totalSlides / this.visibleSlides)})`);
        this.nextBtn.setAttribute('aria-label', `Next slide (${this.currentSlide + 1} of ${Math.ceil(this.totalSlides / this.visibleSlides)})`);
    }

    updateActiveIndicators() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === this.currentSlide) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            } else {
                indicator.classList.remove('active');
                indicator.removeAttribute('aria-current');
            }
        });
    }

    setupAutoplay() {
        if (!this.isAutoplayEnabled) return;

        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resumeAutoplay() {
        if (this.isAutoplayEnabled && !this.autoplayInterval) {
            this.setupAutoplay();
        }
    }

    toggleAutoplay() {
        this.isAutoplayEnabled = !this.isAutoplayEnabled;

        if (this.isAutoplayEnabled) {
            this.resumeAutoplay();
        } else {
            this.pauseAutoplay();
        }

        // Announce change to screen readers
        const message = this.isAutoplayEnabled ? 'Autoplay enabled' : 'Autoplay disabled';
        this.announceToScreenReader(message);
    }

    isLooping() {
        return this.totalSlides > this.visibleSlides;
    }

    announceSlideChange() {
        const currentPage = Math.floor(this.currentSlide / this.visibleSlides) + 1;
        const totalPages = Math.ceil(this.totalSlides / this.visibleSlides);
        const message = `Showing slide ${currentPage} of ${totalPages}`;

        this.announceToScreenReader(message);
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // Create pagination dots (optional)
    createPaginationDots() {
        const totalPages = Math.ceil(this.totalSlides / this.visibleSlides);
        if (totalPages <= 1) return;

        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'carousel-pagination';

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = 'carousel-indicator';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => this.goToSlide(i * this.visibleSlides));

            if (i === 0) {
                dot.classList.add('active');
                dot.setAttribute('aria-current', 'true');
            }

            paginationContainer.appendChild(dot);
        }

        if (this.wrapper) {
            this.wrapper.appendChild(paginationContainer);
        }
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance optimization
    preloadImages() {
        const images = this.carousel?.querySelectorAll('img');
        images?.forEach(img => {
            const imageObj = new Image();
            imageObj.src = img.src;
        });
    }

    // Cleanup method
    destroy() {
        this.pauseAutoplay();

        // Remove event listeners
        if (this.prevBtn) {
            this.prevBtn.replaceWith(this.prevBtn.cloneNode(true));
        }
        if (this.nextBtn) {
            this.nextBtn.replaceWith(this.nextBtn.cloneNode(true));
        }

        // Clear references
        this.carousel = null;
        this.wrapper = null;
        this.prevBtn = null;
        this.nextBtn = null;
    }
}

// Alternative simpler carousel for mobile
class SimpleCarousel {
    constructor(element) {
        this.element = element;
        this.currentSlide = 0;
        this.totalSlides = 0;
        this.init();
    }

    init() {
        if (!this.element) return;

        const slides = this.element.querySelectorAll('.why-card');
        this.totalSlides = slides.length;

        // Simple swipe detection
        let startX = 0;
        let endX = 0;

        this.element.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        this.element.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const difference = startX - endX;
        const threshold = 50;

        if (Math.abs(difference) > threshold) {
            if (difference > 0 && this.currentSlide < this.totalSlides - 1) {
                this.currentSlide++;
            } else if (difference < 0 && this.currentSlide > 0) {
                this.currentSlide--;
            }

            this.updatePosition();
        }
    }

    updatePosition() {
        const slides = this.element.querySelectorAll('.why-card');
        slides.forEach((slide, index) => {
            slide.style.display = index === this.currentSlide ? 'block' : 'none';
        });
    }
}

// Initialize carousel
const carouselManager = new CarouselManager();

// Export for global access
window.carouselManager = carouselManager;

// Initialize simple carousel for mobile fallback
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 768) {
        const carouselElement = document.getElementById('why-carousel');
        if (carouselElement) {
            new SimpleCarousel(carouselElement);
        }
    }
});
