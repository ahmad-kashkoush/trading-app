const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

// Middleware to extract current user ID from JWT token
const getCurrentUser = expressAsyncHandler(async (req, res, next) => {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // No token provided - let controller decide what to do
            req.currentUserId = null;
            return next();
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        if (!token) {
            req.currentUserId = null;
            return next();
        }

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract user ID from token payload
        req.currentUserId = decoded.userId || decoded.id || decoded._id || null;

        next();
    // } catch (error) {
    //     // Invalid token - let controller decide what to do
    //     console.log('Token verification failed:', error.message);
    //     req.currentUserId = null;
    //     next();
    // }
});

module.exports = { getCurrentUser };