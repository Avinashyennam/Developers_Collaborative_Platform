// const User = require("../models/user");
// const mongoose = require("mongoose");
// const matches = async (req, res) => {
//     try {
//         if (mongoose.connection.readyState !== 1) {
//             throw new Error('Database not connected');
//         }
    
//         const id = req.user._id;
//         // Verify ID format
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ message: 'Invalid user ID format' });
//         }
        
//         const user = await User.findById(id).populate({
//             path: 'matches',
//             select: 'name email skills interests experienceLevel profilePicture'
//         });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // Return the matched users
//         res.json(user.matches);
//     } catch (error) {
//         console.error('Error fetching matches:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// }

// module.exports = matches;

const User = require("../models/user");
const mongoose = require("mongoose");

const matches = async (req, res) => {
    try {
        // Check database connection
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Database not connected');
        }
    
        const id = req.user._id;
        
        // Verify ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        
        // Use aggregation pipeline instead of populate
        const userMatches = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'users', // The collection name for users
                    localField: 'matches',
                    foreignField: '_id',
                    as: 'matchedUsers'
                }
            },
            {
                $project: {
                    matchedUsers: {
                        $map: {
                            input: "$matchedUsers",
                            as: "user",
                            in: {
                                name: "$$user.name",
                                email: "$$user.email",
                                skills: "$$user.skills",
                                interests: "$$user.interests",
                                experienceLevel: "$$user.experienceLevel",
                                profilePicture: "$$user.profilePicture"
                            }
                        }
                    }
                }
            }
        ]);

        if (!userMatches || userMatches.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the matched users array
        res.json(userMatches[0].matchedUsers);
        
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ 
            message: 'Server error', 
            details: process.env.NODE_ENV === 'development' ? error.message : undefined 
        });
    }
};

module.exports = matches;