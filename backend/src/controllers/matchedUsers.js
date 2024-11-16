const User = require("../models/user");

const matches = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).populate({
            path: 'matches',
            select: 'name email skills interests experienceLevel profilePicture'
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the matched users
        res.json(user.matches);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = matches;