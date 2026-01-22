const http = require('http');

function check(path) {
    return new Promise((resolve, reject) => {
        // 5002 is the port in index.js
        http.get(`http://localhost:5002${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`[${res.statusCode}] ${path}`);
                if (res.statusCode >= 200 && res.statusCode < 500) resolve(true);
                else resolve(false);
            });
        }).on('error', (err) => {
            console.error(`Connection failed: ${err.message}`);
            resolve(false);
        });
    });
}

async function run() {
    console.log("Verifying Server Refactor...");
    // Give nodemon a moment to restart
    await new Promise(r => setTimeout(r, 2000));

    const p1 = await check('/api/verify-server');

    if (p1) {
        console.log("✅ Main server verification passed!");
    } else {
        console.log("⚠️ Server might be restarting or failed. Checking again...");
        await new Promise(r => setTimeout(r, 3000));
        const p2 = await check('/api/verify-server');
        if (p2) console.log("✅ Main server verification passed on retry!");
        else console.error("❌ Main server verification failed.");
    }
}

run();
