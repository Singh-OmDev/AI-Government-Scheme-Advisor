const { recommendSchemes } = require('./groq');

async function test() {
    console.log("Starting reproduction test...");

    // Mock user profile similar to what the client sends
    const mockProfile = {
        name: "Test User",
        age: 30,
        gender: "Male",
        state: "Maharashtra",
        city: "Mumbai",
        annualIncome: "500000",
        category: "General",
        occupation: "Private Service",
        educationLevel: "Graduate",
        specialConditions: [],
        language: "en"
    };

    try {
        console.log("Calling recommendSchemes with profile:", JSON.stringify(mockProfile, null, 2));
        const result = await recommendSchemes(mockProfile, mockProfile.language);
        console.log("Success! Result keys:", Object.keys(result));
    } catch (error) {
        console.error("❌ Caught Error:");
        console.error(error);
        if (error.response) {
            console.error("Response data:", error.response.data);
        }
    }
}

test();
