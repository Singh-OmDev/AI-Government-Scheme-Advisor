
const fetch = require('node-fetch');

async function checkServer() {
    try {
        console.log("Checking http://127.0.0.1:5002/api/recommend-schemes...");
        // This is a POST endpoint, so GET might return 404 or Cannot GET, but definitely not the React HTML
        const response = await fetch('http://127.0.0.1:5002/api/recommend-schemes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}) // Auth might fail, but we check for JSON vs HTML
        });

        const contentType = response.headers.get('content-type');
        console.log(`Status: ${response.status}`);
        console.log(`Content-Type: ${contentType}`);

        if (contentType && contentType.includes('text/html')) {
            console.log("FAIL: Received HTML (Server probably not running on this port, hitting something else?)");
        } else {
            console.log("SUCCESS: Received non-HTML response (Server is active)");
        }
    } catch (e) {
        console.log(`FAIL: Connection refused or error: ${e.message}`);
    }
}
checkServer();
