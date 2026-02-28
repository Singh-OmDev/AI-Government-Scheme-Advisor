const http = require('http');

const data = JSON.stringify({
    age: 25,
    gender: 'Male',
    state: 'Delhi',
    annualIncome: 'Low',
    category: 'General',
    occupation: 'Student'
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

const req = http.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Body: ${body.substring(0, 500)}...`); // First 500 chars
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
