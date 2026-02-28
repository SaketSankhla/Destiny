# 🎯 Destiny AI - Hackathon Edition

> AI-Powered Travel Planning Platform for India (Rajasthan Phase 1)

**Perfect for:** Hackathons, demos, MVPs, prototypes

## 🚀 5-Minute Quick Start

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get Free Gemini API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

### Step 3: Set API Key
```bash
# Option 1: Environment variable (Mac/Linux)
export GEMINI_API_KEY="paste-your-key-here"

# Option 2: Windows
set GEMINI_API_KEY=paste-your-key-here

# Option 3: Create .env file
echo "GEMINI_API_KEY=your-key-here" > .env
```

### Step 4: Start Backend
```bash
npm start
```
You should see: `✅ Ready for demo! 🎯`

### Step 5: Open Frontend
Just double-click `home.html` in your browser!

OR use a local server:
```bash
python -m http.server 8000
# Visit: http://localhost:8000/home.html
```

### Step 6: Test It!
1. Click "Login" → Enter any name/email
2. Go to "AI Planner"
3. Try: Jaipur, 3 days, 2 adults
4. Click "Generate Itinerary"
5. Wait 5-10 seconds for AI magic! ✨

---

## 📁 Project Structure

```
destiny-ai/
├── Frontend Files:
│   ├── home.html           # Landing page
│   ├── planner.html        # AI itinerary generator
│   ├── trips.html          # Saved trips
│   ├── login.html          # Login/signup
│   ├── styles.css          # Main styles
│   ├── planner.css         # Planner styles
│   ├── trips.css           # Trips styles
│   ├── login.css           # Login styles
│   ├── home.js             # Home logic
│   ├── planner.js          # AI generation logic
│   ├── trips.js            # Trip management
│   └── login.js            # Auth logic
│
├── Backend Files:
│   ├── server.js           # Express + Gemini API
│   ├── package.json        # Dependencies
│   └── .env                # Environment variables
│
└── Documentation:
    ├── README.md           # This file
    ├── HACKATHON_DEPLOY.md # Deployment guide
    ├── TROUBLESHOOTING.md  # Common fixes
    └── QUICKSTART.md       # 5-min setup
```

---

## ✨ Features

### Core Features
- ✅ **AI Itinerary Generator** - Powered by Google Gemini
- ✅ **Chat Refinement** - Modify plans with natural language
- ✅ **Budget Estimation** - Automatic cost calculations
- ✅ **Trip Management** - Save and manage multiple trips
- ✅ **Recent Searches** - Quick access to past searches
- ✅ **Responsive Design** - Works on all devices

### Supported Cities (Rajasthan)
Currently AI works for:
- 🏰 Jaipur (Pink City)
- 🏛️ Udaipur (City of Lakes)
- 🔵 Jodhpur (Blue City)
- 🏜️ Jaisalmer (Golden City)
- 🐪 Bikaner (Camel Country)
- 🕉️ Pushkar (Sacred Lake)
- 🕌 Ajmer (Sufi Heritage)
- ⛰️ Mount Abu (Hill Station)

---

## 🎨 Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- LocalStorage for data persistence
- Responsive design (mobile-first)

**Backend:**
- Node.js + Express
- Google Gemini AI (gemini-1.5-flash)
- CORS enabled for all origins

**Design:**
- Custom color system (#FF6B00 orange accent)
- Playfair Display + DM Sans fonts
- Card-based modern UI
- Smooth animations

---

## 📖 Usage Guide

### 1. Login/Signup
- Click "Login" in navbar
- Enter name and email (any values work for prototype)
- Stored in browser localStorage

### 2. Generate Itinerary
- Go to "AI Planner"
- Fill in:
  - Destination (must be Rajasthan city)
  - Number of days (1-14)
  - Number of adults
  - Number of kids (optional)
- Click "Generate Itinerary"
- Wait 5-10 seconds for AI

### 3. Refine with Chat
After generation, use chat to modify:
- "Add adventure activities"
- "Make it more budget-friendly"
- "Include more cultural experiences"
- "Add kid-friendly activities"
- "More food experiences"

### 4. Save & Manage Trips
- Click "Save This Trip" button
- View all saved trips in "My Trips" page
- View details or delete trips

---

## 🌐 Deploy for 24/7 Hackathon Demo

### Fastest Method: Render + Netlify (FREE)

**Backend (Render):**
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect GitHub repo
4. Add environment variable: `GEMINI_API_KEY`
5. Deploy! (5 minutes)

**Frontend (Netlify):**
1. Drag & drop all HTML/CSS/JS files to netlify.com/drop
2. Done! (30 seconds)

**Update Frontend:**
Edit `planner.js` line 68 with your Render URL:
```javascript
const BACKEND_URL = 'https://your-app.onrender.com';
```

📚 **Full deployment guide:** See `HACKATHON_DEPLOY.md`

---

## 🎯 Hackathon Demo Script

**2-Minute Demo:**

1. **Introduction** (15 sec)
   - "Destiny AI uses Google Gemini to create personalized travel itineraries"

2. **Login** (15 sec)
   - Quick sign up
   - Show authentication

3. **Generate** (30 sec)
   - Enter Jaipur, 3 days, 2 adults
   - Show AI generating
   - Display beautiful itinerary

4. **Refine** (30 sec)
   - "Add adventure activities"
   - Show instant modification
   - Highlight AI intelligence

5. **Features** (30 sec)
   - Budget estimation
   - Save trip
   - My Trips page

**Talking Points:**
- ✅ Real AI (Google Gemini)
- ✅ Natural language refinement
- ✅ Scalable architecture
- ✅ Mobile responsive
- ✅ Production-ready for Rajasthan
- ✅ Expandable to all India

---

## 🐛 Troubleshooting

### "Failed to generate itinerary"
```bash
# Check backend is running:
npm start

# Verify API key is set:
echo $GEMINI_API_KEY

# Test backend directly:
curl http://localhost:3000/api/health
```

### Login not working
```javascript
// Clear storage in browser console (F12):
localStorage.clear()
// Refresh page
```

### CORS errors
- Make sure backend is running on port 3000
- Check URL in planner.js (no trailing slash)

### City not accepted
- Only Rajasthan cities work
- Case insensitive (jaipur = Jaipur)

📚 **More fixes:** See `TROUBLESHOOTING.md`

---

## 📊 API Endpoints

### POST /api/generate-itinerary
Generate new itinerary
```json
{
  "city": "Jaipur",
  "days": 3,
  "adults": 2,
  "kids": 1
}
```

### POST /api/refine-itinerary
Refine existing itinerary
```json
{
  "message": "Add adventure activities",
  "itinerary": { ... }
}
```

### GET /api/health
Check backend status

---

## 💰 Cost

**Everything is FREE for hackathons:**
- Gemini API: Free tier (60 requests/min)
- Render Backend: Free 750 hours/month
- Netlify Frontend: Free unlimited
- **Total: $0** 🎉

---

## 🔮 Roadmap

### Phase 2 (Post-Hackathon)
- [ ] All India cities support
- [ ] Real hotel/flight integration
- [ ] User accounts with backend auth
- [ ] Social sharing features
- [ ] Photo galleries

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Payment integration
- [ ] Google Maps route optimization
- [ ] Multi-language support
- [ ] Actual booking capability

---

## 🤝 For Judges

### Architecture
```
User → Frontend (HTML/CSS/JS) → Backend (Node.js) → Gemini AI
                ↓
          LocalStorage
```

### Key Technical Decisions
1. **Vanilla JS** - Fast, no build step, easy demo
2. **Gemini AI** - Free, powerful, JSON responses
3. **LocalStorage** - Simple, works offline after load
4. **Rajasthan Focus** - Quality over quantity, fully tested
5. **Mobile-First** - Responsive from day one

### Scalability
- Backend: Stateless, horizontal scaling ready
- Frontend: Static files, CDN-friendly
- Database: Easy to add (MongoDB/PostgreSQL)
- Auth: JWT-ready architecture

---

## 📄 License

This is a hackathon prototype for educational purposes.

---

## 🙏 Credits

- **AI**: Google Gemini API
- **Fonts**: Playfair Display, DM Sans
- **Inspiration**: MakeMyTrip, Airbnb
- **Built for**: Hackathon success! 🏆

---

## 📞 Support

**Issues during hackathon?**

1. Check `TROUBLESHOOTING.md`
2. Check backend logs (terminal output)
3. Check browser console (F12)
4. Verify API key is set correctly

**Still stuck?** Have these ready:
- Video demo
- Screenshots
- Architecture diagram
- Local backup running

---

## ⚡ Quick Commands

```bash
# Fresh install
npm install

# Start backend
npm start

# Test backend
curl http://localhost:3000/api/health

# Open frontend
open home.html  # Mac
start home.html # Windows

# Deploy to Render
git push origin main
# Then deploy on render.com

# Emergency reset
rm -rf node_modules && npm install && npm start
```

---

## 🏆 Hackathon Checklist

**Pre-Demo (15 minutes before):**
- [ ] Backend deployed and responding
- [ ] Frontend deployed and loading
- [ ] Tested end-to-end flow
- [ ] Generated 1 test itinerary (warm up)
- [ ] Prepared talking points
- [ ] Have backup ready (video/screenshots)
- [ ] Tested on mobile device
- [ ] Battery charged, internet stable

**During Demo:**
- [ ] Start with strong hook
- [ ] Show AI generation live
- [ ] Demonstrate chat refinement
- [ ] Highlight unique features
- [ ] End with scalability vision
- [ ] Answer questions confidently

---

**Built with ❤️ for hackathon success!**

**Good luck! You got this! 🚀**

---

## 📚 Additional Resources

- `HACKATHON_DEPLOY.md` - Full deployment guide
- `TROUBLESHOOTING.md` - Common issues & fixes
- `QUICKSTART.md` - Super fast setup
- `config.js` - Easy URL configuration

**Questions?** Check these files first!
