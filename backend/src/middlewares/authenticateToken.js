const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;
const authenticateToken = async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
        res.status(401).json({ "error": "authenticate using valid email and password" });
    }
    try {
        // Verify token (replace 'your-secret-key' with your actual JWT secret)
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.id; // Assuming the token payload contains the user ID

        // Retrieve the user profile from the database
        const userProfile = await User.findById(userId);
        if (!userProfile) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Attach user profile to the request object
        req.user = userProfile;
        console.log("user profile is", userProfile);
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authenticateToken;