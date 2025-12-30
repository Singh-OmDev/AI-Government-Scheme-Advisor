const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

console.log("--- DEBUG ENV VARS ---");
console.log("PWD:", process.cwd());
console.log(".env path:", path.join(__dirname, '.env'));
console.log("CLERK_PUBLISHABLE_KEY present:", !!process.env.CLERK_PUBLISHABLE_KEY);
console.log("CLERK_SECRET_KEY present:", !!process.env.CLERK_SECRET_KEY);
console.log("VITE_CLERK_PUBLISHABLE_KEY present:", !!process.env.VITE_CLERK_PUBLISHABLE_KEY);
console.log("----------------------");
