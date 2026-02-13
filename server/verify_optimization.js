const http = require('http');

const postData = JSON.stringify({
    name: "Test User",
    age: 28,
    gender: "Male",
    state: "Delhi",
    annualIncome: "Less than 1 Lakh",
    category: "General",
    occupation: "Unemployed",
    specialConditions: []
});

const options = {
    hostname: 'localhost',
    port: 5002,
    path: '/api/recommend-schemes',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log("Starting request to localhost:5002/api/recommend-schemes");
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
                    const stateSchemes = json.schemes.filter(s => s.type === 'State' || s.name.includes("Arunachal")).length;
                    const centralSchemes = json.schemes.filter(s => s.type === 'Central').length;

                    console.log(`Received ${json.schemes.length} schemes.`);
                    console.log(`Distribution: ${stateSchemes} State, ${centralSchemes} Central.`);

                    if (json.schemes.length >= 8) {
                        const hasSukanya = json.schemes.some(s => s.name.toLowerCase().includes("sukanya"));
                        const hasOfficialUrl = json.schemes.some(s => s.application_url && (s.application_url.includes(".gov.in") || s.application_url.includes(".nic.in")));

                        if (hasSukanya) {
                            console.log("❌ FAILURE: Found 'Sukanya Samriddhi Yojana' for a Male user!");
                            process.exit(1);
                        } else if (!hasOfficialUrl) {
                            console.log("❌ WARNING: No official (.gov.in/.nic.in) URLs found in results.");
                        }

                        if (stateSchemes > 0) {
                            console.log("✅ SUCCESS: Found " + stateSchemes + " State-specific schemes!");
                        } else {
                            console.log("⚠️ WARNING: No State-specific schemes found. prompt might need tuning.");
                        }
                        process.exit(0);
                    } else {
                        console.log(`❌ WARNING: Expected >= 8 schemes, got ${json.schemes.length}.`);
                        process.exit(1);
                    }
                } else {
                    console.log("❌ ERROR: No schemes array in response.");
                    process.exit(1);
                }
            } catch (e) {
                console.log("❌ ERROR: Failed to parse JSON response.");
                process.exit(1);
            }
        } else {
            console.log(`❌ ERROR: Status Code ${res.statusCode}`);
            process.exit(1);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ PROBLEM WITH REQUEST: ${e.message}`);
});

req.write(postData);
req.end();
