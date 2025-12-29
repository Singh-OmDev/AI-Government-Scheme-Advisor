const fetch = require('node-fetch'); // You might need to install node-fetch if not present, or use built-in fetch in newer node
// If node version is new enough (18+), fetch is global.
// Let's assume fetch is global or we use http.

const http = require('http');

const data = JSON.stringify({
    age: 25,
    gender: "Male",
    state: "Delhi",
    annualIncome: "500000",
    occupation: "Student"
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/recommend-schemes',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
