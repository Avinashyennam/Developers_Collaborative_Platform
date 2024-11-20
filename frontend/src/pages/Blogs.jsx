// src/pages/BlogsPage.js
import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
// import { Dev } from "../context/BlogContext";
import { DevContext } from "../context/Context";
import {faThumbsUp, faComment, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlogsPage = () => {
    const { blogs, fetchBlogs } = useContext(DevContext); // Using Context API to get blogs
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        fetchBlogs(); // Fetch blogs when the page loads
    }, [fetchBlogs]);

    // Handle adding a comment
    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = (blogId) => {
        // Call an API to add the comment (this part needs backend integration)
        console.log(`Comment added to blog: ${blogId}`);
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <motion.div
                        key={blog._id}
                        className="bg-white shadow-lg rounded-lg overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    {blog.authorDetails.profilePicture ? (
                                        <img
                                            src={blog.authorDetails.profilePicture}
                                            alt="Author"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        // <FaUserCircle className="w-full h-full text-gray-400" />
                                        // <FontAwesomeIcon icon={faUser}
                                        <FontAwesomeIcon icon={faUserCircle} />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{blog.authorDetails.name}</h3>
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                            <p className="text-gray-700 mb-4">
                                {blog.content.slice(0, 150)}...
                            </p>

                            {/* Blog Images */}
                            <div className="space-y-2">
                                {blog.photos?.map((photo, idx) => (
                                    <img
                                        key={idx}
                                        src={photo.url}
                                        alt={photo.caption}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                ))}
                            </div>

                            {/* Blog Actions */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex space-x-4">
                                    <button className="flex items-center text-gray-600 hover:text-blue-600">
                                        {/* <FaThumbsUp className="mr-1" /> {blog.likes.length} Likes
                                         */}
                                         <FontAwesomeIcon icon={faThumbsUp} />
                                    </button>
                                    <button
                                        className="flex items-center text-gray-600 hover:text-blue-600"
                                        onClick={() => handleAddComment(blog._id)}
                                    >
                                        {/* <FaComment className="mr-1" /> {blog.comments.length} Comments */}
                                        <FontAwesomeIcon icon={faComment} />
                                    </button>
                                </div>
                            </div>

                            {/* Add Comment */}
                            <div className="mt-4">
                                <textarea
                                    value={newComment}
                                    onChange={handleCommentChange}
                                    placeholder="Add a comment..."
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={() => handleAddComment(blog._id)}
                                >
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BlogsPage;
