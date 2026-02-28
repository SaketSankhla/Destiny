// Check if already logged in
if (localStorage.getItem('user')) {
    window.location.href = 'home.html';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    
    if (!name || !email) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Save user to localStorage
    const user = {
        name,
        email,
        loginDate: new Date().toISOString()
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    
    // Redirect to home
    window.location.href = 'home.html';
});
