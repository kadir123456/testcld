// Ezyago Frontend JavaScript

class EzyagoApp {
    constructor() {
        this.apiUrl = window.location.origin;
        this.token = localStorage.getItem('ezyago_token');
        this.user = null;
        this.currentPage = 'overview';
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.isOnline = navigator.onLine;
        this.lastScrollY = 0;
        this.navbarHidden = false;
        
        this.init();
    }

    async init() {
        // Setup error handling
        this.setupGlobalErrorHandling();
        
        // Setup network monitoring
        this.setupNetworkMonitoring();
        
        // Setup scroll behavior
        this.setupScrollBehavior();
        
        // Hide loading screen after a short delay
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
        }, 1000);

        // Check if user is logged in
        if (this.token) {
            await this.loadUserProfile();
            this.showDashboard();
        } else {
            this.showLandingPage();
        }

        this.setupEventListeners();
        this.setupFAQ();
        this.startDemoChart();
        
        // Setup mobile navigation
        this.setupMobileNavigation();
        
        // Setup touch gestures
        this.setupTouchGestures();
        
        // Setup keyboard navigation
        this.setupKeyboardNavigation();
    }

    setupGlobalErrorHandling() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.showNotification('Beklenmeyen bir hata oluştu. Sayfa yenileniyor...', 'error');
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            event.preventDefault();
            this.showNotification('Bağlantı hatası oluştu. Lütfen tekrar deneyin.', 'error');
        });
    }
    
    setupNetworkMonitoring() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.showNotification('İnternet bağlantısı yeniden kuruldu', 'success');
            this.reconnectAttempts = 0;
            
            // Reload dashboard data when back online
            if (this.token && this.currentPage === 'overview') {
                this.loadDashboardData();
            }
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.showNotification('İnternet bağlantısı kesildi', 'warning');
        });
    }
    
    setupScrollBehavior() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;
        
        // Hide navbar on scroll down, show on scroll up
        if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
            // Scrolling down
            if (!this.navbarHidden) {
                navbar.classList.add('hidden');
                this.navbarHidden = true;
            }
        } else {
            // Scrolling up
            if (this.navbarHidden) {
                navbar.classList.remove('hidden');
                this.navbarHidden = false;
            }
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    setupMobileNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu();
            });
            
            // Close menu when clicking overlay
            mobileOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
            
            // Close menu when clicking on links
            navMenu.querySelectorAll('.nav-link, .btn').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMobileMenu();
                }
            });
        }
        
        // Setup dashboard mobile navigation
        this.setupDashboardMobileNav();
    }
    
    toggleMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        
        navToggle?.classList.remove('active');
        navMenu?.classList.remove('active');
        mobileOverlay?.classList.remove('active');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    setupDashboardMobileNav() {
        // Create sidebar toggle button
        const sidebarToggle = document.createElement('button');
        sidebarToggle.className = 'sidebar-toggle';
        sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
        sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
        
        // Add to dashboard if it exists
        const dashboard = document.getElementById('dashboard');
        if (dashboard) {
            dashboard.appendChild(sidebarToggle);
            
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }
    }
    
    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const dashboardMain = document.querySelector('.dashboard-main');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        
        if (sidebar) {
            sidebar.classList.toggle('mobile-open');
            dashboardMain?.classList.toggle('sidebar-collapsed');
            mobileOverlay?.classList.toggle('active');
            
            // Prevent body scroll when sidebar is open on mobile
            if (window.innerWidth <= 1024) {
                document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
            }
        }
    }
    
    setupTouchGestures() {
        let startX = 0;
        let startY = 0;
        let isScrolling = false;
        
        // Swipe gestures for mobile navigation
        document.addEventListener('touchstart
        )
    }
}