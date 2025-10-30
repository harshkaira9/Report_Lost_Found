
        let lostItems = [];
        let foundItems = [];
        let currentLostPage = 1;
        let currentFoundPage = 1;
        const itemsPerPage = 6;
        let currentUser = null;
        let isLoggedIn = false;

        const sampleLostItems = [
            {
                id: 1,
                name: "iPhone 13 Pro",
                category: "electronics",
                location: "library",
                date: "2024-01-15",
                description: "Black iPhone 13 Pro with a blue case. Lost in the main library on the second floor near the computer section.",
                status: "lost",
                contactName: "John Doe",
                contactEmail: "john@campus.edu",
                contactPhone: "+1 234 567 8900",
                image: null
            },
            {
                id: 2,
                name: "Student ID Card",
                category: "documents",
                location: "cafeteria",
                date: "2024-01-16",
                description: "Student ID card belonging to Jane Smith. Lost in the campus cafeteria during lunch hour.",
                status: "lost",
                contactName: "Jane Smith",
                contactEmail: "jane@campus.edu",
                contactPhone: "+1 234 567 8901",
                image: null
            },
            {
                id: 3,
                name: "Black Backpack",
                category: "accessories",
                location: "classroom",
                date: "2024-01-14",
                description: "Black Nike backpack with laptop compartment. Contains textbooks and notebook. Lost in Room 205.",
                status: "lost",
                contactName: "Mike Johnson",
                contactEmail: "mike@campus.edu",
                contactPhone: "+1 234 567 8902",
                image: null
            },
            {
                id: 4,
                name: "Car Keys",
                category: "keys",
                location: "parking",
                date: "2024-01-17",
                description: "Toyota car keys with a blue keychain. Lost in the north parking lot.",
                status: "lost",
                contactName: "Sarah Williams",
                contactEmail: "sarah@campus.edu",
                contactPhone: "+1 234 567 8903",
                image: null
            },
            {
                id: 5,
                name: "Calculus Textbook",
                category: "books",
                location: "lab",
                date: "2024-01-13",
                description: "Calculus 2 textbook with notes inside. Has my name written on the first page.",
                status: "lost",
                contactName: "David Brown",
                contactEmail: "david@campus.edu",
                contactPhone: "+1 234 567 8904",
                image: null
            },
            {
                id: 6,
                name: "AirPods Pro",
                category: "electronics",
                location: "sports",
                date: "2024-01-16",
                description: "White AirPods Pro in charging case. Lost in the gym locker room.",
                status: "lost",
                contactName: "Emma Davis",
                contactEmail: "emma@campus.edu",
                contactPhone: "+1 234 567 8905",
                image: null
            }
        ];

        const sampleFoundItems = [
            {
                id: 101,
                name: "Blue Water Bottle",
                category: "other",
                location: "library",
                date: "2024-01-17",
                description: "Blue metal water bottle with stickers. Found on a study desk in the library.",
                status: "found",
                currentLocation: "Library Lost & Found Desk",
                contactName: "Library Staff",
                contactEmail: "library@campus.edu",
                contactPhone: "+1 234 567 9000",
                image: null
            },
            {
                id: 102,
                name: "Gray Hoodie",
                category: "clothing",
                location: "auditorium",
                date: "2024-01-16",
                description: "Gray hoodie with university logo. Size medium. Found in the main auditorium after the seminar.",
                status: "found",
                currentLocation: "Security Office",
                contactName: "Security Team",
                contactEmail: "security@campus.edu",
                contactPhone: "+1 234 567 9001",
                image: null
            },
            {
                id: 103,
                name: "Wireless Mouse",
                category: "electronics",
                location: "classroom",
                date: "2024-01-15",
                description: "Black Logitech wireless mouse. Found in Classroom 301.",
                status: "found",
                currentLocation: "Room 301",
                contactName: "Prof. Anderson",
                contactEmail: "anderson@campus.edu",
                contactPhone: "+1 234 567 9002",
                image: null
            },
            {
                id: 104,
                name: "Prescription Glasses",
                category: "accessories",
                location: "cafeteria",
                date: "2024-01-17",
                description: "Black frame prescription glasses in a brown case. Found on table near the entrance.",
                status: "found",
                currentLocation: "Cafeteria Manager's Office",
                contactName: "Cafeteria Staff",
                contactEmail: "cafeteria@campus.edu",
                contactPhone: "+1 234 567 9003",
                image: null
            },
            {
                id: 105,
                name: "USB Flash Drive",
                category: "electronics",
                location: "lab",
                date: "2024-01-14",
                description: "32GB SanDisk USB flash drive with red casing. Found in Computer Lab 2.",
                status: "found",
                currentLocation: "Lab Supervisor's Desk",
                contactName: "Lab Supervisor",
                contactEmail: "lab@campus.edu",
                contactPhone: "+1 234 567 9004",
                image: null
            },
            {
                id: 106,
                name: "Umbrella",
                category: "other",
                location: "hostel",
                date: "2024-01-16",
                description: "Large black umbrella with wooden handle. Found in the hostel common room.",
                status: "found",
                currentLocation: "Hostel Reception",
                contactName: "Hostel Warden",
                contactEmail: "hostel@campus.edu",
                contactPhone: "+1 234 567 9005",
                image: null
            }
        ];

        // Initialize with sample data
        lostItems = [...sampleLostItems];
        foundItems = [...sampleFoundItems];

        // ===================================
        // DOM Elements
        // ===================================
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        const lostItemForm = document.getElementById('lost-item-form');
        const foundItemForm = document.getElementById('found-item-form');
        const contactForm = document.getElementById('contact-form');
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const locationFilter = document.getElementById('location-filter');
        const dateFilter = document.getElementById('date-filter');
        const modal = document.getElementById('item-modal');
        const modalClose = document.querySelectorAll('.modal-close');
        const toast = document.getElementById('toast');
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        const authModal = document.getElementById('auth-modal');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        // ===================================
        // Event Listeners
        // ===================================
        document.addEventListener('DOMContentLoaded', () => {
            initializeApp();
            setupEventListeners();
            checkAuthStatus();
            updateNavigation();
        });

        // ===================================
        // Initialize Application
        // ===================================
        function initializeApp() {
            renderLostItems();
            renderFoundItems();
            updateStats();
            setMaxDate();
            loadFromLocalStorage();
        }

        // ===================================
        // Authentication Functions
        // ===================================
        function checkAuthStatus() {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                currentUser = JSON.parse(savedUser);
                isLoggedIn = true;
                updateNavigation();
            }
        }

        function updateNavigation() {
            const navMenu = document.querySelector('.nav-menu');
            const existingAuthItem = document.querySelector('.auth-nav-item');

            if (existingAuthItem) {
                existingAuthItem.remove();
            }

            const authNavItem = document.createElement('li');
            authNavItem.className = 'nav-item auth-nav-item';

            if (isLoggedIn) {
                authNavItem.innerHTML = `
                    <a href="#" class="nav-link" onclick="logout(event)">
                        <i class="fas fa-sign-out-alt"></i> Logout (${currentUser.name})
                    </a>
                `;
            } else {
                authNavItem.innerHTML = `
                    <a href="#" class="nav-link" onclick="openAuthModal(event)">
                        <i class="fas fa-user"></i> Login
                    </a>
                `;
            }

            navMenu.appendChild(authNavItem);
        }

        function openAuthModal(event) {
            if (event) event.preventDefault();
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeAuthModal() {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function switchAuthTab(tab) {
            const loginTab = document.getElementById('login-tab');
            const registerTab = document.getElementById('register-tab');
            const authTabs = document.querySelectorAll('#auth-modal .tab-btn');

            authTabs.forEach(btn => {
                if (btn.getAttribute('data-tab') === tab) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            if (tab === 'login') {
                loginTab.classList.add('active');
                registerTab.classList.remove('active');
            } else {
                registerTab.classList.add('active');
                loginTab.classList.remove('active');
            }
        }

        function login(email, password) {
            // Simulate login - In production, this would call an API
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                currentUser = {
                    name: user.name,
                    email: user.email,
                    studentId: user.studentId
                };
                isLoggedIn = true;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                updateNavigation();
                closeAuthModal();
                showToast('Login successful! Welcome back, ' + user.name, 'success');
                return true;
            } else {
                showToast('Invalid email or password', 'error');
                return false;
            }
        }

        function register(name, email, studentId, password) {
            // Simulate registration - In production, this would call an API
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            // Check if user already exists
            if (users.find(u => u.email === email)) {
                showToast('User with this email already exists', 'error');
                return false;
            }

            const newUser = {
                name,
                email,
                studentId,
                password, // In production, this should be hashed
                registeredAt: new Date().toISOString()
            };

            users.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            // Auto-login after registration
            currentUser = { name, email, studentId };
            isLoggedIn = true;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            updateNavigation();
            closeAuthModal();
            showToast('Registration successful! Welcome, ' + name, 'success');
            return true;
        }

        function logout(event) {
            if (event) event.preventDefault();

            if (confirm('Are you sure you want to logout?')) {
                currentUser = null;
                isLoggedIn = false;
                localStorage.removeItem('currentUser');
                updateNavigation();
                showToast('You have been logged out successfully', 'success');

                // Redirect to home
                setTimeout(() => {
                    scrollToSection('home');
                }, 1000);
            }
        }

        // ===================================
        // Setup Event Listeners
        // ===================================
        function setupEventListeners() {
            // Mobile menu toggle
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');

                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                });
            });

            // Tab switching
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const tab = button.getAttribute('data-tab');
                    if (tab) {
                        switchTab(tab);
                    }
                });
            });

            // Form submissions
            lostItemForm.addEventListener('submit', handleLostItemSubmit);
            foundItemForm.addEventListener('submit', handleFoundItemSubmit);
            contactForm.addEventListener('submit', handleContactSubmit);
            loginForm.addEventListener('submit', handleLoginSubmit);
            registerForm.addEventListener('submit', handleRegisterSubmit);

            // Search and filters
            searchInput.addEventListener('input', applyFilters);
            categoryFilter.addEventListener('change', applyFilters);
            locationFilter.addEventListener('change', applyFilters);
            dateFilter.addEventListener('change', applyFilters);

            // Modal close
            modalClose.forEach(close => {
                close.addEventListener('click', () => {
                    closeModal();
                    closeAuthModal();
                });
            });

            window.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
                if (e.target === authModal) {
                    closeAuthModal();
                }
            });

            // Image upload preview
            setupImagePreview('lost-image', 'lost-image-preview');
            setupImagePreview('found-image', 'found-image-preview');

            // Scroll to top button
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('show');
                } else {
                    scrollToTopBtn.classList.remove('show');
                }
            });

            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // Load more buttons
            document.getElementById('load-more-lost').addEventListener('click', () => {
                currentLostPage++;
                renderLostItems();
            });

            document.getElementById('load-more-found').addEventListener('click', () => {
                currentFoundPage++;
                renderFoundItems();
            });

            // Newsletter form
            document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
                e.preventDefault();
                showToast('Thank you for subscribing!', 'success');
                e.target.reset();
            });
        }

        // ===================================
        // Authentication Form Handlers
        // ===================================
        function handleLoginSubmit(e) {
            e.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            login(email, password);
        }

        function handleRegisterSubmit(e) {
            e.preventDefault();

            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const studentId = document.getElementById('register-student-id').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;

            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }

            if (password.length < 6) {
                showToast('Password must be at least 6 characters', 'error');
                return;
            }

            register(name, email, studentId, password);
        }

        // ===================================
        // Render Functions
        // ===================================
        function renderLostItems() {
            const grid = document.getElementById('lost-items-grid');
            const filteredItems = getFilteredItems(lostItems);
            const startIndex = 0;
            const endIndex = currentLostPage * itemsPerPage;
            const itemsToShow = filteredItems.slice(startIndex, endIndex);

            if (currentLostPage === 1) {
                grid.innerHTML = '';
            }

            if (itemsToShow.length === 0 && currentLostPage === 1) {
                grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--gray-500);">No lost items found matching your criteria.</p>';
                return;
            }

            itemsToShow.forEach((item, index) => {
                if (index >= (currentLostPage - 1) * itemsPerPage) {
                    grid.appendChild(createItemCard(item));
                }
            });

            // Show/hide load more button
            const loadMoreBtn = document.getElementById('load-more-lost');
            if (endIndex >= filteredItems.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }

        function renderFoundItems() {
            const grid = document.getElementById('found-items-grid');
            const filteredItems = getFilteredItems(foundItems);
            const startIndex = 0;
            const endIndex = currentFoundPage * itemsPerPage;
            const itemsToShow = filteredItems.slice(startIndex, endIndex);

            if (currentFoundPage === 1) {
                grid.innerHTML = '';
            }

            if (itemsToShow.length === 0 && currentFoundPage === 1) {
                grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--gray-500);">No found items matching your criteria.</p>';
                return;
            }

            itemsToShow.forEach((item, index) => {
                if (index >= (currentFoundPage - 1) * itemsPerPage) {
                    grid.appendChild(createItemCard(item));
                }
            });

            // Show/hide load more button
            const loadMoreBtn = document.getElementById('load-more-found');
            if (endIndex >= filteredItems.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-block';
            }
        }

        function createItemCard(item) {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.onclick = () => openItemModal(item);

            const iconMap = {
                electronics: 'fa-laptop',
                documents: 'fa-file-alt',
                accessories: 'fa-glasses',
                clothing: 'fa-tshirt',
                books: 'fa-book',
                keys: 'fa-key',
                sports: 'fa-football-ball',
                other: 'fa-box'
            };

            const statusClass = item.status === 'lost' ? 'status-lost' : 'status-found';
            const statusText = item.status === 'lost' ? 'Lost' : 'Found';

            card.innerHTML = `
                <div class="item-image">
                    ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<i class="fas ${iconMap[item.category]}"></i>`}
                </div>
                <div class="item-content">
                    <div class="item-header">
                        <div>
                            <h3 class="item-title">${item.name}</h3>
                            <span class="item-category">${formatCategory(item.category)}</span>
                        </div>
                        <span class="item-status ${statusClass}">${statusText}</span>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <div class="item-meta">
                        <div class="item-meta-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${formatLocation(item.location)}</span>
                        </div>
                        <div class="item-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${formatDate(item.date)}</span>
                        </div>
                        ${item.currentLocation ? `
                        <div class="item-meta-item">
                            <i class="fas fa-box"></i>
                            <span>${item.currentLocation}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="item-footer">
                        <span class="item-date">${getTimeAgo(item.date)}</span>
                        <button class="item-action">View Details</button>
                    </div>
                </div>
            `;

            return card;
        }

        // ===================================
        // Modal Functions
        // ===================================
        function openItemModal(item) {
            const modalBody = document.getElementById('modal-body');

            const iconMap = {
                electronics: 'fa-laptop',
                documents: 'fa-file-alt',
                accessories: 'fa-glasses',
                clothing: 'fa-tshirt',
                books: 'fa-book',
                keys: 'fa-key',
                sports: 'fa-football-ball',
                other: 'fa-box'
            };

            const statusClass = item.status === 'lost' ? 'status-lost' : 'status-found';
            const statusText = item.status === 'lost' ? 'Lost Item' : 'Found Item';

            modalBody.innerHTML = `
                ${item.image ? `<img src="${item.image}" alt="${item.name}" class="modal-image">` : `
                <div class="item-image modal-image">
                    <i class="fas ${iconMap[item.category]}"></i>
                </div>
                `}
                <div class="modal-header">
                    <h2 class="modal-title">${item.name}</h2>
                    <span class="item-status ${statusClass}">${statusText}</span>
                </div>
                <div class="modal-details">
                    <div class="detail-item">
                        <i class="fas fa-tag"></i>
                        <span class="detail-label">Category:</span>
                        <span class="detail-value">${formatCategory(item.category)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span class="detail-label">${item.status === 'lost' ? 'Last Seen:' : 'Found At:'}</span>
                        <span class="detail-value">${formatLocation(item.location)}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-calendar"></i>
                        <span class="detail-label">Date:</span>
                        <span class="detail-value">${formatDate(item.date)}</span>
                    </div>
                    ${item.currentLocation ? `
                    <div class="detail-item">
                        <i class="fas fa-box"></i>
                        <span class="detail-label">Current Location:</span>
                        <span class="detail-value">${item.currentLocation}</span>
                    </div>
                    ` : ''}
                    <div class="detail-item">
                        <i class="fas fa-align-left"></i>
                        <span class="detail-label">Description:</span>
                        <span class="detail-value">${item.description}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user"></i>
                        <span class="detail-label">Contact Person:</span>
                        <span class="detail-value">${item.contactName}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-envelope"></i>
                        <span class="detail-label">Email:</span>
                        <span class="detail-value"><a href="mailto:${item.contactEmail}">${item.contactEmail}</a></span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-phone"></i>
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value"><a href="tel:${item.contactPhone}">${item.contactPhone}</a></span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="contactOwner('${item.contactEmail}')">
                        <i class="fas fa-envelope"></i> Contact ${item.status === 'lost' ? 'Owner' : 'Finder'}
                    </button>
                    <button class="btn btn-secondary" onclick="window.open('tel:${item.contactPhone}')">
                        <i class="fas fa-phone"></i> Call Now
                    </button>
                </div>
            `;

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function contactOwner(email) {
            window.location.href = `mailto:${email}`;
        }

        // ===================================
        // Form Handlers
        // ===================================
        function handleLostItemSubmit(e) {
            e.preventDefault();

            if (!isLoggedIn) {
                showToast('Please login to report an item', 'warning');
                openAuthModal();
                return;
            }

            const formData = {
                id: Date.now(),
                name: document.getElementById('lost-item-name').value,
                category: document.getElementById('lost-category').value,
                location: document.getElementById('lost-location').value,
                date: document.getElementById('lost-date').value,
                description: document.getElementById('lost-description').value,
                status: 'lost',
                contactName: document.getElementById('lost-contact-name').value,
                contactEmail: document.getElementById('lost-contact-email').value,
                contactPhone: document.getElementById('lost-contact-phone').value,
                studentId: document.getElementById('lost-student-id').value,
                userId: currentUser.email,
                image: null
            };

            // Handle image if uploaded
            const imageInput = document.getElementById('lost-image');
            if (imageInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    formData.image = e.target.result;
                    saveLostItem(formData);
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                saveLostItem(formData);
            }
        }

        function saveLostItem(formData) {
            lostItems.unshift(formData);
            currentLostPage = 1;
            renderLostItems();
            updateStats();
            saveToLocalStorage();

            showToast('Lost item reported successfully! We will notify you if a match is found.', 'success');
            lostItemForm.reset();
            document.getElementById('lost-image-preview').innerHTML = '';

            // Scroll to lost items section
            setTimeout(() => {
                scrollToSection('lost-items');
            }, 1000);
        }

        function handleFoundItemSubmit(e) {
            e.preventDefault();

            if (!isLoggedIn) {
                showToast('Please login to report an item', 'warning');
                openAuthModal();
                return;
            }

            const formData = {
                id: Date.now(),
                name: document.getElementById('found-item-name').value,
                category: document.getElementById('found-category').value,
                location: document.getElementById('found-location').value,
                date: document.getElementById('found-date').value,
                description: document.getElementById('found-description').value,
                currentLocation: document.getElementById('found-current-location').value,
                status: 'found',
                contactName: document.getElementById('found-contact-name').value,
                contactEmail: document.getElementById('found-contact-email').value,
                contactPhone: document.getElementById('found-contact-phone').value,
                studentId: document.getElementById('found-student-id').value,
                userId: currentUser.email,
                image: null
            };

            // Handle image if uploaded
            const imageInput = document.getElementById('found-image');
            if (imageInput.files.length > 0) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    formData.image = e.target.result;
                    saveFoundItem(formData);
                };
                reader.readAsDataURL(imageInput.files[0]);
            } else {
                saveFoundItem(formData);
            }
        }

        function saveFoundItem(formData) {
            foundItems.unshift(formData);
            currentFoundPage = 1;
            renderFoundItems();
            updateStats();
            saveToLocalStorage();

            showToast('Found item reported successfully! The owner can now contact you.', 'success');
            foundItemForm.reset();
            document.getElementById('found-image-preview').innerHTML = '';

            // Scroll to found items section
            setTimeout(() => {
                scrollToSection('found-items');
            }, 1000);
        }

        function handleContactSubmit(e) {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;

            console.log('Contact Form Submitted:', { name, email, subject, message });

            showToast('Message sent successfully! We will get back to you soon.', 'success');
            contactForm.reset();
        }

        // ===================================
        // Filter Functions
        // ===================================
        function applyFilters() {
            currentLostPage = 1;
            currentFoundPage = 1;
            renderLostItems();
            renderFoundItems();
        }

        function getFilteredItems(items) {
            const search = searchInput.value.toLowerCase();
            Term = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const location = locationFilter.value;
            const dateRange = dateFilter.value;

            return items.filter(item => {
                // Search filter
                const matchesSearch = !searchTerm ||
                    item.name.toLowerCase().includes(searchTerm) ||
                    item.description.toLowerCase().includes(searchTerm) ||
                    item.location.toLowerCase().includes(searchTerm);

                // Category filter
                const matchesCategory = category === 'all' || item.category === category;

                // Location filter
                const matchesLocation = location === 'all' || item.location === location;

                // Date filter
                const matchesDate = filterByDate(item.date, dateRange);

                return matchesSearch && matchesCategory && matchesLocation && matchesDate;
            });
        }

        function filterByDate(itemDate, range) {
            if (range === 'all') return true;

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const itemDateObj = new Date(itemDate);
            itemDateObj.setHours(0, 0, 0, 0);

            const diffTime = today - itemDateObj;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            switch (range) {
                case 'today':
                    return diffDays === 0;
                case 'week':
                    return diffDays <= 7;
                case 'month':
                    return diffDays <= 30;
                default:
                    return true;
            }
        }

        // ===================================
        // Tab Switching
        // ===================================
        function switchTab(tabName) {
            const buttons = document.querySelectorAll('.report-section .tab-btn');
            const contents = document.querySelectorAll('.report-section .tab-content');

            buttons.forEach(btn => {
                if (btn.getAttribute('data-tab') === tabName) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            contents.forEach(content => {
                if (content.id === `${tabName}-form-content`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        }

        // ===================================
        // Image Preview
        // ===================================
        function setupImagePreview(inputId, previewId) {
            const input = document.getElementById(inputId);
            const preview = document.getElementById(previewId);

            input.addEventListener('change', function (e) {
                preview.innerHTML = '';
                const files = Array.from(e.target.files);

                files.forEach((file, index) => {
                    if (file.type.startsWith('image/')) {
                        const reader = new FileReader();

                        reader.onload = function (event) {
                            const previewDiv = document.createElement('div');
                            previewDiv.className = 'preview-image';
                            previewDiv.innerHTML = `
                                <img src="${event.target.result}" alt="Preview">
                                <button type="button" class="preview-remove" onclick="removePreviewImage(this, '${inputId}', ${index})">
                                    <i class="fas fa-times"></i>
                                </button>
                            `;
                            preview.appendChild(previewDiv);
                        };

                        reader.readAsDataURL(file);
                    }
                });
            });
        }

        function removePreviewImage(button, inputId, index) {
            const input = document.getElementById(inputId);
            const dt = new DataTransfer();
            const files = input.files;

            for (let i = 0; i < files.length; i++) {
                if (i !== index) {
                    dt.items.add(files[i]);
                }
            }

            input.files = dt.files;
            button.parentElement.remove();
        }

        // ===================================
        // Utility Functions
        // ===================================
        function updateStats() {
            document.getElementById('total-items').textContent = lostItems.length + foundItems.length;
            document.getElementById('returned-items').textContent = 189;
            document.getElementById('pending-items').textContent = lostItems.length;
        }

        function formatCategory(category) {
            const categories = {
                electronics: 'Electronics',
                documents: 'Documents',
                accessories: 'Accessories',
                clothing: 'Clothing',
                books: 'Books & Stationery',
                keys: 'Keys & Cards',
                sports: 'Sports Equipment',
                other: 'Other'
            };
            return categories[category] || category;
        }

        function formatLocation(location) {
            const locations = {
                library: 'Library',
                cafeteria: 'Cafeteria',
                hostel: 'Hostel',
                classroom: 'Classroom',
                lab: 'Laboratory',
                sports: 'Sports Complex',
                parking: 'Parking Area',
                auditorium: 'Auditorium'
            };
            return locations[location] || location;
        }

        function formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('en-US', options);
        }

        function getTimeAgo(dateString) {
            const now = new Date();
            const past = new Date(dateString);
            const diffTime = Math.abs(now - past);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
                if (diffHours === 0) {
                    const diffMinutes = Math.floor(diffTime / (1000 * 60));
                    return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
                }
                return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            } else if (diffDays === 1) {
                return 'Yesterday';
            } else if (diffDays < 7) {
                return `${diffDays} days ago`;
            } else if (diffDays < 30) {
                const weeks = Math.floor(diffDays / 7);
                return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
            } else {
                const months = Math.floor(diffDays / 30);
                return `${months} month${months !== 1 ? 's' : ''} ago`;
            }
        }

        function setMaxDate() {
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('lost-date').setAttribute('max', today);
            document.getElementById('found-date').setAttribute('max', today);
        }

        function showToast(message, type = 'success') {
            const toastElement = document.getElementById('toast');
            const toastMessage = document.getElementById('toast-message');

            toastMessage.textContent = message;
            toastElement.className = `toast ${type}`;
            toastElement.classList.add('show');

            setTimeout(() => {
                toastElement.classList.remove('show');
            }, 4000);
        }

        function scrollToSection(sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // ===================================
        // Local Storage Functions
        // ===================================
        function saveToLocalStorage() {
            localStorage.setItem('lostItems', JSON.stringify(lostItems));
            localStorage.setItem('foundItems', JSON.stringify(foundItems));
        }

        function loadFromLocalStorage() {
            const savedLostItems = localStorage.getItem('lostItems');
            const savedFoundItems = localStorage.getItem('foundItems');

            if (savedLostItems) {
                const parsed = JSON.parse(savedLostItems);
                lostItems = parsed.length > 0 ? parsed : [...sampleLostItems];
            }

            if (savedFoundItems) {
                const parsed = JSON.parse(savedFoundItems);
                foundItems = parsed.length > 0 ? parsed : [...sampleFoundItems];
            }
        }

        // ===================================
        // Auto-save to localStorage on changes
        // ===================================
        window.addEventListener('beforeunload', () => {
            saveToLocalStorage();
        });

        // ===================================
        // Export Functions for Global Access
        // ===================================
        window.scrollToSection = scrollToSection;
        window.openAuthModal = openAuthModal;
        window.closeAuthModal = closeAuthModal;
        window.switchAuthTab = switchAuthTab;
        window.logout = logout;
        window.contactOwner = contactOwner;
        window.removePreviewImage = removePreviewImage;