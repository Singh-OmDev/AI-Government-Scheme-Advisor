
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Check if PORT is defined
    if (envContent.match(/^PORT=/m)) {
        // Replace existing PORT
        envContent = envContent.replace(/^PORT=.*?$/m, 'PORT=5002');
        console.log("Updated PORT to 5002 in .env");
    } else {
        // Append PORT
        envContent += '\nPORT=5002';
        console.log("Appended PORT=5002 to .env");
    }

    fs.writeFileSync(envPath, envContent);
    console.log("Success");
} catch (error) {
    console.error("Error updating .env:", error);
}
