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
        
        loadTrips();
    } else {
        // Redirect to login if not authenticated
        window.location.href = 'login.html';
    }
}

// Logout
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'home.html';
});

function loadTrips() {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const tripsContent = document.getElementById('tripsContent');
    const emptyState = document.getElementById('emptyState');
    
    if (trips.length === 0) {
        tripsContent.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    tripsContent.style.display = 'grid';
    emptyState.style.display = 'none';
    
    tripsContent.innerHTML = trips.map(trip => {
        const daysPreview = trip.itinerary.days.slice(0, 3).map(day => 
            `<div class="day-preview">${day.title || 'Day'} - ${day.activities.length} activities</div>`
        ).join('');
        
        return `
            <div class="trip-card">
                <div class="trip-header">
                    <div class="trip-city">${trip.city}</div>
                    <div class="trip-meta">
                        <span>📅 ${trip.date}</span>
                        <span>🕒 ${trip.days} day${trip.days > 1 ? 's' : ''}</span>
                        <span>👥 ${trip.adults + trip.kids} ${trip.adults + trip.kids > 1 ? 'people' : 'person'}</span>
                    </div>
                </div>
                <div class="trip-body">
                    <div class="trip-info">
                        <span class="info-badge">${trip.adults} Adult${trip.adults > 1 ? 's' : ''}</span>
                        ${trip.kids > 0 ? `<span class="info-badge">${trip.kids} Kid${trip.kids > 1 ? 's' : ''}</span>` : ''}
                    </div>
                    <div class="trip-days-summary">
                        <div class="summary-title">Itinerary Highlights</div>
                        <div class="days-preview">
                            ${daysPreview}
                            ${trip.itinerary.days.length > 3 ? `<div class="day-preview">And ${trip.itinerary.days.length - 3} more day${trip.itinerary.days.length - 3 > 1 ? 's' : ''}...</div>` : ''}
                        </div>
                    </div>
                    <div class="trip-actions">
                        <button class="view-btn" onclick="viewTrip(${trip.id})">View Details</button>
                        <button class="delete-btn" onclick="deleteTrip(${trip.id})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function viewTrip(tripId) {
    const trips = JSON.parse(localStorage.getItem('trips')) || [];
    const trip = trips.find(t => t.id === tripId);
    
    if (!trip) return;
    
    const modalHtml = `
        <div class="modal" id="tripModal" onclick="closeModal(event)">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="modal-title">${trip.city} - ${trip.days} Day Trip</h2>
                    <button class="close-btn" onclick="closeModal()">×</button>
                </div>
                <div class="modal-body">
                    ${trip.itinerary.days.map((day, index) => `
                        <div class="modal-day">
                            <h3 class="modal-day-title">${day.title || `Day ${index + 1}`}</h3>
                            <ul class="modal-activities">
                                ${day.activities.map(activity => `
                                    <li class="modal-activity">
                                        <span>📍</span>
                                        <span>${activity}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeModal(event) {
    if (!event || event.target.classList.contains('modal')) {
        const modal = document.getElementById('tripModal');
        if (modal) {
            modal.remove();
        }
    }
}

function deleteTrip(tripId) {
    if (!confirm('Are you sure you want to delete this trip?')) {
        return;
    }
    
    let trips = JSON.parse(localStorage.getItem('trips')) || [];
    trips = trips.filter(t => t.id !== tripId);
    localStorage.setItem('trips', JSON.stringify(trips));
    
    loadTrips();
}

// Initialize
checkAuth();
