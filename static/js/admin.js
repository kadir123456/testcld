@@ .. @@
 // Ezyago Admin Panel JavaScript
 class EzyagoAdmin {
     constructor() {
         this.apiUrl = window.location.origin;
         this.token = localStorage.getItem('ezyago_admin_token');
         this.currentPage = 'dashboard';
         this.confirmationCallback = null;
+        this.isLoading = false;
+        this.retryCount = 0;
+        this.maxRetries = 3;
         
         this.init();
     }

     async init() {
+        // Setup error handling
+        this.setupErrorHandling();
+        
         // Hide loading screen
         setTimeout(() => {
             document.getElementById('loading-screen').style.display = 'none';
         }, 1000);

         // Check if admin is logged in
         if (this.token) {
             await this.verifyAdminToken();
         } else {
             this.showLogin();
         }

         this.setupEventListeners();
     }

+    setupErrorHandling() {
+        window.addEventListener('error', (event) => {
+            console.error('Admin panel error:', event.error);
+            this.showNotification('Sistem hatası oluştu', 'error');
+        });
+        
+        window.addEventListener('unhandledrejection', (event) => {
+            console.error('Unhandled promise rejection in admin:', event.reason);
+            event.preventDefault();
+        });
+    }

     setupEventListeners() {
         // Navigation
         document.querySelectorAll('.nav-item').forEach(item => {
             item.addEventListener('click', (e) => {
                 e.preventDefault();
                 const page = item.dataset.page;
                 this.navigateToPage(page);
             });
         });

         // Admin login form
         document.getElementById('admin-login-form')?.addEventListener('submit', (e) => {
             e.preventDefault();
             this.handleAdminLogin();
         });

         // User search
         document.getElementById('user-search')?.addEventListener('input', (e) => {
             this.filterUsers(e.target.value);
         });

         // Auto-refresh data
         if (this.token) {
             setInterval(() => {
                 if (this.currentPage === 'dashboard') {
                     this.loadDashboardStats();
                 }
             }, 120000); // Refresh every 2 minutes
         }
+        
+        // Mobile navigation for admin
+        this.setupMobileNavigation();
+    }
+    
+    setupMobileNavigation() {
+        // Handle mobile sidebar navigation
+        const sidebarItems = document.querySelectorAll('.sidebar .nav-item');
+        sidebarItems.forEach(item => {
+            item.addEventListener('click', () => {
+                // Close mobile menu after selection
+                if (window.innerWidth <= 768) {
+                    document.querySelector('.sidebar').classList.remove('mobile-open');
+                }
+            });
+        });
     }

     // Authentication Methods
     async handleAdminLogin() {
+        if (this.isLoading) return;
+        
         const email = document.getElementById('admin-email').value;
         const password = document.getElementById('admin-password').value;
         const errorEl = document.getElementById('login-error');

+        if (!email || !password) {
+            errorEl.textContent = 'E-posta ve şifre gereklidir';
+            return;
+        }
+        
+        this.isLoading = true;
+        const submitBtn = document.querySelector('#admin-login-form button[type="submit"]');
+        const originalText = submitBtn.innerHTML;
+        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Giriş yapılıyor...';
+        submitBtn.disabled = true;

         try {
             const response = await this.apiCall('/api/auth/login', 'POST', {
                 email,
                 password
             });

             if (response.access_token && response.user.role === 'admin') {
                 this.token = response.access_token;
                 localStorage.setItem('ezyago_admin_token', this.token);
                 
                 this.showDashboard();
                 this.showNotification('Admin girişi başarılı!', 'success');
+                errorEl.textContent = '';
             } else {
                 errorEl.textContent = 'Admin yetkisi bulunamadı.';
             }
         } catch (error) {
+            console.error('Admin login error:', error);
+            errorEl.textContent = this.getErrorMessage(error);
+        } finally {
+            this.isLoading = false;
+            submitBtn.innerHTML = originalText;
+            submitBtn.disabled = false;
         }
     }

+    getErrorMessage(error) {
+        if (typeof error === 'string') return error;
+        if (error.message) return error.message;
+        if (error.detail) return error.detail;
+        return 'Bilinmeyen bir hata oluştu';
+    }

     async verifyAdminToken() {
         try {
             const response = await this.apiCall('/api/user/profile', 'GET');
             if (response.role === 'admin') {
                 this.showDashboard();
             } else {
                 this.adminLogout();
             }
         } catch (error) {
+            console.error('Token verification failed:', error);
             this.adminLogout();
         }
     }
}