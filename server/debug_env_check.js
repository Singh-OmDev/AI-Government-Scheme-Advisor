require('dotenv').config();
console.log('--- ENV CHECK ---');
console.log('CLERK_SECRET_KEY present:', !!process.env.CLERK_SECRET_KEY);
console.log('MONGODB_URI present:', !!process.env.MONGODB_URI);
console.log('GROQ_API_KEY present:', !!process.env.GROQ_API_KEY);
console.log('--- END CHECK ---');
