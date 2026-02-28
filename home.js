// Check authentication status
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('loginBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (user && user.name) {
        loginBtn.style.display = 'none';
        profileDropdown.style.display = 'block';
        
        // Set user initial
        const initial = user.name.charAt(0).toUpperCase();
        document.getElementById('userInitial').textContent = initial;
        
        // Profile dropdown toggle
        const profileBtn = document.getElementById('profileBtn');
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
        });
    } else {
        loginBtn.style.display = 'block';
        profileDropdown.style.display = 'none';
    }
}

// Logout functionality
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'home.html';
});

// Load recent searches
function loadRecentSearches() {
    const recent = JSON.parse(localStorage.getItem('recent')) || [];
    const recentSearchesSection = document.getElementById('recentSearchesSection');
    const recentSearchesContainer = document.getElementById('recentSearches');
    
    if (recent.length > 0) {
        recentSearchesSection.style.display = 'block';
        recentSearchesContainer.innerHTML = recent.map(city => 
            `<div class="search-tag" onclick="planCity('${city}')">${city}</div>`
        ).join('');
    }
}

// Plan city function
function planCity(city) {
    localStorage.setItem('selectedCity', city);
    window.location.href = 'planner.html';
}

// Initialize
checkAuth();
loadRecentSearches();
