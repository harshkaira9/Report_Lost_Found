// ===================================
// ADMIN DASHBOARD FUNCTIONALITY
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    requireAuth();

    // Load admin info
    loadAdminInfo();

    // Initialize dashboard
    initDashboard();

    // Navigation
    setupNavigation();

    // Logout functionality
    setupLogout();

    // Mobile menu
    setupMobileMenu();
});

// Load Admin Information
function loadAdminInfo() {
    const adminEmail = localStorage.getItem('adminEmail') || sessionStorage.getItem('adminEmail');
    const emailElement = document.getElementById('adminEmail');
    
    if (emailElement && adminEmail) {
        emailElement.textContent = adminEmail;
    }
}

// Initialize Dashboard
function initDashboard() {
    // Load statistics
    loadStatistics();

    // Load recent activity
    loadRecentActivity();

    // Load pending items
    loadPendingItems();

    console.log('Dashboard initialized successfully');
}

// Setup Navigation
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked item
            this.classList.add('active');

            // Get target section
            const targetSection = this.dataset.section;

            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));

            // Show target section
            const activeSection = document.getElementById(`${targetSection}-section`);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Update page title
            const pageTitle = this.querySelector('span').textContent;
            document.getElementById('pageTitle').textContent = pageTitle;
        });
    });
}

// Setup Logout
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                logout();
            }
        });
    }
}

// Setup Mobile Menu
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('sidebar');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
}

// Load Statistics
function loadStatistics() {
    // In production, fetch from API
    const stats = {
        totalLost: 127,
        itemsReturned: 89,
        pendingApproval: 5,
        activeUsers: 342
    };

    // Update UI (already displayed in HTML)
    console.log('Statistics loaded:', stats);
}

// Load Recent Activity
function loadRecentActivity() {
    // Sample data - in production, fetch from API
    const activities = [
        {
            type: 'new-lost',
            title: 'New Lost Item Posted',
            description: 'iPhone 13 Pro - Main Campus',
            time: '2 minutes ago',
            icon: 'plus',
            color: 'blue'
        },
        {
            type: 'returned',
            title: 'Item Successfully Returned',
            description: 'Backpack - Library',
            time: '15 minutes ago',
            icon: 'check',
            color: 'green'
        },
        {
            type: 'new-user',
            title: 'New User Registered',
            description: 'john.doe@campus.com',
            time: '1 hour ago',
            icon: 'user-plus',
            color: 'orange'
        },
        {
            type: 'found',
            title: 'Found Item Posted',
            description: 'Wallet - Cafeteria',
            time: '3 hours ago',
            icon: 'search',
            color: 'purple'
        }
    ];

    console.log('Recent activity loaded:', activities);
}

// Load Pending Items
function loadPendingItems() {
    // Sample pending items - in production, fetch from API
    const pendingItems = [
        {
            id: 1,
            name: 'iPhone 13 Pro - Space Gray',
            category: 'Electronics',
            location: 'Main Campus, Building A',
            date: 'Jan 15, 2024',
            reporter: 'student@campus.com',
            description: 'Lost near the cafeteria. Has a black case with initials "JD".',
            image: 'https://via.placeholder.com/300x200?text=iPhone+13'
        }
    ];

    console.log('Pending items loaded:', pendingItems);
}

// Approve Item
function approveItem(itemId) {
    if (confirm('Are you sure you want to approve this item?')) {
        // In production, send API request
        console.log(`Item ${itemId} approved`);
        
        // Show success message
        showNotification('Item approved successfully!', 'success');
        
        // Reload data
        setTimeout(() => {
            loadPendingItems();
        }, 1000);
    }
}

// Reject Item
function rejectItem(itemId) {
    const reason = prompt('Please provide a reason for rejection:');
    
    if (reason) {
        // In production, send API request
        console.log(`Item ${itemId} rejected. Reason: ${reason}`);
        
        // Show success message
        showNotification('Item rejected successfully!', 'success');
        
        // Reload data
        setTimeout(() => {
            loadPendingItems();
        }, 1000);
    }
}

// View Details
function viewDetails(itemId) {
    // In production, fetch item details and show in modal
    alert(`Viewing details for item #${itemId}`);
}

// Show Notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: -300px;
        background: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: right 0.3s ease;
        z-index: 10000;
    }

    .notification.show {
        right: 20px;
    }

    .notification-success {
        border-left: 4px solid #10B981;
    }

    .notification-success i {
        color: #10B981;
    }

    .notification-error {
        border-left: 4px solid #EF4444;
    }

    .notification-error i {
        color: #EF4444;
    }
`;
document.head.appendChild(style);