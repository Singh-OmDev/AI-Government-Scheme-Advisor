const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const { clerkMiddleware } = require('@clerk/express');

// Import Routes
const schemeRoutes = require('./routes/schemes');
const userRoutes = require('./routes/users');

dotenv.config({ path: path.join(__dirname, '.env') });

// Ensure Clerk Publishable Key is available for Backend SDK
if (!process.env.CLERK_PUBLISHABLE_KEY && process.env.VITE_CLERK_PUBLISHABLE_KEY) {
    process.env.CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY;
}

const app = express();
const port = process.env.PORT || 5002;

// Global Error Handlers
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message, err.stack);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message, err.stack);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
})
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => {
        console.error('❌ MongoDB Connection Initial Fail:', err.message);
    });

mongoose.connection.on('error', err => {
    console.error('❌ MongoDB Runtime Error:', err.message);
});

app.use(cors());
app.use(express.json());

// Debug Logger
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.path}`);
    next();
});

// Add Clerk Middleware
if (process.env.CLERK_SECRET_KEY) {
    app.use(clerkMiddleware());
} else {
    console.warn("⚠️ CLERK_SECRET_KEY is missing in .env. Authentication middleware skipped.");
}

// Mount Routes
app.use('/api', schemeRoutes);
app.use('/api', userRoutes);

// Verification Endpoint
app.get('/api/verify-server', (req, res) => {
    res.json({ message: "Verification Successful", port: port });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port} (0.0.0.0) - TIMESTAMP: ${new Date().toISOString()}`);
    console.log(`🔒 Clerk Secret Key: ${process.env.CLERK_SECRET_KEY ? '✅ Loaded' : '❌ MISSING'}`);
    console.log(`🔑 Groq API Key: ${process.env.GROQ_API_KEY ? '✅ Loaded' : '❌ MISSING'}`);
});
