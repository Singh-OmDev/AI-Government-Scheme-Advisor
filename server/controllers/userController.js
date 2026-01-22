const Analytics = require('../models/Analytics');
const History = require('../models/History');

/**
 * getAnalytics
 * Retrieves aggregated analytics data for the admin dashboard.
 */
exports.getAnalytics = async (req, res) => {
    try {
        const totalSearches = await Analytics.countDocuments();

        // Aggregate most searched states
        const stateStats = await Analytics.aggregate([
            { $group: { _id: "$profile.state", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        // Aggregate top occupations
        const occupationStats = await Analytics.aggregate([
            { $group: { _id: "$profile.occupation", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        const recentSearches = await Analytics.find()
            .sort({ timestamp: -1 })
            .limit(5)
            .select('profile.state profile.occupation schemesFound topSchemes timestamp');

        res.json({
            totalSearches,
            topStates: stateStats,
            topOccupations: occupationStats,
            recentSearches
        });
    } catch (error) {
        console.error("Analytics fetch error:", error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
};

/**
 * getUserHistory
 * Retrieves search history for a specific user.
 */
exports.getUserHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const history = await History.find({ userId }).sort({ timestamp: -1 }).limit(20);
        res.json(history);
    } catch (error) {
        console.error("History fetch error:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
};
