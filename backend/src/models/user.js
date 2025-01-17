const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    projects: [
        {
            title: String,
            description: String,
            githubLink: String
        }
    ],
    skills: [String],  // Array of skills like ['JavaScript', 'React', 'Node.js']
    interests: [String],  // Array of project interests like ['Web Development', 'Machine Learning']
    experienceLevel: {
        type: String,  // e.g., 'Beginner', 'Intermediate', 'Expert'
        // required: true,
    },
    bio: {
        type: String,  // Brief description of the developer
    },
    profilePicture: {
        type: String,
    },
    availableForProjects: {
        type: Boolean,
        default: true,
    },
    matches: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // List of matched developer profiles
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',  // References to chat messages
        }
    ],
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    pendingConnections: [
        {
            from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Who sent the request
            requestedAt: { type: Date, default: Date.now },
        },
    ],
    connections: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Accepted connections
    ],
    // badges: [{
    //     skill: {
    //         type: String, // Skill name like 'JavaScript', 'React', etc.
    //         required: true,
    //     },
    //     level: {
    //         type: String, // Level like 'Beginner', 'Intermediate', 'Expert'
    //         required: true,
    //     },
    // }],
    // recentScores: [{
    //     skill: {
    //         type: String, // Skill name like 'JavaScript', 'React', etc.
    //         required: true,
    //     },
    //     score: {
    //         type: Number, // The user's score
    //         required: true,
    //     },
    //     maxScore: {
    //         type: Number, // The maximum possible score for the quiz
    //         required: true,
    //     },
    // }]
});

module.exports = mongoose.model('User', userSchema);
