const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    profile: {
        state: String,
        age: String, // Keep as string as user input might not be just number
        occupation: String,
        income: String,
        category: String,
        gender: String
    },
    schemesFound: { type: Number, default: 0 },
    topSchemes: [String] // Store names of top recommended schemes
});

module.exports = mongoose.model('Analytics', analyticsSchema);
