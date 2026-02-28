const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS for deployment
app.use(cors({
    origin: '*', // Allow all origins for hackathon demo
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Initialize Gemini AI
let genAI;
let model;

try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        console.error('❌ GEMINI_API_KEY not configured!');
    } else {
        genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        console.log('✅ Gemini AI initialized');
    }
} catch (error) {
    console.error('❌ Failed to initialize Gemini:', error.message);
}

// Rajasthan cities
const rajasthanCities = [
    'jaipur', 'udaipur', 'jodhpur', 'jaisalmer', 
    'bikaner', 'pushkar', 'ajmer', 'mount abu'
];

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'Destiny AI Backend',
        version: '1.0.0',
        status: 'running'
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok',
        gemini_configured: model !== undefined,
        timestamp: new Date().toISOString()
    });
});

// Generate itinerary
app.post('/api/generate-itinerary', async (req, res) => {
    try {
        const { city, days, adults, kids } = req.body;
        
        if (!city || !days || adults === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        if (!rajasthanCities.includes(city.toLowerCase())) {
            return res.status(400).json({ error: 'AI currently supports Rajasthan cities only' });
        }
        
        if (!model) {
            return res.status(500).json({ error: 'AI service not configured' });
        }
        
        console.log(`📝 Generating: ${city}, ${days}d, ${adults}a, ${kids}k`);
        
        const prompt = `Create a ${days}-day travel itinerary for ${city}, Rajasthan for ${adults} adult(s) and ${kids || 0} kid(s).

Return ONLY valid JSON in this EXACT format, NO markdown, NO explanations:

{
  "days": [
    {
      "title": "Day 1: Exploring Historic Sites",
      "activities": [
        "Visit Hawa Mahal (9:00 AM - 11:00 AM)",
        "City Palace tour (11:30 AM - 2:00 PM)",
        "Lunch at local restaurant (2:00 PM - 3:00 PM)",
        "Jantar Mantar visit (4:00 PM - 6:00 PM)",
        "Johari Bazaar shopping (6:30 PM - 8:00 PM)"
      ]
    }
  ]
}

Create ${days} days with 5-7 activities each. Include timings, meals, and mix of attractions.`;

        const result = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 30000))
        ]);
        
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) text = jsonMatch[0];
        
        const itinerary = JSON.parse(text);
        
        if (!itinerary.days || !Array.isArray(itinerary.days)) {
            throw new Error('Invalid structure');
        }
        
        console.log('✅ Generated:', itinerary.days.length, 'days');
        res.json(itinerary);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: 'Failed to generate', message: error.message });
    }
});

// Refine itinerary
app.post('/api/refine-itinerary', async (req, res) => {
    try {
        const { message, itinerary } = req.body;
        
        if (!message || !itinerary) {
            return res.status(400).json({ error: 'Missing fields' });
        }
        
        if (!model) {
            return res.status(500).json({ error: 'AI not configured' });
        }
        
        console.log(`🔄 Refining: "${message}"`);
        
        const prompt = `Modify this itinerary: ${JSON.stringify(itinerary)}

User request: "${message}"

Return ONLY valid JSON, NO markdown:
{
  "days": [{"title": "...", "activities": ["..."]}]
}`;

        const result = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 30000))
        ]);
        
        const response = await result.response;
        let text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) text = jsonMatch[0];
        
        const refined = JSON.parse(text);
        
        if (!refined.days) throw new Error('Invalid structure');
        
        console.log('✅ Refined');
        res.json(refined);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).json({ error: 'Failed to refine', message: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 DESTINY AI - HACKATHON MODE');
    console.log(`📡 http://localhost:${PORT}`);
    console.log('='.repeat(40));
    
    if (!process.env.GEMINI_API_KEY) {
        console.log('⚠️  Set GEMINI_API_KEY!');
        console.log('Get key: https://makersuite.google.com/app/apikey\n');
    } else {
        console.log('✅ Ready for demo! 🎯\n');
    }
});
