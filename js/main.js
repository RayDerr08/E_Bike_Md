// ==========================================
// Main Application Logic
// ==========================================

class EBikeMDApp {
    constructor() {
        this.init();
        this.bindEvents();
        this.loadComponents();
    }

    init() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true,
                offset: 100,
                disable: 'mobile'
            });
        }

        // Add navbar padding to body
        this.adjustBodyPadding();

        // Initialize scroll handling
        this.initScrollHandling();

        // Load header and footer
        this.loadHeaderFooter();
    }

    adjustBodyPadding() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            document.body.style.paddingTop = navbar.offsetHeight + 'px';
        }
    }

    initScrollHandling() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar?.classList.add('hidden');
            } else {
                navbar?.classList.remove('hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }

    bindEvents() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindAllEvents());
        } else {
            this.bindAllEvents();
        }
    }

    bindAllEvents() {
        // Smooth scroll for internal links
        this.bindSmoothScroll();

        // Test ride buttons
        this.bindTestRideButtons();

        // Scroll indicator
        this.bindScrollIndicator();

        // Bike card clicks
        this.bindBikeCardClicks();
    }

    bindSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    bindTestRideButtons() {
        document.querySelectorAll('[data-action="book-test-ride"]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.openContactModal();
            });
        });
    }

    bindScrollIndicator() {
        document.querySelectorAll('.scroll-indicator').forEach(indicator => {
            indicator.addEventListener('click', () => {
                this.scrollToNextSection();
            });
        });
    }

    bindBikeCardClicks() {
        document.querySelectorAll('.bike-card[data-bike]').forEach(card => {
            card.addEventListener('click', () => {
                const bikeType = card.dataset.bike;
                this.navigateToBike(bikeType);
            });

            // Add keyboard support
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const bikeType = card.dataset.bike;
                    this.navigateToBike(bikeType);
                }
            });

            // Make focusable
            card.setAttribute('tabindex', '0');
        });
    }

    scrollToNextSection() {
        const currentSection = this.getCurrentSection();
        const nextSection = currentSection?.nextElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('.hero-card, section');
        const scrollPos = window.pageYOffset + window.innerHeight / 2;

        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop <= scrollPos) {
                return sections[i];
            }
        }
        return sections[0];
    }

    navigateToBike(bikeType) {
        const bikePages = {
            'classic': './bike-classic.html',
            'trekking': './bike-trekking.html',
            'mountain': './bike-mountain.html'
        };

        const targetPage = bikePages[bikeType];
        if (targetPage) {
            window.location.href = targetPage;
        }
    }

    openContactModal() {
        if (window.modalManager) {
            window.modalManager.openContactModal();
        }
    }

    loadComponents() {
        // Load navigation component if it exists
        if (window.navigationManager) {
            window.navigationManager.init();
        }

        // Load carousel component if it exists
        if (window.carouselManager) {
            window.carouselManager.init();
        }

        // Load modal component if it exists
        if (window.modalManager) {
            window.modalManager.init();
        }
    }

    async loadHeaderFooter() {
        try {
            // Load header
            const headerContainer = document.getElementById('main-header');
            if (headerContainer) {
                headerContainer.innerHTML = await this.loadComponent('./components/header.html');
            }

            // Load footer
            const footerContainer = document.getElementById('main-footer');
            if (footerContainer) {
                footerContainer.innerHTML = await this.loadComponent('./components/footer.html');
            }
        } catch (error) {
            console.warn('Could not load header/footer components:', error);
            // Fallback to inline header/footer
            this.createFallbackHeader();
            this.createFallbackFooter();
        }
    }

    async loadComponent(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to load ${url}`);
        }
        return await response.text();
    }

    createFallbackHeader() {
        const headerContainer = document.getElementById('main-header');
        if (!headerContainer) return;

        headerContainer.innerHTML = `
            <nav class="navbar">
                <div class="container">
                    <a class="navbar-brand" href="/index.html">
                        <div class="bike-logo"></div>
                        E-BIKE-MD
                    </a>
                    
                    <div class="nav-menu" id="nav-menu">
                        <a href="#" class="nav-link" id="ebikes-btn">E-Bikes</a>
                        <a href="/accessories.html" class="nav-link">Accessories</a>
                        <a href="/types.html" class="nav-link">Types</a>
                        <a href="/about.html" class="nav-link">About</a>
                    </div>

                    <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <a href="#" class="cta-button" id="book-call-btn">Let's Book a Call</a>
                </div>
            </nav>
        `;

        // Re-bind navigation events
        if (window.navigationManager) {
            window.navigationManager.bindEvents();
        }
    }

    createFallbackFooter() {
        const footerContainer = document.getElementById('main-footer');
        if (!footerContainer) return;

        footerContainer.innerHTML = `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h4>Explore</h4>
                            <a href="/bikes.html">All Bikes</a>
                            <a href="/bike-classic.html">Classic</a>
                            <a href="/bike-trekking.html">Trekking</a>
                            <a href="/bike-mountain.html">Mountain</a>
                            <a href="/accessories.html">Accessories</a>
                        </div>
                        
                        <div class="footer-section">
                            <h4>Services</h4>
                            <a href="#" onclick="window.modalManager?.openContactModal()">Test Rides</a>
                            <a href="#" onclick="window.modalManager?.openContactModal()">Delivery</a>
                            <a href="#" onclick="window.modalManager?.openContactModal()">Warranty</a>
                            <a href="#" onclick="window.modalManager?.openContactModal()">Financing</a>
                        </div>
                        
                        <div class="footer-section">
                            <h4>About</h4>
                            <a href="/about.html">Our Story</a>
                            <a href="/types.html">Bike Types</a>
                            <a href="#" onclick="window.modalManager?.openContactModal()">Contact</a>
                        </div>
                        
                        <div class="footer-section">
                            <h4>Stay Connected</h4>
                            <p>Follow us for updates and tips</p>
                            <div class="social-icons">
                                <a href="#" class="social-icon" aria-label="Instagram">📷</a>
                                <a href="#" class="social-icon" aria-label="Facebook">📘</a>
                                <a href="#" class="social-icon" aria-label="WhatsApp">💬</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-center mt-4 pt-4" style="border-top: 1px solid #333;">
                        <p class="text-muted">&copy; 2025 E-BIKE-MD. All rights reserved. | Made with ❤️ in Moldova</p>
                    </div>
                </div>
            </footer>
        `;
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Error handling
    handleError(error, context = 'Unknown') {
        console.error(`Error in ${context}:`, error);

        // Optional: Send to error tracking service
        // this.trackError(error, context);
    }

    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(`${name} took ${end - start} milliseconds`);
        return result;
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            // Observe elements with animation classes
            document.querySelectorAll('[data-animate]').forEach(el => {
                this.observer.observe(el);
            });
        }
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize app when DOM is ready
const app = new EBikeMDApp();
const animationObserver = new AnimationObserver();

// Export for global access
window.ebikeMDApp = app;

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible, refresh AOS if needed
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }
});

// Handle window resize
window.addEventListener('resize', app.debounce(() => {
    app.adjustBodyPadding();

    // Refresh AOS on resize
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}, 250));

// Service Worker registration (optional)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
