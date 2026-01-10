
const fs = require('fs');

async function testRoute() {
    const url = 'http://localhost:5002/api/recommend-schemes';
    const payload = {
        name: "Test User",
        age: 30,
        language: "en",
        userId: "test_user"
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await response.text();
        fs.writeFileSync('response_body.txt', text);
        console.log("Wrote response to response_body.txt");

    } catch (error) {
        console.error("Fetch failed:", error);
    }
}

testRoute();
