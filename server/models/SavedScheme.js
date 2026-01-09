const mongoose = require('mongoose');

const savedSchemeSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Clerk User ID
    schemeId: { type: String, required: true }, // Unique identifier for the scheme (usually generated or name)
    schemeName: { type: String, required: true },
    schemeData: { type: Object }, // Store minimal snapshot or full data
    timestamp: { type: Date, default: Date.now }
});

// Compound index to prevent duplicates per user
savedSchemeSchema.index({ userId: 1, schemeId: 1 }, { unique: true });

module.exports = mongoose.model('SavedScheme', savedSchemeSchema);
