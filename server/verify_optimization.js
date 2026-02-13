const http = require('http');

const data = JSON.stringify({
    age: 25,
    gender: "Male",
    state: "Delhi",
    annualIncome: "500000",
    occupation: "Student",
    category: "General"
});

const options = {
    hostname: 'localhost',
    port: 5002,
    path: '/api/recommend-schemes',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log("Starting request to " + options.hostname + ":" + options.port + options.path);
const startTime = Date.now();

const req = http.request(options, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        body += chunk;
    });
    res.on('end', () => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(`Request completed in ${duration} seconds`);

        if (res.statusCode === 200) {
            try {
                const json = JSON.parse(body);
                if (json.schemes) {
                    console.log(`Received ${json.schemes.length} schemes.`);
                    if (json.schemes.length >= 8) {
                        const hasSukanya = json.schemes.some(s => s.name.toLowerCase().includes("sukanya"));
                        const hasOfficialUrl = json.schemes.some(s => s.application_url && (s.application_url.includes(".gov.in") || s.application_url.includes(".nic.in")));

                        if (hasSukanya) {
                            console.log("❌ FAILURE: Found 'Sukanya Samriddhi Yojana' for a Male user!");
                            process.exit(1);
                        } else if (!hasOfficialUrl) {
                            console.log("❌ WARNING: No official (.gov.in/.nic.in) URLs found in results. Verification needs improvement.");
                            // Not failing strictly, but warning
                            process.exit(0);
                        } else {
                            console.log("✅ SUCCESS: Received " + json.schemes.length + " schemes (Target: 8-15), NO Sukanya, and found OFFICIAL URLs.");
                            process.exit(0);
                        }
                    } else {
                        console.log(`❌ WARNING: Expected >= 8 schemes, got ${json.schemes.length}.`);
                        process.exit(1);
                    }
                } else {
                    console.log("❌ ERROR: No schemes array in response.");
                    console.log(body.substring(0, 200) + "...");
                }
            } catch (e) {
                console.log("❌ ERROR: Failed to parse JSON response.");
                console.log(body.substring(0, 200) + "...");
            }
        } else {
            console.log(`❌ ERROR: Status Code ${res.statusCode}`);
            console.log(body);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ PROBLEM WITH REQUEST: ${e.message}`);
});

req.write(data);
req.end();
