# 🔧 QUICK FIXES - Common Issues

## 🚨 "Failed to generate itinerary"

### Fix 1: Check Backend is Running
```bash
# Open terminal, run:
npm start

# Should see: "✅ Ready for demo! 🎯"
```

### Fix 2: Check API Key
```bash
# In terminal:
echo $GEMINI_API_KEY

# Should show your key (not empty)
# If empty:
export GEMINI_API_KEY="paste-your-key-here"
```

### Fix 3: Test Backend Directly
```bash
# Visit in browser:
http://localhost:3000/api/health

# Should show: "gemini_configured": true
```

---

## 🚨 Login Button Not Working

### Fix: Clear Browser Storage
1. Open browser console (F12)
2. Type: `localStorage.clear()`
3. Refresh page (F5)
4. Try login again

---

## 🚨 CORS Error in Console

### Check:
- Backend running on port 3000? ✓
- Using correct URL in planner.js? ✓

### Fix:
```javascript
// In planner.js, check line 68:
const BACKEND_URL = 'http://localhost:3000'; // No trailing slash!
```

---

## 🚨 "AI service not configured"

### This means API key is missing:

```bash
# Option 1: Set in terminal (Mac/Linux)
export GEMINI_API_KEY="your-key-here"

# Option 2: Set in terminal (Windows)
set GEMINI_API_KEY=your-key-here

# Option 3: Create .env file
echo "GEMINI_API_KEY=your-key-here" > .env

# Then restart server:
npm start
```

---

## 🚨 City Not Accepted

### Only these cities work:
- Jaipur
- Udaipur  
- Jodhpur
- Jaisalmer
- Bikaner
- Pushkar
- Ajmer
- Mount Abu

**Note:** Case doesn't matter (jaipur = Jaipur = JAIPUR)

---

## 🚨 Nothing Shows Up After Generate

### Check Browser Console:
1. Press F12
2. Look for red errors
3. Common fixes:
   - Backend not running → Start it
   - Wrong URL → Check planner.js
   - API timeout → Wait 30 seconds, try again

---

## 🚨 Saved Trips Not Showing

### Must be logged in first!
1. Click "Login"
2. Enter any name/email
3. Try saving again

### If still not working:
```javascript
// Browser console (F12):
localStorage.getItem('trips')
// Should show your saved trips
```

---

## 🚨 For Hackathon Demo

### Pre-Demo Checklist (2 minutes):
```bash
# 1. Start backend
npm start

# 2. Open frontend
open home.html  # Mac
start home.html # Windows

# 3. Quick test
# - Login with test@test.com
# - Generate Jaipur, 3 days
# - Should work in 10 seconds
```

### If Demo Fails:
1. **Have backup ready:** Screenshots + video
2. **Show the code:** Walk through architecture
3. **Explain the tech:** Gemini AI, Node.js, etc.

---

## 🆘 Emergency Commands

```bash
# Kill all Node processes (if port stuck)
killall node  # Mac/Linux
taskkill /F /IM node.exe  # Windows

# Fresh start
rm -rf node_modules package-lock.json
npm install
npm start

# Check if port 3000 is in use
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows
```

---

## 📞 Quick Tests

### Test 1: Backend Health
```bash
curl http://localhost:3000/api/health
```
Should return: `{"status":"ok"}`

### Test 2: Generate Itinerary
```bash
curl -X POST http://localhost:3000/api/generate-itinerary \
  -H "Content-Type: application/json" \
  -d '{"city":"Jaipur","days":2,"adults":2,"kids":0}'
```
Should return JSON with days array.

### Test 3: Frontend Connection
1. Open home.html
2. F12 → Console
3. Type: `fetch('http://localhost:3000/api/health').then(r=>r.json()).then(console.log)`
4. Should see health status

---

## 🎯 Working Configuration

**File: .env**
```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXX
PORT=3000
```

**File: planner.js (line 68)**
```javascript
const BACKEND_URL = 'http://localhost:3000';
```

**Backend Terminal:**
```
✅ Ready for demo! 🎯
```

**Browser Console:**
```
No errors (clean)
```

---

## 💡 Pro Tips

1. **Keep backend terminal open** - You'll see requests in real-time
2. **Use Chrome DevTools Network tab** - See all API calls
3. **Test before demo** - Generate 1 itinerary to warm up
4. **Have fallback** - Local copy + screenshots

---

## ⚡ Super Quick Reset

If everything is broken:

```bash
# 1. Clean slate
rm -rf node_modules
npm install

# 2. Set API key
export GEMINI_API_KEY="your-key"

# 3. Start fresh
npm start

# 4. Test immediately
curl http://localhost:3000/api/health
```

---

**Still stuck? Check HACKATHON_DEPLOY.md for deployment help!**
