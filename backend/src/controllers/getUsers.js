const User = require("../models/user");

// route for getting all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        if (users.length == 0) {
            console.log("no users found");
            return res.status(400).json({ message: "no users found, add users :)" });
        }
        return res.status(200).json({ users });
    } catch (error) {
        console.log("error at fetching users", error);
        return res.status(500).json({ message: "internal server error at fetching users" });
    }
}

// route for getting specific user
const specificUser = async (req, res) => {
    try {
        const id = req.user._id;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.log("Error while retriving specific user", error);
        res.status(500).json({ message: "Internal server error at specific user" });
    }
}

// route for updating user profile

const updateProfile = async (req, res) => {
    try {
        const { name, skills, interests, experienceLevel, bio } = req.body;
        const id = req.user._id;

        let user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Update user fields if provided
        if (name) user.name = name;
        if (skills && Array.isArray(skills)) {
            user.skills = [...new Set([...user.skills, ...skills])];
        }
        if (interests && Array.isArray(interests)) {
            user.interests = [...new Set([...user.interests, ...interests])];
        }
        if (experienceLevel) user.experienceLevel = experienceLevel;
        if (bio) user.bio = bio;

        // Calculate and update matches for both the current user and matching users
        await updateBidirectionalMatches(user);

        // Fetch the updated user to return in response
        const updatedUser = await User.findById(id).select('-password');
        res.status(200).json({
            msg: 'Profile updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.log("error at update profile", error);
        res.status(500).json({ message: "internal server error at update profile" });
    }
}

// Function to update matches bidirectionally
async function updateBidirectionalMatches(user) {
    try {
        // Get all users except the current user
        const otherUsers = await User.find({ _id: { $ne: user._id } });

        // Store all the matches that need to be updated
        const matchUpdates = [];

        // Clear current user's matches array
        user.matches = [];

        for (const otherUser of otherUsers) {
            const matchScore = calculateMatchScore(user, otherUser);

            // If match score meets threshold
            if (matchScore >= 3) {
                // Add other user to current user's matches
                user.matches.push(otherUser._id);

                // Prepare update for other user's matches
                // Check if current user is already in other user's matches
                if (!otherUser.matches.includes(user._id)) {
                    matchUpdates.push({
                        updateOne: {
                            filter: { _id: otherUser._id },
                            update: { $addToSet: { matches: user._id } }
                        }
                    });
                }
            } else {
                // If they don't match anymore, remove both connections
                matchUpdates.push({
                    updateOne: {
                        filter: { _id: otherUser._id },
                        update: { $pull: { matches: user._id } }
                    }
                });
            }
        }

        // Save all updates in parallel
        await Promise.all([
            user.save(),
            // Only perform bulkWrite if there are updates
            matchUpdates.length > 0 ? User.bulkWrite(matchUpdates) : Promise.resolve()
        ]);

    } catch (error) {
        console.error('Error in updateBidirectionalMatches:', error);
        throw error; // Propagate error to calling function
    }
}

// Function to calculate match score
function calculateMatchScore(user1, user2) {
    let score = 0;

    // Compare skills
    const commonSkills = user1.skills.filter(skill =>
        user2.skills.includes(skill));
    score += commonSkills.length;

    // Compare interests
    const commonInterests = user1.interests.filter(interest =>
        user2.interests.includes(interest));
    score += commonInterests.length;

    // Compare experience level
    if (user1.experienceLevel === user2.experienceLevel) {
        score += 1;
    }

    return score;
}

// const updateProfile = async (req, res) => {
//     try {
//         const { name, skills, interests, experienceLevel, bio } = req.body;
//         const id  = req.user._id;

//         let user = await User.findById(id).select('-password');
//         if (user == null) {
//             return res.status(404).json({ message: "user not found" });
//         }
//         if(name){
//             user.name = name;
//         }
//         if (skills && Array.isArray(skills)) {
//             // Append new skills to the existing skills array without duplicates
//             user.skills = [...new Set([...user.skills, ...skills])];
//         }
//         if (interests && Array.isArray(interests)) {
//             user.interests = [...new Set([...user.interests, ...interests])];
//         }
//         if (experienceLevel) user.experienceLevel = experienceLevel;
//         if (bio) user.bio = bio;

//         // Calculate matches for the updated user
//         const matches = await calculateMatchesForUser(user);
//         user.matches = matches;
//         await user.save();

//         res.status(200).json({ msg: 'Profile updated successfully', user });
//     } catch (error) {
//         console.log("error at update profile", error);
//         res.status(500).json({ message: "internal server error at update profile" });
//     }
// }

// // Function to calculate matches for a user
// async function calculateMatchesForUser(user) {
//     // Get all users except the current user
//     const otherUsers = await User.find({ _id: { $ne: user._id } });

//     const matchedUsers = [];

//     otherUsers.forEach(otherUser => {
//         const matchScore = calculateMatchScore(user, otherUser);

//         // Set a threshold for matches (e.g., matchScore >= 3)
//         if (matchScore >= 3) {
//             matchedUsers.push(otherUser._id);  // Store matched user ID
//         }
//     });

//     return matchedUsers;  // Return list of matched user IDs
// }

// // Function to calculate match score (example logic)
// function calculateMatchScore(user1, user2) {
//     let score = 0;

//     // Compare skills
//     const commonSkills = user1.skills.filter(skill => user2.skills.includes(skill));
//     score += commonSkills.length;

//     // Compare interests
//     const commonInterests = user1.interests.filter(interest => user2.interests.includes(interest));
//     score += commonInterests.length;

//     // Compare experience level
//     if (user1.experienceLevel === user2.experienceLevel) {
//         score += 1;
//     }

//     return score;  // Return total match score
// }

// route for deleting users account
const deleteAcc = async (req, res) => {
    try {
        const id = req.user._id;

        // check if user exist or not
        let user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "user account deleted" });
    } catch (error) {
        console.log("error at deleting profile", error);
        return res.status(500).json({ message: "internal server error at deleting profile" });
    }
}

// route to fetch user's profile picture
const profilePic = async (req, res) => {
    // console.log(req.user.profilePicture)
    res.json({ profile: req.user.profilePicture });
}
module.exports = { getUsers, updateProfile, deleteAcc, specificUser, profilePic };