
const fetch = require('node-fetch'); // Or use built-in fetch if Node 18+

async function testBackend() {
    try {
        console.log("Testing direct connection to backend...");
        const response = await fetch('http://127.0.0.1:5001/api/search-schemes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: 'test' })
        });

        console.log(`Status Code: ${response.status}`);
        const contentType = response.headers.get('content-type');
        console.log(`Content-Type: ${contentType}`);

        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log("Response Data:", data);
        } else {
            const text = await response.text();
            console.log("Response Text (First 100 chars):", text.substring(0, 100));
        }

    } catch (error) {
        console.error("Connection Failed:", error.message);
    }
}

testBackend();
