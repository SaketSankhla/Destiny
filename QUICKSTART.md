# 🚀 Quick Start Guide - Destiny AI

## Get Running in 5 Minutes

### Step 1: Install Dependencies (30 seconds)
```bash
npm install
```

### Step 2: Get Gemini API Key (2 minutes)
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

### Step 3: Set Your API Key (30 seconds)

**Option A - Environment Variable:**
```bash
export GEMINI_API_KEY="paste-your-key-here"
```

**Option B - Direct in Code:**
Edit `server.js` line 11 and replace `YOUR_API_KEY_HERE` with your actual key

### Step 4: Start Backend (10 seconds)
```bash
npm start
```

Should see: `🚀 Destiny AI Backend running on http://localhost:3000`

### Step 5: Open Frontend (30 seconds)

**Option A - Direct File:**
Simply open `home.html` in your browser

**Option B - Local Server (Better):**
```bash
# Using Python
python -m http.server 8000

# Using Node
npx http-server -p 8000
```

Then visit: http://localhost:8000/home.html

## ✅ You're Done!

Now you can:
1. Click "Login" and enter any name/email
2. Go to "AI Planner"
3. Enter:
   - City: Jaipur
   - Days: 3
   - Adults: 2
   - Kids: 0
4. Click "Generate Itinerary"
5. Watch the AI magic happen! ✨

## 🎯 Test the Chat Feature

After generating an itinerary, try:
- "Add adventure activities"
- "Make it more budget-friendly"
- "Include more food experiences"
- "Add cultural shows"

## 💡 Pro Tips

1. **Keep Backend Running**: Don't close the terminal with the backend
2. **Use Recent Searches**: They appear on the home page after first search
3. **Save Your Trips**: Must be logged in to save
4. **Only Rajasthan**: Currently works for 8 Rajasthan cities only

## 🐛 Something Wrong?

**Backend not working?**
- Check if port 3000 is free
- Verify API key is correct
- See backend terminal for error messages

**Frontend not loading?**
- Make sure you opened the HTML file
- Check browser console (F12) for errors
- Verify backend is running on port 3000

**Can't generate itinerary?**
- Use only Rajasthan cities: Jaipur, Udaipur, Jodhpur, Jaisalmer, Bikaner, Pushkar, Ajmer, Mount Abu
- Check backend terminal for errors
- Verify Gemini API key is valid

---

**Happy Travels! 🗺️**
