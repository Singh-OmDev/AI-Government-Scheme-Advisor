const Groq = require("groq-sdk");
require('dotenv').config({ path: 'server/.env' });

async function test() {
    console.log("Testing Groq API...");
    console.log("API Key present:", !!process.env.GROQ_API_KEY);

    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: "Say hello" }],
            model: "llama-3.3-70b-versatile",
        });
        console.log("Success:", completion.choices[0]?.message?.content);
    } catch (e) {
        console.error("Groq Failed:", e.message);
        if (e.error) console.error("Details:", JSON.stringify(e.error, null, 2));
    }
}

test();
