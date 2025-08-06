// ==========================================
// Navigation Manager
// ==========================================

class NavigationManager {
    constructor() {
        this.isDropdownOpen = false;
        this.isMobileMenuOpen = false;
        this.dropdown = null;
        this.mobileMenuToggle = null;
        this.mobileMenu = null;
        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupKeyboardNavigation();
    }

    cacheElements() {
        this.dropdown = document.getElementById('bikes-dropdown');
        this.mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        this.mobileMenu = document.getElementById('nav-menu');
        this.ebikesBtns = document.querySelectorAll('#ebikes-btn');
        this.bookCallBtns = document.querySelectorAll('#book-call-btn');
        this.navbar = document.querySelector('.navbar');
    }

    bindEvents() {
        // E-Bikes dropdown toggle
        this.ebikesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleBikesDropdown();
            });
        });

        // Book call buttons
        this.bookCallBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleBookCall();
            });
        });

        // Mobile menu toggle
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isDropdownOpen && !e.target.closest('.bikes-dropdown') && !e.target.closest('#ebikes-btn')) {
                this.closeBikesDropdown();
            }

            if (this.isMobileMenuOpen && !e.target.closest('.nav-menu') && !e.target.closest('.mobile-menu-toggle')) {
                this.closeMobileMenu();
            }
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.isDropdownOpen) {
                    this.closeBikesDropdown();
                }
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            if (window.innerWidth > 991 && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        }, 250));

        // Smooth scroll for anchor links
        this.bindSmoothScrollLinks();

        // Active page highlighting
        this.highlightCurrentPage();
    }

    toggleBikesDropdown() {
        if (this.isDropdownOpen) {
            this.closeBikesDropdown();
        } else {
            this.openBikesDropdown();
        }
    }

    openBikesDropdown() {
        if (!this.dropdown) return;

        this.isDropdownOpen = true;
        this.dropdown.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus management
        const firstBikeCard = this.dropdown.querySelector('.bike-card');
        if (firstBikeCard) {
            setTimeout(() => firstBikeCard.focus(), 300);
        }

        // Analytics
        this.trackEvent('navigation', 'bikes_dropdown_open');
    }

    closeBikesDropdown() {
        if (!this.dropdown) return;

        this.isDropdownOpen = false;
        this.dropdown.classList.remove('active');
        document.body.style.overflow = '';

        // Return focus to trigger
        const ebikeBtn = document.querySelector('#ebikes-btn');
        if (ebikeBtn) {
            ebikeBtn.focus();
        }
    }

    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        if (!this.mobileMenu || !this.mobileMenuToggle) return;

        this.isMobileMenuOpen = true;
        this.mobileMenu.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus first menu item
        const firstMenuItem = this.mobileMenu.querySelector('.nav-link');
        if (firstMenuItem) {
            setTimeout(() => firstMenuItem.focus(), 300);
        }

        this.trackEvent('navigation', 'mobile_menu_open');
    }

    closeMobileMenu() {
        if (!this.mobileMenu || !this.mobileMenuToggle) return;

        this.isMobileMenuOpen = false;
        this.mobileMenu.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';

        // Return focus to toggle button
        this.mobileMenuToggle.focus();
    }

    handleBookCall() {
        // Close any open menus first
        this.closeBikesDropdown();
        this.closeMobileMenu();

        // Open contact modal
        if (window.modalManager) {
            window.modalManager.openContactModal();
        } else {
            // Fallback behavior
            this.showContactInfo();
        }

        this.trackEvent('cta', 'book_call_clicked');
    }

    showContactInfo() {
        // Fallback contact information display
        const contactInfo = `
            📞 Phone: +373 XX XXX XXX
            📱 WhatsApp: +373 XX XXX XXX
            📧 Email: info@e-bike-md.com
            📍 Address: Chisinau, Moldova
        `;

        alert('Contact Us:\n' + contactInfo);
    }

    setupKeyboardNavigation() {
        // Handle keyboard navigation in dropdown
        if (this.dropdown) {
            this.dropdown.addEventListener('keydown', (e) => {
                if (!this.isDropdownOpen) return;

                const bikeCards = this.dropdown.querySelectorAll('.bike-card');
                const exploreAllBtn = this.dropdown.querySelector('.btn');
                const focusableElements = [...bikeCards, exploreAllBtn];
                const currentIndex = focusableElements.indexOf(document.activeElement);

                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (currentIndex + 1) % focusableElements.length;
                        focusableElements[nextIndex].focus();
                        break;

                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
                        focusableElements[prevIndex].focus();
                        break;

                    case 'Home':
                        e.preventDefault();
                        focusableElements[0].focus();
                        break;

                    case 'End':
                        e.preventDefault();
                        focusableElements[focusableElements.length - 1].focus();
                        break;

                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        document.activeElement.click();
                        break;
                }
            });
        }

        // Handle mobile menu keyboard navigation
        if (this.mobileMenu) {
            this.mobileMenu.addEventListener('keydown', (e) => {
                if (!this.isMobileMenuOpen) return;

                const menuItems = this.mobileMenu.querySelectorAll('.nav-link, .cta-button');
                const currentIndex = Array.from(menuItems).indexOf(document.activeElement);

                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        const nextIndex = (currentIndex + 1) % menuItems.length;
                        menuItems[nextIndex].focus();
                        break;

                    case 'ArrowUp':
                        e.preventDefault();
                        const prevIndex = currentIndex <= 0 ? menuItems.length - 1 : currentIndex - 1;
                        menuItems[prevIndex].focus();
                        break;

                    case 'Home':
                        e.preventDefault();
                        menuItems[0].focus();
                        break;

                    case 'End':
                        e.preventDefault();
                        menuItems[menuItems.length - 1].focus();
                        break;
                }
            });
        }
    }

    bindSmoothScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#' || targetId === '#!') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();

                    // Close mobile menu if open
                    if (this.isMobileMenuOpen) {
                        this.closeMobileMenu();
                    }

                    // Scroll to target with offset for fixed navbar
                    const navbarHeight = this.navbar ? this.navbar.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Update URL hash without jumping
                    setTimeout(() => {
                        history.pushState(null, null, targetId);
                    }, 1000);
                }
            });
        });
    }

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath ||
                (currentPath.includes('bike-') && link.href.includes('bikes'))) {
                link.classList.add('active');
            }
        });
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

    trackEvent(category, action, label = null) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }

        // Alternative analytics
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'custom_event',
                category: category,
                action: action,
                label: label
            });
        }

        console.log(`Event tracked: ${category} - ${action}${label ? ` - ${label}` : ''}`);
    }

    // Breadcrumb navigation
    updateBreadcrumbs() {
        const breadcrumbContainer = document.querySelector('.breadcrumb');
        if (!breadcrumbContainer) return;

        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);

        let breadcrumbHTML = '<a href="/index.html">Home</a>';

        segments.forEach((segment, index) => {
            const isLast = index === segments.length - 1;
            const segmentName = this.formatSegmentName(segment);

            if (isLast) {
                breadcrumbHTML += ` <span class="separator">></span> <span class="current">${segmentName}</span>`;
            } else {
                const segmentPath = segments.slice(0, index + 1).join('/');
                breadcrumbHTML += ` <span class="separator">></span> <a href="${segmentPath}">${segmentName}</a>`;
            }
        });

        breadcrumbContainer.innerHTML = breadcrumbHTML;
    }

    formatSegmentName(segment) {
        return segment
            .replace(/\.html$/, '')
            .replace(/bike-/, '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    // Search functionality (if implemented)
    initSearch() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const searchResults = document.getElementById('search-results');

        if (!searchInput || !searchButton) return;

        let searchTimeout;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const query = e.target.value.trim();

            if (query.length < 2) {
                this.hideSearchResults();
                return;
            }

            searchTimeout = setTimeout(() => {
                this.performSearch(query);
            }, 300);
        });

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                this.performSearch(query);
            }
        });

        // Handle search keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+K or Cmd+K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    performSearch(query) {
        // This would typically call an API or search through indexed content
        const mockResults = [
            { title: 'Classic Cruiser', url: './bike-classic.html', type: 'bike' },
            { title: 'Trekking Alpha', url: './bike-trekking.html', type: 'bike' },
            { title: 'Mountain Delta', url: './bike-mountain.html', type: 'bike' },
            { title: 'Accessories', url: './accessories.html', type: 'page' },
            { title: 'About Us', url: './about.html', type: 'page' }
        ];

        const filteredResults = mockResults.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchResults(filteredResults, query);
        this.trackEvent('search', 'query', query);
    }

    displaySearchResults(results, query) {
        const searchResults = document.getElementById('search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>No results found for "${query}"</p>
                    <p>Try searching for "bike", "classic", "mountain", or "accessories"</p>
                </div>
            `;
        } else {
            const resultsHTML = results.map(result => `
                <a href="${result.url}" class="search-result-item">
                    <div class="result-title">${this.highlightSearchTerm(result.title, query)}</div>
                    <div class="result-type">${result.type}</div>
                </a>
            `).join('');

            searchResults.innerHTML = resultsHTML;
        }

        this.showSearchResults();
    }

    highlightSearchTerm(text, term) {
        const regex = new RegExp(`(${term})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    showSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.classList.add('visible');
        }
    }

    hideSearchResults() {
        const searchResults = document.getElementById('search-results');
        if (searchResults) {
            searchResults.classList.remove('visible');
        }
    }

    // Notification system for navigation feedback
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    // Cleanup method
    destroy() {
        // Remove event listeners and clean up
        this.closeBikesDropdown();
        this.closeMobileMenu();

        // Reset body overflow
        document.body.style.overflow = '';
    }
}

// Initialize navigation manager
const navigationManager = new NavigationManager();

// Export for global access
window.navigationManager = navigationManager;

// Handle page unload
window.addEventListener('beforeunload', () => {
    navigationManager.destroy();
});