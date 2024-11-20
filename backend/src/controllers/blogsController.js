const User = require("../models/user");
const Blog = require("../models/blog")
const mongoose = require("mongoose");

const addBlog = async (req, res) => {
    try {
        const { title, content, tags, photos } = req.body;

        // Validate input
        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        // Create the blog
        const newBlog = new Blog({
            title,
            content,
            author: req.user._id, // User ID from authentication middleware
            tags,
            photos, // Optional array of photo objects
        });

        // Save the blog
        const savedBlog = await newBlog.save();

        // Add blog reference to the user's blogs array
        await User.findByIdAndUpdate(req.user._id, {
            $push: { blogs: savedBlog._id }
        });

        res.status(201).json({ message: 'Blog created successfully', blog: savedBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

const getBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the blog ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid blog ID' });
        }

        // Use aggregate pipeline to fetch the blog and its author's details
        const blog = await Blog.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Match the blog by ID
            {
                $lookup: {
                    from: 'users', // Collection to join (User collection)
                    localField: 'author', // Field in Blog collection
                    foreignField: '_id', // Field in User collection
                    as: 'authorDetails' // Alias for joined data
                }
            },
            {
                $unwind: { path: '$authorDetails', preserveNullAndEmptyArrays: true } // Flatten the joined data
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    tags: 1,
                    photos: 1,
                    likes: 1,
                    comments: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'authorDetails.name': 1, // Include specific fields from the author
                    'authorDetails.email': 1,
                    'authorDetails.profilePicture': 1
                }
            }
        ]);

        // Handle case where no blog is found
        if (!blog || blog.length === 0) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json(blog[0]); // Return the blog (unwrapped from the array)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

const getBlogs = async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;

        // Convert limit and page to integers
        const blogsLimit = parseInt(limit, 10);
        const skip = (parseInt(page, 10) - 1) * blogsLimit;

        // Use aggregate pipeline to fetch recent blogs
        const blogs = await Blog.aggregate([
            { $sort: { createdAt: -1 } }, // Sort by most recent
            { $skip: skip },             // Skip for pagination
            { $limit: blogsLimit },      // Limit the number of blogs
            {
                $lookup: {
                    from: 'users', // Collection to join
                    localField: 'author', // Field in Blog collection
                    foreignField: '_id', // Field in User collection
                    as: 'authorDetails'
                }
            },
            {
                $unwind: { path: '$authorDetails', preserveNullAndEmptyArrays: true }
            },
            {
                $project: {
                    title: 1,
                    content: { $substr: ['$content', 0, 200] }, // Only first 200 characters
                    tags: 1,
                    photos: 1,
                    createdAt: 1,
                    likes: 1,
                    comments: 1,
                    'authorDetails.name': 1,
                    'authorDetails.profilePicture': 1
                }
            }
        ]);

        res.status(200).json({ blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

// route to add like to a blog
const addLike = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { userId } = req.body; // User ID (from the client)

        // Validate inputs
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the user already liked the blog
        const alreadyLiked = blog.likes.includes(userId);

        if (alreadyLiked) {
            // Remove the like
            blog.likes = blog.likes.filter((like) => like !== userId);
        } else {
            // Add the like
            blog.likes.push(userId);
        }

        await blog.save();
        res.status(200).json({
            message: alreadyLiked ? 'Blog unliked successfully' : 'Blog liked successfully',
            likes: blog.likes.length
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

// route to add comment to a blog
const addComment = async (req, res) => {
    try {
        const { id } = req.params; // Blog ID
        const { userId, comment } = req.body; // User ID and comment from the client

        // Validate inputs
        if (!userId || !comment) {
            return res.status(400).json({ error: 'User ID and comment are required' });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Add the comment
        blog.comments.push({
            user: userId,
            comment: comment,
            timestamp: new Date()
        });

        await blog.save();
        res.status(200).json({ message: 'Comment added successfully', comments: blog.comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

// delete a blog
const deleteBlog = async(req, res)=>{
    try {
        const { id } = req.params;

        // Find and delete the blog
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

// delete a comment
const deleteComment = async(req, res)=>{
    try {
        const { id, commentId } = req.params;

        // Find the blog and remove the specific comment
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check if the comment exists in the blog's comments array
        const commentIndex = blog.comments.findIndex(
            (comment) => comment._id.toString() === commentId
        );

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the comment using the MongoDB pull operator
        blog.comments.splice(commentIndex, 1);

        // Save the updated blog
        await blog.save();

        res.status(200).json({ message: 'Comment deleted successfully', comments: blog.comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

module.exports = { addBlog, getBlog, getBlogs, addLike, addComment, deleteBlog, deleteComment };