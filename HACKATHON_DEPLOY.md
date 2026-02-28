# 🎯 HACKATHON DEPLOYMENT GUIDE - Make Destiny AI 24/7

## Quick Fix: Get It Running NOW (5 minutes)

### Step 1: Get Gemini API Key (2 min)
```bash
# Visit: https://makersuite.google.com/app/apikey
# Click "Create API Key" → Copy it
```

### Step 2: Set API Key & Start Backend (1 min)
```bash
# In project folder:
npm install

# Set your API key (replace with your actual key):
export GEMINI_API_KEY="AIzaSy..."

# Start backend:
npm start
```

### Step 3: Open Frontend (1 min)
```bash
# Just double-click home.html
# OR use a server:
python -m http.server 8000
# Then open: http://localhost:8000/home.html
```

### Step 4: Test It! (1 min)
1. Click "Login" → Enter name/email (any values work)
2. Go to "AI Planner"
3. Enter: Jaipur, 3 days, 2 adults
4. Click "Generate Itinerary"
5. Wait 5-10 seconds for AI magic ✨

---

## 🌍 Deploy Backend 24/7 (Choose ONE)

### Option A: Render.com (FREE, Easiest for Hackathon)

**Why Render?**
- ✅ FREE tier available
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variables
- ✅ 24/7 uptime
- ✅ Takes 10 minutes

**Steps:**

1. **Push to GitHub**
```bash
# Create .gitignore first:
echo "node_modules/
.env
.DS_Store" > .gitignore

# Initialize git:
git init
git add .
git commit -m "Destiny AI for hackathon"

# Create GitHub repo and push:
git remote add origin https://github.com/YOUR_USERNAME/destiny-ai.git
git push -u origin main
```

2. **Deploy on Render**
- Go to: https://render.com
- Sign up (free account)
- Click "New +" → "Web Service"
- Connect your GitHub repo
- Configure:
  - **Name**: destiny-ai-backend
  - **Build Command**: `npm install`
  - **Start Command**: `npm start`
  - **Environment**: Add `GEMINI_API_KEY` with your key
- Click "Create Web Service"
- Wait 3-5 minutes for deployment
- Copy your URL: `https://destiny-ai-backend.onrender.com`

3. **Update Frontend**
Edit `planner.js` line 68:
```javascript
const BACKEND_URL = 'https://destiny-ai-backend.onrender.com';
```

**Done! Backend is now 24/7** 🎉

---

### Option B: Railway.app (Also FREE & Easy)

1. Visit: https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repo
5. Add environment variable: `GEMINI_API_KEY`
6. Copy your deployment URL
7. Update `planner.js` with your Railway URL

---

### Option C: Vercel (Frontend + Backend)

**Deploy Backend:**
```bash
npm i -g vercel
vercel --prod
# Follow prompts, add GEMINI_API_KEY when asked
```

**Deploy Frontend:**
```bash
cd frontend-folder
vercel --prod
```

Update API URLs accordingly.

---

## 🚀 Deploy Frontend 24/7

### Option 1: Netlify (Recommended)

1. **Drag & Drop Method** (Fastest)
   - Go to: https://app.netlify.com/drop
   - Drag your folder with all HTML/CSS/JS files
   - Get instant URL: `https://your-site.netlify.app`

2. **GitHub Method** (Better for updates)
   - Push code to GitHub
   - Go to Netlify → "New site from Git"
   - Connect repo
   - Deploy settings: Leave empty (static site)
   - Deploy!

### Option 2: Vercel

```bash
npm i -g vercel
vercel --prod
```

### Option 3: GitHub Pages (100% Free)

```bash
# In your repo settings:
# Settings → Pages → Source: main branch
# Your site: https://username.github.io/destiny-ai
```

---

## ⚡ FASTEST HACKATHON SETUP (One Command)

If you just need it working for presentation:

### Use Replit (No installation needed!)

1. Go to: https://replit.com
2. Click "Create Repl"
3. Choose "Node.js"
4. Upload all your files
5. Add secret: `GEMINI_API_KEY`
6. Click "Run"
7. Share the URL with judges!

**Frontend:** Upload to Netlify Drop (30 seconds)
**Backend:** Replit (2 minutes)

---

## 🔧 Update Frontend URLs

After deploying backend, update `planner.js`:

**Find these lines (around line 68 and 125):**
```javascript
const BACKEND_URL = 'http://localhost:3000';
```

**Replace with your deployed URL:**
```javascript
const BACKEND_URL = 'https://your-backend.onrender.com';
```

Make sure NO trailing slash!

---

## 🎯 Pre-Hackathon Checklist

### 2 Hours Before Demo:
- [ ] Backend deployed and responding: Test at `YOUR_URL/api/health`
- [ ] Frontend deployed and loading
- [ ] Can create account (login works)
- [ ] Can generate itinerary for Jaipur
- [ ] Can refine with chat
- [ ] Can save trips
- [ ] Tested on mobile (judges often check!)

### During Demo:
- [ ] Have backup: Local version running
- [ ] Keep backend logs open (shows AI working)
- [ ] Prepare 2-3 example cities
- [ ] Show chat refinement feature
- [ ] Demo saved trips

---

## 🐛 Common Issues & Fixes

### Issue: "Failed to generate itinerary"
**Fix:**
```bash
# Check backend logs
# Verify API key is set:
curl YOUR_BACKEND_URL/api/health
# Should show: "gemini_configured": true
```

### Issue: Login not working
**Check:** Browser console (F12) → Look for errors
**Fix:** Clear localStorage: `localStorage.clear()` in console

### Issue: CORS errors
**Fix:** Backend already has CORS enabled for all origins
If still issues, add this header in fetch calls:
```javascript
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
```

### Issue: Backend sleeping (Render free tier)
**Fix:** First request takes 30 seconds (cold start)
**Workaround:** Make health check call before demo
```bash
curl https://your-backend.onrender.com/api/health
```

---

## 💰 Cost Breakdown (All FREE for Hackathon!)

- **Gemini API**: Free tier = 60 requests/minute
- **Render Backend**: Free tier = 750 hours/month
- **Netlify Frontend**: Free = Unlimited bandwidth
- **Domain (optional)**: $0 (use provided subdomain)

**Total Cost: $0** 🎉

---

## 🏆 Hackathon Pro Tips

1. **Demo Flow:**
   - Start with home page (show branding)
   - Quick login (shows auth)
   - Generate itinerary (AI magic)
   - Refine with chat (show intelligence)
   - Save trip (show persistence)
   - My Trips page (show management)

2. **Talking Points:**
   - "AI-powered using Google Gemini"
   - "Currently Rajasthan, expanding to all India"
   - "Real-time chat refinement"
   - "Budget estimates included"
   - "Mobile responsive design"

3. **Have Ready:**
   - Architecture diagram (Frontend → Backend → Gemini)
   - Sample API response
   - Performance metrics
   - Future roadmap

4. **If Demo Fails:**
   - Have video recording ready
   - Screenshots of working version
   - Local backup running

---

## 📱 Test URLs to Share

After deployment, you'll have:
- **Frontend**: `https://destiny-ai.netlify.app`
- **Backend**: `https://destiny-ai-backend.onrender.com`
- **Health Check**: `YOUR_BACKEND/api/health`

Share the frontend URL with judges!

---

## ⏰ Timeline

- **T-2 hours**: Deploy backend, test
- **T-1 hour**: Deploy frontend, end-to-end test
- **T-30 min**: Final checks, practice demo
- **T-0**: Show time! 🎯

---

## 🎬 Quick Demo Script

"Destiny AI is an AI-powered travel planning platform for India. Watch this:

1. [Login] Simple authentication
2. [AI Planner] Enter Jaipur, 3 days, 2 adults
3. [Generate] AI creates personalized itinerary in seconds
4. [Chat] 'Add adventure activities' - AI refines instantly
5. [Save] Persistent storage of trips
6. [My Trips] Manage all saved itineraries

Built with: JavaScript frontend, Node.js backend, Google Gemini AI.
Currently Rajasthan, expanding nationwide post-hackathon."

**Total demo time: 2 minutes** ⏱️

---

## 🆘 Emergency Contacts

If nothing works:
1. Use local version (backend + frontend)
2. Show video demo
3. Walk through code architecture
4. Discuss technical decisions

**Remember:** Judges care about:
- Innovation ✨
- Execution 💪
- Presentation 🎤
- Scalability 📈

---

**You got this! 🚀 Good luck at your hackathon!**
