
const { recommendSchemes } = require('./groq');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const mockProfile = {
    name: "Test User",
    age: 30,
    gender: "Male",
    state: "Maharashtra",
    city: "Mumbai",
    annualIncome: "500000",
    category: "General",
    occupation: "Software Engineer",
    educationLevel: "Graduate",
    specialConditions: []
};

async function testPerformance() {
    console.log("Starting performance test for recommendSchemes...");
    const start = Date.now();
    try {
        const results = await recommendSchemes(mockProfile, 'en');
        const end = Date.now();
        console.log(`Success! Fetched ${results.schemes.length} schemes.`);
        console.log(`Time taken: ${(end - start) / 1000} seconds`);
    } catch (error) {
        console.error("Error during test:", error);
    }
}

testPerformance();
