// ===================================
// ADMIN AUTHENTICATION
// ===================================

// Admin Credentials (In production, this should be in a secure database)
const ADMIN_CREDENTIALS = {
    email: 'harsh.kaira24@',
    password: 'CEP_Project'
};

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('adminPassword');
    const alertMessage = document.getElementById('alertMessage');
    const loginBtn = document.getElementById('loginBtn');

    // Check if already logged in
    checkAuthStatus();

    // Toggle Password Visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Login Handler
    function handleLogin() {
        const email = document.getElementById('adminEmail').value.trim();
        const password = document.getElementById('adminPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Show loading state
        showLoading(true);

        // Simulate authentication delay (remove in production)
        setTimeout(() => {
            if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
                // Successful login
                showAlert('Login successful! Redirecting...', 'success');
                
                // Store auth token
                const authToken = generateAuthToken();
                if (rememberMe) {
                    localStorage.setItem('adminAuth', authToken);
                    localStorage.setItem('adminEmail', email);
                } else {
                    sessionStorage.setItem('adminAuth', authToken);
                    sessionStorage.setItem('adminEmail', email);
                }

                // Log activity
                logActivity('Admin login', email);

                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'admin-dashboard.html';
                }, 1000);

            } else {
                // Failed login
                showAlert('Invalid email or password. Please try again.', 'error');
                showLoading(false);
                
                // Log failed attempt
                logActivity('Failed login attempt', email);
            }
        }, 1500);
    }

    // Show Loading State
    function showLoading(isLoading) {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            loginBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoader.style.display = 'none';
            loginBtn.disabled = false;
        }
    }

    // Show Alert Message
    function showAlert(message, type) {
        alertMessage.textContent = message;
        alertMessage.className = `alert-message ${type}`;
        alertMessage.style.display = 'block';

        // Auto hide after 5 seconds
        setTimeout(() => {
            alertMessage.style.display = 'none';
        }, 5000);
    }

    // Generate Auth Token
    function generateAuthToken() {
        return 'admin_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Check Authentication Status
    function checkAuthStatus() {
        const token = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
        
        // If on login page and already authenticated
        if (token && window.location.pathname.includes('admin-login')) {
            window.location.href = 'admin-dashboard.html';
        }
    }

    // Log Activity
    function logActivity(action, email) {
        const activity = {
            action: action,
            email: email,
            timestamp: new Date().toISOString(),
            ip: 'N/A' // In production, get actual IP
        };

        // Get existing logs
        let logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
        logs.push(activity);

        // Keep only last 100 logs
        if (logs.length > 100) {
            logs = logs.slice(-100);
        }

        localStorage.setItem('adminLogs', JSON.stringify(logs));
        console.log('Activity logged:', activity);
    }

    // Security: Prevent brute force
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;

    function checkLoginAttempts() {
        if (loginAttempts >= MAX_ATTEMPTS) {
            showAlert('Too many failed attempts. Please try again in 15 minutes.', 'error');
            loginBtn.disabled = true;
            
            setTimeout(() => {
                loginAttempts = 0;
                loginBtn.disabled = false;
            }, 900000); // 15 minutes
            
            return false;
        }
        return true;
    }
});

// ===================================
// AUTHENTICATION GUARD
// ===================================

function requireAuth() {
    const token = localStorage.getItem('adminAuth') || sessionStorage.getItem('adminAuth');
    
    if (!token) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// ===================================
// LOGOUT FUNCTION
// ===================================

function logout() {
    // Clear auth data
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminAuth');
    sessionStorage.removeItem('adminEmail');

    // Log activity
    const email = localStorage.getItem('adminEmail') || 'Unknown';
    logActivity('Admin logout', email);

    // Redirect to login
    window.location.href = 'admin-login.html';
}

// Auto logout after 30 minutes of inactivity
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        alert('Session expired due to inactivity');
        logout();
    }, 1800000); // 30 minutes
}

// Track user activity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);