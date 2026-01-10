
async function testRoute() {
    // Try 5002 first, but be mapped to what the user uses
    const url = 'http://localhost:5002/api/recommend-schemes';
    console.log(`Testing ${url}...`);

    const payload = {
        name: "Test User",
        age: 30,
        gender: "Male",
        state: "Maharashtra",
        city: "Mumbai",
        annualIncome: "500000",
        category: "General",
        occupation: "Private Service",
        educationLevel: "Graduate",
        language: "en",
        userId: "test_debug_user"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        console.log(`Status: ${response.status}`);
        const text = await response.text();
        console.log("Response Body:", text);

    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

testRoute();
