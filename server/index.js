const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const { recommendSchemes, chatWithScheme } = require('./groq');

const app = express();
const port = process.env.PORT || 5000;

const { clerkMiddleware, requireAuth } = require('@clerk/express');

app.use(cors());
app.use(express.json());

// Explicitly load keys to avoid auto-discovery issues
const publishableKey = process.env.CLERK_PUBLISHABLE_KEY || process.env.VITE_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY || process.env.VITE_CLERK_SECRET_KEY;

if (!publishableKey) {
    console.error("❌ Error: CLERK_PUBLISHABLE_KEY is missing in .env");
} else {
    console.log("CLERK_PUBLISHABLE_KEY loaded (starts with):", publishableKey.substring(0, 8));
}
if (!secretKey) {
    console.error("❌ Error: CLERK_SECRET_KEY is missing in .env");
} else {
    console.log("CLERK_SECRET_KEY loaded (starts with):", secretKey.substring(0, 8));
}

app.use(clerkMiddleware({ publishableKey, secretKey }));

app.post('/api/recommend-schemes', requireAuth(), async (req, res) => {
    try {
        const userProfile = req.body;
        const language = userProfile.language || 'en';
        console.log("Received profile:", userProfile);
        const recommendations = await recommendSchemes(userProfile, language);
        res.json(recommendations);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/api/chat-scheme', requireAuth(), async (req, res) => {
    try {
        const { scheme, question, language } = req.body;
        if (!scheme || !question) {
            return res.status(400).json({ error: "Scheme details and question are required." });
        }
        const answer = await chatWithScheme(scheme, question, language || 'en');
        res.json({ answer });
    } catch (error) {
        console.error("Error in chat endpoint:", error);
        // Log the full error object for debugging
        console.error("Full error details:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
