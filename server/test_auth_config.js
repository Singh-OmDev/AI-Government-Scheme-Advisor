const dotenv = require('dotenv');
const path = require('path');

// Try loading from .env
const envPath = path.join(__dirname, '.env');
console.log(`Loading .env from: ${envPath}`);
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error("Error loading .env:", result.error);
} else {
    console.log(".env loaded successfully.");
}

console.log("--------------------------------");
console.log("Checking Environment Variables:");
console.log("CLERK_SECRET_KEY:", process.env.CLERK_SECRET_KEY ? "✅ Present" : "❌ MISSING");
console.log("CLERK_PUBLISHABLE_KEY:", process.env.CLERK_PUBLISHABLE_KEY ? "✅ Present" : "❌ MISSING");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Present" : "❌ MISSING");
console.log("--------------------------------");
