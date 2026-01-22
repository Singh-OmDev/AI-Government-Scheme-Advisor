const assert = require('assert');
const path = require('path');

// Mock Dependencies
const mockGroq = {
    recommendSchemes: async () => ({
        schemes: [{ name: "Test Scheme" }],
        generalAdvice: []
    }),
    searchSchemes: async () => ({ schemes: [] }),
    chatWithScheme: async () => "Mock Answer"
};

const mockAnalytics = { create: async () => { } };
const mockHistory = { create: async () => { } };
const mockSavedScheme = {
    create: async () => ({}),
    find: async () => ({ sort: () => [] }),
    exists: async () => false
};
const mockMongoose = {
    connection: { readyState: 1 }
};

// Override require to serve mocks
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function (request) {
    if (request.endsWith('groq')) return mockGroq;
    if (request.endsWith('models/Analytics')) return mockAnalytics;
    if (request.endsWith('models/History')) return mockHistory;
    if (request.endsWith('models/SavedScheme')) return mockSavedScheme;
    if (request === 'mongoose') return mockMongoose;
    return originalRequire.apply(this, arguments);
};

// Load Controller
const schemeController = require('../controllers/schemeController');

// Test Suite
async function runTests() {
    console.log("🧪 Running Scheme Controller Tests...");

    let checks = 0;

    // TEST 1: getRecommendations
    try {
        const req = { body: { age: 25, state: "Delhi" } };
        const res = {
            json: (data) => {
                assert.ok(data.schemes, "Response should have schemes");
                assert.strictEqual(data.schemes[0].name, "Test Scheme", "Should return mock scheme");
                checks++;
            },
            status: (code) => ({ json: () => { } })
        };

        await schemeController.getRecommendations(req, res);
        console.log("✅ getRecommendations Passed");
    } catch (e) {
        console.error("❌ getRecommendations Failed", e);
    }

    // TEST 2: chatWithScheme
    try {
        const req = { body: { scheme: {}, question: "test" } };
        const res = {
            json: (data) => {
                assert.strictEqual(data.answer, "Mock Answer");
                checks++;
            },
            status: (code) => ({ json: () => { } })
        };

        await schemeController.chatWithScheme(req, res);
        console.log("✅ chatWithScheme Passed");
    } catch (e) {
        console.error("❌ chatWithScheme Failed", e);
    }

    console.log(`\nTests Completed. ${checks}/2 assertions verified.`);
}

runTests();
