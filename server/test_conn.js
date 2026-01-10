
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Analytics = require('./models/Analytics');

dotenv.config({ path: path.join(__dirname, '.env') });

async function testMongo() {
    console.log("Connecting to Mongo:", process.env.MONGODB_URI ? "URI Present" : "URI Missing");
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected!");

        console.log("Saving mock analytics...");
        await Analytics.create({
            schemesFound: 5,
            topSchemes: ["Test Scheme"]
        });
        console.log("Saved Analytics!");

        await mongoose.disconnect();
    } catch (error) {
        console.error("Mongo Error:", error);
    }
}

testMongo();
