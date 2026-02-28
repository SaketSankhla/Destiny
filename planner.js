// Rajasthan cities validation
const rajasthanCities = [
    'jaipur', 'udaipur', 'jodhpur', 'jaisalmer', 
    'bikaner', 'pushkar', 'ajmer', 'mount abu'
];

let currentItinerary = null;

// Check authentication
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    const loginBtn = document.getElementById('loginBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (user && user.name) {
        loginBtn.style.display = 'none';
        profileDropdown.style.display = 'block';
        
        const initial = user.name.charAt(0).toUpperCase();
        document.getElementById('userInitial').textContent = initial;
        
        const profileBtn = document.getElementById('profileBtn');
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', () => {
            profileDropdown.classList.remove('active');
        });
    }
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'home.html';
});

// Pre-fill city if coming from explore page
window.addEventListener('DOMContentLoaded', () => {
    const selectedCity = localStorage.getItem('selectedCity');
    if (selectedCity) {
        document.getElementById('cityInput').value = selectedCity;
        localStorage.removeItem('selectedCity');
    }
});

// Form submission
document.getElementById('plannerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const city = document.getElementById('cityInput').value.trim();
    const days = parseInt(document.getElementById('daysInput').value);
    const adults = parseInt(document.getElementById('adultsInput').value);
    const kids = parseInt(document.getElementById('kidsInput').value);
    
    // Validate Rajasthan city
    if (!rajasthanCities.includes(city.toLowerCase())) {
        alert('AI currently supports Rajasthan cities only. Please choose from: Jaipur, Udaipur, Jodhpur, Jaisalmer, Bikaner, Pushkar, Ajmer, or Mount Abu.');
        return;
    }
    
    // Show loading
    showLoading();
    
    // Save to recent searches
    saveRecentSearch(city);
    
    try {
        // Backend URL Configuration
        // For local: http://localhost:3000
        // For deployed: Update this to your deployed backend URL
        const BACKEND_URL = 'http://localhost:3000'; 
        // Examples: 
        // 'https://destiny-ai-backend.onrender.com'
        // 'https://your-app.up.railway.app'
        
        const response = await fetch(`${BACKEND_URL}/api/generate-itinerary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ city, days, adults, kids })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to generate itinerary');
        }
        
        const data = await response.json();
        currentItinerary = data;
        
        // Store trip data for potential save
        sessionStorage.setItem('currentTrip', JSON.stringify({
            city,
            days,
            adults,
            kids,
            itinerary: data
        }));
        
        displayItinerary(data, city, days, adults, kids);
        
        // Show chat section
        document.getElementById('chatSection').style.display = 'block';
        
    } catch (error) {
        console.error('Error:', error);
        hideLoading();
        alert(`Failed to generate itinerary: ${error.message}\n\nMake sure:\n1. Backend server is running\n2. Gemini API key is set\n3. Internet connection is active`);
    }
});

// Chat refinement
document.getElementById('sendChatBtn').addEventListener('click', async () => {
    const message = document.getElementById('chatInput').value.trim();
    
    if (!message || !currentItinerary) {
        if (!message) {
            alert('Please enter a message');
        }
        return;
    }
    
    showLoading();
    document.getElementById('chatInput').value = '';
    
    try {
        const BACKEND_URL = 'http://localhost:3000'; // Change to deployed URL for production
        
        const response = await fetch(`${BACKEND_URL}/api/refine-itinerary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                itinerary: currentItinerary
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Failed to refine itinerary');
        }
        
        const data = await response.json();
        currentItinerary = data;
        
        // Update session storage
        const currentTrip = JSON.parse(sessionStorage.getItem('currentTrip'));
        currentTrip.itinerary = data;
        sessionStorage.setItem('currentTrip', JSON.stringify(currentTrip));
        
        displayItinerary(data, currentTrip.city, currentTrip.days, currentTrip.adults, currentTrip.kids);
        
    } catch (error) {
        console.error('Error:', error);
        hideLoading();
        alert(`Failed to refine itinerary: ${error.message}\n\nPlease try again.`);
    }
});

// Enter key for chat
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('sendChatBtn').click();
    }
});

function showLoading() {
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('itineraryResults').innerHTML = '';
    document.getElementById('generateBtn').disabled = true;
}

function hideLoading() {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('generateBtn').disabled = false;
}

function displayItinerary(data, city, days, adults, kids) {
    hideLoading();
    
    const resultsContainer = document.getElementById('itineraryResults');
    
    let html = '';
    
    // Day cards
    if (data.days && Array.isArray(data.days)) {
        data.days.forEach((day, index) => {
            html += `
                <div class="day-card">
                    <div class="day-title">
                        <div class="day-number">${index + 1}</div>
                        <span>${day.title || `Day ${index + 1}`}</span>
                    </div>
                    <ul class="activities-list">
                        ${day.activities.map(activity => `
                            <li class="activity-item">
                                <span class="activity-icon">📍</span>
                                <span>${activity}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        });
    }
    
    // Budget card
    const budget = calculateBudget(days, adults, kids);
    html += `
        <div class="day-card budget-card">
            <div class="day-title">
                <span>💰 Estimated Budget</span>
            </div>
            <div class="budget-amount">₹${budget.toLocaleString()}</div>
            <div class="budget-breakdown">
                Based on ${days} day${days > 1 ? 's' : ''} for ${adults + kids} person${adults + kids > 1 ? 's' : ''}
                <br>Includes accommodation, meals, and local transport
            </div>
            <button class="save-trip-btn" onclick="saveTrip()">
                Save This Trip
            </button>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function calculateBudget(days, adults, kids) {
    return (days * 2500) + ((adults + kids) * 1500);
}

function saveRecentSearch(city) {
    let recent = JSON.parse(localStorage.getItem('recent')) || [];
    
    // Remove if already exists
    recent = recent.filter(c => c.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    recent.unshift(city);
    
    // Keep only 5
    recent = recent.slice(0, 5);
    
    localStorage.setItem('recent', JSON.stringify(recent));
}

function saveTrip() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        alert('Please login to save trips');
        window.location.href = 'login.html';
        return;
    }
    
    const currentTrip = JSON.parse(sessionStorage.getItem('currentTrip'));
    
    if (!currentTrip) {
        alert('No trip to save');
        return;
    }
    
    // Get existing trips
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    
    // Add new trip
    trips.push({
        id: Date.now(),
        city: currentTrip.city,
        days: currentTrip.days,
        adults: currentTrip.adults,
        kids: currentTrip.kids,
        date: new Date().toLocaleDateString(),
        itinerary: currentTrip.itinerary
    });
    
    localStorage.setItem('trips', JSON.stringify(trips));
    
    alert('Trip saved successfully!');
}

// Initialize
checkAuth();
