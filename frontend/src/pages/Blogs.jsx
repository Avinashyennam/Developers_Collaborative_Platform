// // src/pages/BlogsPage.js
// import React, { useState, useEffect, useContext } from "react";
// import { motion } from "framer-motion";
// // import { Dev } from "../context/BlogContext";
// import { DevContext } from "../context/Context";
// import { faThumbsUp, faComment, faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const BlogsPage = () => {
//     const { blogs, fetchBlogs, user } = useContext(DevContext); // Using Context API to get blogs
//     const [newComment, setNewComment] = useState("");

//     useEffect(() => {
//         fetchBlogs(); // Fetch blogs when the page loads
//     }, [fetchBlogs]);

//     // Handle adding a comment
//     const handleCommentChange = (e) => {
//         setNewComment(e.target.value);
//     };

//     const handleAddLike = async (id) => {
//         // console.log(user);
//         // console.log(sessionStorage.getItem("token"));
//         if (!sessionStorage.getItem("token")) {
//             alert("Login first to like the post");
//         }
//         else {
//             try {
//                 const userId = user?._id;
//                 const response = await fetch(`http://localhost:5000/api/users/blogs/${id}/like`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body: JSON.stringify({ userId }),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     console.error('Error liking/unliking blog:', errorData.error);
//                     alert(errorData.error); // Optional: Display an error to the user
//                     return;
//                 }

//                 const data = await response.json();
//                 console.log(data.message); // Log success message
//                 return data.likes; // Return the updated number of likes
//             } catch (error) {
//                 console.error('Error:', error);
//                 alert('Something went wrong. Please try again later.');
//             }
//         }
//     }

//     const handleAddComment = async(id) => {
//         if(!sessionStorage.getItem("token")){
//             alert("Login first to comment on a post!");
//             setNewComment("")
//         }
//         else{
//             try {
//                 const comment = newComment
//                 const userId = user?._id;
//                 const response = await fetch(`http://localhost:5000/api/users/blogs/${id}/comment`, {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify({ userId, comment }),
//                 });
            
//                 if (!response.ok) {
//                   const errorData = await response.json();
//                   console.error('Error adding comment:', errorData.error);
//                   alert(errorData.error); // Optional: Display an error to the user
//                   return;
//                 }
            
//                 const data = await response.json();
//                 console.log('Comment added successfully:', data);
//                 toast.success('Comment added successfully!', { position: 'top-right' });
//                 setNewComment("");
//                 return data.comments; // Return updated comments array
//               } catch (error) {
//                 console.error('Error:', error);
//                 alert('Something went wrong. Please try again later.');
//               }
//         }
//         // Call an API to add the comment (this part needs backend integration)
//         // console.log(`Comment added to blog: ${blogId}`);
//     };

//     return (
//         <div className="max-w-7xl mx-auto py-12 px-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {blogs.map((blog) => (
//                     <motion.div
//                         key={blog._id}
//                         className="bg-white shadow-lg rounded-lg overflow-hidden"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ duration: 0.5 }}
//                     >
//                         <div className="p-4">
//                             <div className="flex items-center space-x-3 mb-4">
//                                 <div className="w-12 h-12 rounded-full overflow-hidden">
//                                     {blog.authorDetails.profilePicture ? (
//                                         <img
//                                             src={blog.authorDetails.profilePicture}
//                                             alt="Author"
//                                             className="w-full h-full object-cover"
//                                         />
//                                     ) : (
//                                         // <FaUserCircle className="w-full h-full text-gray-400" />
//                                         // <FontAwesomeIcon icon={faUser}
//                                         <FontAwesomeIcon icon={faUserCircle} />
//                                     )}
//                                 </div>
//                                 <div>
//                                     <h3 className="font-semibold text-lg">{blog.authorDetails.name}</h3>
//                                 </div>
//                             </div>
//                             <h2 className="text-2xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
//                             <p className="text-gray-700 mb-4">
//                                 {blog.content.slice(0, 150)}...
//                             </p>

//                             {/* Blog Images */}
//                             <div className="space-y-2">
//                                 {blog.photos?.map((photo, idx) => (
//                                     <img
//                                         key={idx}
//                                         src={photo.url}
//                                         alt={photo.caption}
//                                         className="w-full h-64 object-cover rounded-lg"
//                                     />
//                                 ))}
//                             </div>

//                             {/* Blog Actions */}
//                             <div className="mt-4 flex items-center justify-between">
//                                 <div className="flex space-x-4">
//                                     <button className="flex items-center text-gray-600 hover:text-blue-600"
//                                         onClick={() => handleAddLike(blog._id)}
//                                     >
//                                         {/* <FaThumbsUp className="mr-1" /> {blog.likes.length} Likes
//                                          */}
//                                         <FontAwesomeIcon icon={faThumbsUp} />
//                                     </button>
//                                     <button
//                                         className="flex items-center text-gray-600 hover:text-blue-600"
//                                         // onClick={() => handleAddComment(blog._id)}
//                                     >
//                                         {/* <FaComment className="mr-1" /> {blog.comments.length} Comments */}
//                                         <FontAwesomeIcon icon={faComment} />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Add Comment */}
//                             <div className="mt-4">
//                                 <textarea
//                                     value={newComment}
//                                     onChange={handleCommentChange}
//                                     placeholder="Add a comment..."
//                                     className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                                 <button
//                                     className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//                                     onClick={() => handleAddComment(blog._id)}
//                                 >
//                                     Post Comment
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BlogsPage;

import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DevContext } from "../context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faThumbsUp, 
  faComment, 
  faUserCircle,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogsPage = () => {
  const { blogs, fetchBlogs, user } = useContext(DevContext);
  const [newComment, setNewComment] = useState("");
  const [likedPosts, setLikedPosts] = useState({});

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddLike = async (id) => {
    if (!sessionStorage.getItem("token")) {
      toast.error("Please login first to like the post", {
        position: "top-right",
        theme: "colored"
      });
      return;
    }

    try {
      const userId = user?._id;
      const response = await fetch(`http://localhost:5000/api/users/blogs/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error, {
          position: "top-right",
          theme: "colored"
        });
        return;
      }

      const data = await response.json();
      setLikedPosts(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      toast.success("liked", {position: "top-right"});
      return data.likes;
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        position: "top-right",
        theme: "colored"
      });
    }
  };

  const handleAddComment = async(id) => {
    if(!sessionStorage.getItem("token")){
      toast.error("Please login first to comment", {
        position: "top-right",
        theme: "colored"
      });
      setNewComment("");
      return;
    }

    try {
      const comment = newComment;
      const userId = user?._id;
      const response = await fetch(`http://localhost:5000/api/users/blogs/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, comment }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error, {
          position: "top-right",
          theme: "colored"
        });
        return;
      }

      const data = await response.json();
      toast.success('Comment added successfully!', {
        position: "top-right",
        theme: "colored"
      });
      setNewComment("");
      return data.comments;
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        position: "top-right",
        theme: "colored"
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              variants={cardVariants}
              layout
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-6">
                <motion.div 
                  className="flex items-center space-x-4 mb-6"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                    {blog.authorDetails.profilePicture ? (
                      <img
                        src={blog.authorDetails.profilePicture}
                        alt="Author"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FontAwesomeIcon 
                        icon={faUserCircle} 
                        className="w-full h-full text-gray-400"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold  text-gray-800">
                      {blog.authorDetails.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>

                <motion.h2 
                  className="text-xl font-semibold text-gray-900 mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {blog.title}
                </motion.h2>

                <motion.p 
                  className="text-gray-600 mb-6 line-clamp-3 text-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {blog.content.slice(0, 150)}...
                </motion.p>

                <motion.div 
                  className="space-y-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {blog.photos?.map((photo, idx) => (
                    <motion.img
                      key={idx}
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-60 object-cover rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
                </motion.div>

                {/* <div className="mt-6 flex items-center justify-between">
                  <div className="flex space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2"
                      onClick={() => handleAddLike(blog._id)}
                    >
                      <FontAwesomeIcon 
                        icon={faThumbsUp} 
                        className={`text-xl ${likedPosts[blog._id] ? 'text-blue-500' : 'text-gray-500'}`}
                      />
                      <span className="text-gray-600">{blog.likes?.length || 0}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2"
                    >
                      <FontAwesomeIcon 
                        icon={faComment} 
                        className="text-xl text-gray-500"
                      />
                      <span className="text-gray-600">{blog.comments?.length || 0}</span>
                    </motion.button>
                  </div>
                </div> */}

                {/* <motion.div 
                  className="mt-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex space-x-2">
                    <textarea
                      value={newComment}
                      onChange={handleCommentChange}
                      placeholder="Add a comment..."
                      className="flex-1 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => handleAddComment(blog._id)}
                    >
                      <FontAwesomeIcon icon={faPaperPlane} />
                    </motion.button>
                  </div>
                </motion.div> */}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default BlogsPage;