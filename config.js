// Configuration for Destiny AI Frontend
// Change this based on your deployment

const CONFIG = {
    // LOCAL DEVELOPMENT
    // Use this when running backend on your machine
    LOCAL: 'http://localhost:3000',
    
    // DEPLOYED BACKEND
    // Replace with your actual deployed URL when ready
    // Examples:
    // - Render: 'https://destiny-ai-backend.onrender.com'
    // - Railway: 'https://destiny-ai-production.up.railway.app'
    // - Vercel: 'https://destiny-ai-backend.vercel.app'
    PRODUCTION: 'http://localhost:3000', // <-- CHANGE THIS
    
    // Current mode: 'LOCAL' or 'PRODUCTION'
    MODE: 'LOCAL'
};

// Get the current backend URL
function getBackendURL() {
    return CONFIG.MODE === 'PRODUCTION' ? CONFIG.PRODUCTION : CONFIG.LOCAL;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

/* 
INSTRUCTIONS:
1. For local development: Set MODE to 'LOCAL'
2. For deployment: 
   - Deploy backend to Render/Railway/Vercel
   - Copy your backend URL
   - Paste it in PRODUCTION above
   - Change MODE to 'PRODUCTION'
3. Commit and deploy!

EXAMPLE:
const CONFIG = {
    LOCAL: 'http://localhost:3000',
    PRODUCTION: 'https://destiny-ai-backend.onrender.com',
    MODE: 'PRODUCTION'  // <-- Changed to production
};
*/
