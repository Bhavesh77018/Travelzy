module.exports = async (req, res) => {
    try {
        // Import the Express app
        const app = require('../src/index').default;

        // Handle the request
        return app(req, res);
    } catch (error) {
        console.error('Function error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};
