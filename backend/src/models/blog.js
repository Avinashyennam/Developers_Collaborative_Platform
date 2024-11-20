const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the author
    tags: [String], // Tags for categorization (e.g., "JavaScript", "React")
    photos: [
        {
            url: { type: String, required: true }, // URL for the uploaded photo
            caption: { type: String }, // Optional caption for the photo
        }
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the blog
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String },
            timestamp: { type: Date, default: Date.now }
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
