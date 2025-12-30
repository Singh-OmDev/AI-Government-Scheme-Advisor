const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '.env');
console.log("Checking .env at:", envPath);

if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    console.log("Keys found in .env:");
    Object.keys(envConfig).forEach(key => {
        console.log(`- ${key}`);
    });
} else {
    console.log(".env file NOT found!");
}
