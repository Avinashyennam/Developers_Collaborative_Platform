// import React, { useContext, useEffect, useState } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import { DevContext } from "../context/Context";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowUpRightFromSquare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { faBuilding, faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Profile = () => {
//     const navigate = useNavigate();

//     const { user, setUser } = useContext(DevContext);
//     const [showModal, setShowModal] = useState(false);
//     const [imageModal, setImageModal] = useState(false);
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [projectData, setProjectData] = useState({
//         title: "",
//         description: "",
//         githubLink: ""
//     });

//     const handleAddProject = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/api/users/addproject", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     token: sessionStorage.getItem("token")
//                 },
//                 body: JSON.stringify({
//                     // userId: user.id, // Add user ID if required
//                     ...projectData
//                 }),
//             });

//             if (response.ok) {
//                 // const newProject = await response.json();
//                 // console.log("Project added:", newProject);
//                 // // Optionally update the UI or fetch updated project list
//                 // user.projects.push(newProject); // Temporary update
//                 // setProjectData({ title: "", description: "", githubLink: "" }); // Reset form

//                 toast.success('Project added successfully!', { position: 'top-center' });
//                 setProjectData({ title: '', description: '', githubLink: '' });
//                 const data = await response.json();
//                 setUser({ ...user, projects: data.projects });
//                 setShowModal(false);
//             } else {
//                 // console.error("Failed to add project");
//                 const errorData = await response.json();
//                 toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
//             }
//         } catch (error) {
//             toast.error('Failed to add project. Please try again later.', { position: 'top-center' });
//         }
//     };

//     const deleteAccount = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:5000/api/users/deleteaccount", {
//                 method: "DELETE",
//                 headers: {
//                     token: sessionStorage.getItem("token")
//                 }
//             });
//             if (response.ok) {
//                 sessionStorage.clear();
//                 setUser(null);
//                 console.log("after deleting acc",user);                
//                 navigate('/', { replace: true });
//                 // window.location.reload();
//             }
//         } catch (error) {
//             console.error("error is", error);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         e.preventDefault();

//         if (!selectedImage) {
//             toast.error('Please select an image to upload.', { position: 'top-center' });
//             return;
//         }

//         const formData = new FormData();
//         formData.append("image", selectedImage);

//         try {
//             const response = await fetch(`http://localhost:5000/upload/${user._id}`, {
//                 method: "POST",
//                 headers: {
//                     token: sessionStorage.getItem("token"),
//                 },
//                 body: formData,
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 toast.success('Profile picture updated successfully!', { position: 'top-center' });

//                 // Update the user profile picture in context
//                 console.log(data);
//                 setUser({ ...user, profilePicture: data.profilePicture });
//                 setImageModal(false);
//             } else {
//                 const errorData = await response.json();
//                 toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
//             }
//         } catch (error) {
//             toast.error('Failed to upload image. Please try again later.', { position: 'top-center' });
//         }
//     };

//     const deleteProject = async(projectId)=>{
//         try {
//             const id = user._id;
//             const response = await fetch(`http://localhost:5000/api/users/${id}/deleteproject/${projectId}`,{
//                 method: "DELETE"
//             });
//             if(response.ok){
//                 const data = await response.json();
//                 setUser({...user, projects: data.updatedProjects});
//                 toast.success('Project deleted successfully!', { position: 'top-center' });
//             }
//             else{
//                 const errorData = await response.json();
//                 toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
//             }
//         } catch (error) {
//             console.error("error while deleting project", error);
//         }
//     }

//     // console.log(user);

//     if (!user) {
//         return <p>Loading profile...</p>;
//     }

//     return (
//         <div>
//             <div className="bg-gray-100 min-h-screen px-36 py-16 flex  gap-4 justify-center">
//                 <div className="w-3/5 flex flex-col gap-2">
//                     <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
//                         {/* Top Colored Section */}
//                         <div className="bg-gradient-to-r from-yellow-300 to-pink-300 h-28 rounded-t-lg relative">
//                             {/* Profile Picture */}
//                             <div className="absolute left-24 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
//                                 {
//                                     user.profilePicture ?
//                                         <img
//                                             src={user.profilePicture}
//                                             alt="Profile"
//                                             className="w-full h-full object-cover"
//                                         /> :
//                                         <div
//                                             className='flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-black text-xl font-bold border border-gray-200'
//                                             onClick={() => setOpen(!open)}
//                                             style={{ cursor: 'pointer' }}
//                                         >
//                                             {(user?.name?.[0]?.toUpperCase() || '?')}
//                                         </div>
//                                 }
//                             </div>
//                         </div>

//                         {/* User Information */}
//                         <div className="pt-14 pb-6 ml-10">
//                             <h2 className="text-xl font-semibold">{user.name}</h2>
//                             {user.bio ?
//                                 <p>{user.bio}</p> :
//                                 <p>Passionate Software Developer</p>
//                             }
//                             <h3>Experience level: {user.experienceLevel}</h3>
//                             <div className="flex items-center gap-2">
//                                 <span className="text-gray-600 flex gap-1 items-center">
//                                     <FontAwesomeIcon icon={faEnvelope} />
//                                     <span>{user.email}</span>
//                                 </span>
//                                 <span> </span>
//                                 <span className="flex gap-1 items-center">
//                                     <FontAwesomeIcon icon={faBuilding} className="text-gray-600" />
//                                     <span>Lead product designer at Google</span>
//                                 </span>
//                                 <span> </span>
//                                 <span className="text-gray-500">Full-time</span>
//                             </div>
//                             <ul>
//                                 <li>matches: {user.matches.length}</li>
//                                 <li>connections: {user.connections.length}</li>
//                                 <li>pending connections: {user.pendingConnections.length}</li>
//                             </ul>
//                             <div className="mt-4 flex justify-center gap-4">
//                                 <button onClick={() => setImageModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Picture</button>
//                                 <button onClick={deleteAccount} className="bg-rose-600 text-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Delete account</button>
//                             </div>

//                         </div>
//                     </div>

//                     {/* Skills Section */}

//                     <div className="px-6 py-4 w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col gap-10">
//                         <div>
//                             <h3 className="text-gray-700 font-semibold">Skills</h3>
//                             {user.skills.length == 0 ?
//                                 <div>
//                                     <Link to="/updateprofile">
//                                         <span className="text-blue-600">Click here to add skills</span>
//                                     </Link>
//                                 </div> :
//                                 <div className="flex flex-wrap gap-2 mt-2">
//                                     {
//                                         user.skills.map((skill) => (
//                                             <span key={skill.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                                                 {skill}
//                                             </span>
//                                         ))
//                                     }
//                                 </div>
//                             }

//                         </div>
//                         <div>
//                             <h3 className="text-gray-700 font-semibold">Interests</h3>
//                             {
//                                 user.interests.length == 0 ?
//                                     <div>
//                                         <Link to="/updateprofile">
//                                             <span className="text-blue-600">Click here to add interests</span>
//                                         </Link>
//                                     </div> :
//                                     <div className="flex flex-wrap gap-2 mt-2">
//                                         {
//                                             user.interests.map((interest) => (
//                                                 <span key={interest.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
//                                                     {interest}
//                                                 </span>
//                                             ))
//                                         }
//                                     </div>
//                             }

//                         </div>
//                     </div>
//                 </div>

//                 {/* Projects Section */}
//                 <div className="px-10 py-6 border-t border-gray-200 w-full max-w-md bg-white rounded-lg shadow-lg">
//                     <h3 className="flex flex-col gap-1 text-gray-800 font-bold text-xl border-b pb-3 mb-4">Projects</h3>
//                     {user.projects.length > 0 ? (
//                         user.projects.map((project, index) => (

//                             <div key={index} className="mb-6 shadow-inner p-2 flex justify-between">
//                                 <div>
//                                     <div className="flex gap-2">
//                                         <h4 className="text-lg font-semibold text-blue-600">{project.title}</h4>
//                                         {project.githubLink && (
//                                             <a
//                                                 href={project.githubLink}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="text-blue-500 flex items-center"
//                                             >
//                                                 {/* <span className="hover:underline">View Project</span> */}
//                                                 <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm"/>
//                                             </a>
//                                         )}
//                                     </div>

//                                     <p className="text-gray-700">{project.description}</p>
//                                 </div>
//                                 {/* <div className="text-sm text-gray-500 mt-1">
//                                     <span>Tech Stack: </span>
//                                     <span className="text-gray-700 font-medium">{project.techStack.join(', ')}</span>
//                                 </div> */}
//                                 {/* {project.githubLink && (
//                                     <a
//                                         href={project.githubLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="text-blue-500 mt-2 inline-block flex gap-2 items-center"
//                                     >
//                                         <span className="hover:underline">View Project</span>
//                                         <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
//                                     </a>
//                                 )} */}
//                                 <FontAwesomeIcon icon={faTrash} size="md" className="text-red-600 mr-2 mt-2 cursor-pointer"  onClick={()=> deleteProject(project._id)}/>

//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No projects to display.</p>
//                     )}

//                     <button onClick={() => setShowModal(true)} className="border p-2 border-gray-500 rounded-lg hover:bg-gray-100">Add more </button>
//                 </div>
//                 {/* <ToastContainer /> */}
//             </div>

//             {/* Modal for Adding Project */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-xl font-semibold">Add Project</h3>
//                             <FontAwesomeIcon
//                                 icon={faTimes}
//                                 className="cursor-pointer"
//                                 onClick={() => setShowModal(false)}
//                             />
//                         </div>
//                         <form onSubmit={handleAddProject}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Title</label>
//                                 <input
//                                     type="text"
//                                     value={projectData.title}
//                                     onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">Description</label>
//                                 <textarea
//                                     value={projectData.description}
//                                     onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
//                                 <input
//                                     type="url"
//                                     value={projectData.githubLink}
//                                     onChange={(e) => setProjectData({ ...projectData, githubLink: e.target.value })}
//                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowModal(false)}
//                                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//                                     Add Project
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )};

//             {/* Modal for Image Upload */}
//             {imageModal && (
//                 <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//                         <div className="flex justify-between items-center mb-4">
//                             <h3 className="text-xl font-semibold">Upload Profile Picture</h3>
//                             <button
//                                 className="text-gray-600"
//                                 onClick={() => setImageModal(false)}
//                             >
//                                 ✖
//                             </button>
//                         </div>
//                         <form onSubmit={handleImageUpload}>
//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium text-gray-700">
//                                     Select an Image
//                                 </label>
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={(e) => setSelectedImage(e.target.files[0])}
//                                     className="mt-1 block w-full"
//                                     required
//                                 />
//                             </div>
//                             <div className="flex justify-end gap-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => setImageModal(false)}
//                                     className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
//                                     Upload
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />

//         </div>
//     );
// };

// export default Profile;

import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { DevContext } from "../context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faBuilding,
    faTimes,
    faTrash,
    faPlus,
    faImage,
    faExternalLinkAlt,
    faBook, faNewspaper
} from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    // const navigate = useNavigate();
    const { user, setUser } = useContext(DevContext);
    const [showModal, setShowModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        githubLink: ""
    });

    useEffect(async () => {
        try {
            // console.log(user);
            // const userId = user._id;

            const response = await fetch(`http://localhost:5000/api/users/blogs`, {
                headers: {
                    token: sessionStorage.getItem("token")
                }
            })
            if (response.ok) {
                const data = await response.json();
                // setUser(...user,{
                //     blogs: data.data
                // });
                // console.log(user.blogs);
                console.log(data);
                setBlogs(data.data);
            }
            else {
                // Handle non-ok response
                console.error('Failed to fetch blogs');
            }
        } catch (error) {
            console.error(error.message);
        }
    }, [localStorage.getItem("token")]);

    // In your services or utils folder, create a blogService.js or blogApi.js
    // const fetchUserBlogs = async (userId) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/api/user/${userId}/blogs`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'token': sessionStorage.getItem('token')
    //             }
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to fetch user blogs');
    //         }

    //         const data = await response.json();
    //         return data.data; // Returns the array of blogs
    //     } catch (error) {
    //         console.error('Error fetching user blogs:', error);
    //         throw error;
    //     }
    // };

    // // In your Profile component, modify the useEffect to fetch blogs
    // useEffect(() => {
    //     const getUserBlogs = async () => {
    //         try {
    //             if (user && user._id) {
    //                 const blogs = await fetchUserBlogs(user._id);
    //                 setUser(prevUser => ({
    //                     ...prevUser,
    //                     blogs: blogs
    //                 }));
    //             }
    //         } catch (error) {
    //             toast.error('Failed to load blogs', { position: 'top-center' });
    //         }
    //     };

    //     getUserBlogs();
    // }, []);

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/addproject", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    token: sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                    // userId: user.id, // Add user ID if required
                    ...projectData
                }),
            });

            if (response.ok) {
                toast.success('Project added successfully!', { position: 'top-center' });
                setProjectData({ title: '', description: '', githubLink: '' });
                const data = await response.json();
                setUser({ ...user, projects: data.projects });
                setShowModal(false);
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
            }
        } catch (error) {
            toast.error('Failed to add project. Please try again later.', { position: 'top-center' });
        }
    };

    const deleteAccount = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/deleteaccount", {
                method: "DELETE",
                headers: {
                    token: sessionStorage.getItem("token")
                }
            });
            if (response.ok) {
                sessionStorage.clear();
                setUser(null);
                console.log("after deleting acc", user);
                navigate('/', { replace: true });
                // window.location.reload();
            }
        } catch (error) {
            console.error("error is", error);
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            toast.error('Please select an image to upload.', { position: 'top-center' });
            return;
        }

        const formData = new FormData();
        formData.append("image", selectedImage);

        try {
            const response = await fetch(`http://localhost:5000/upload/${user._id}`, {
                method: "POST",
                headers: {
                    token: sessionStorage.getItem("token"),
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Profile picture updated successfully!', { position: 'top-center' });

                // Update the user profile picture in context
                console.log(data);
                setUser({ ...user, profilePicture: data.profilePicture });
                setImageModal(false);
            } else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
            }
        } catch (error) {
            toast.error('Failed to upload image. Please try again later.', { position: 'top-center' });
        }
    };

    const deleteProject = async (projectId) => {
        try {
            const id = user._id;
            const response = await fetch(`http://localhost:5000/api/users/${id}/deleteproject/${projectId}`, {
                method: "DELETE"
            });
            if (response.ok) {
                const data = await response.json();
                setUser({ ...user, projects: data.updatedProjects });
                toast.success('Project deleted successfully!', { position: 'top-center' });
            }
            else {
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
            }
        } catch (error) {
            console.error("error while deleting project", error);
        }
    }

    if (!user) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center items-center min-h-screen"
            >
                <motion.p
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-2xl text-gray-600"
                >
                    Loading profile...
                </motion.p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-2 bg-white shadow-xl rounded-2xl overflow-hidden"
                >
                    {/* Gradient Header */}
                    <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full border-4 border-white shadow-lg"
                        >
                            {user.profilePicture ? (
                                <img
                                    src={user.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-3xl font-bold text-gray-700 rounded-full">
                                    {user.name[0].toUpperCase()}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* User Details */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="pt-16 px-6 pb-6 text-center"
                    >
                        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                        <p className="text-gray-600 mt-2">{user.bio || "Passionate Software Developer"}</p>

                        <div className="mt-4 flex flex-wrap justify-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setImageModal(true)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faImage} className="mr-2" /> Update Picture
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={deleteAccount}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete Account
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Skills & Interests Card */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white shadow-xl rounded-2xl p-6"
                >
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.skills.length > 0 ? (
                                user.skills.map((skill) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {skill}
                                    </motion.span>
                                ))
                            ) : (
                                <Link to="/updateprofile" className="text-blue-600 hover:underline">
                                    Add Skills
                                </Link>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {user.interests.length > 0 ? (
                                user.interests.map((interest) => (
                                    <motion.span
                                        key={interest}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {interest}
                                    </motion.span>
                                ))
                            ) : (
                                <Link to="/updateprofile" className="text-blue-600 hover:underline">
                                    Add Interests
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Projects Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="md:col-span-3 bg-white shadow-xl rounded-2xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowModal(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Project
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {user.projects.length > 0 ? (
                            user.projects.map((project) => (
                                <motion.div
                                    key={project._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-gray-50 rounded-lg p-4 mb-4 flex justify-between items-center hover:bg-gray-100 transition"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
                                            {project.githubLink && (
                                                <motion.a
                                                    whileHover={{ scale: 1.2 }}
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-600"
                                                >
                                                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                                                </motion.a>
                                            )}
                                        </div>
                                        <p className="text-gray-600 mt-1">{project.description}</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => deleteProject(project._id)}
                                        className="text-red-500"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </motion.button>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">No projects to display</p>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Blogs Section */}
                {/* <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="md:col-span-3 bg-white shadow-xl rounded-2xl p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">
                            <FontAwesomeIcon icon={faBook} className="mr-3" />
                            Blogs
                        </h3>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/create-blog')} // Adjust the route as needed
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faNewspaper} className="mr-2" /> Write Blog
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {user.blogs && user.blogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {user.blogs.map((blog, index) => (
                                    <motion.div
                                        key={blog._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <Link to={`/blog/${blog._id}`}>
                                            {blog.photos && blog.photos.length > 0 ? (
                                                <div className="h-48 overflow-hidden">
                                                    <img
                                                        src={blog.photos[0].url}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={faNewspaper}
                                                        className="text-white text-4xl"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h4 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                                                    {blog.title}
                                                </h4>
                                                <motion.div
                                                    className="mt-2 flex items-center text-gray-600 text-sm"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                                    {new Date(blog.createdAt).toLocaleDateString()}
                                                </motion.div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-gray-500 text-center py-8"
                            >
                                <FontAwesomeIcon icon={faNewspaper} className="text-4xl mb-3" />
                                <p>No blogs published yet</p>
                                <Link
                                    to="/create-blog"
                                    className="text-indigo-500 hover:text-indigo-600 font-medium mt-2 inline-block"
                                >
                                    Write your first blog
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div> */}
                <div>
                    {blogs.length > 0 ?
                        <ul>
                            {blogs.map((blog)=>(
                                <li key={blog._id}>
                                    <h1>{blog.title}</h1>
                                </li>
                            ))}
                        </ul> :
                        <div></div>
                    }
                </div>

            </div>

            {/* Modal for Adding Project */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Add Project</h3>
                            <FontAwesomeIcon
                                icon={faTimes}
                                className="cursor-pointer"
                                onClick={() => setShowModal(false)}
                            />
                        </div>
                        <form onSubmit={handleAddProject}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={projectData.title}
                                    onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    value={projectData.description}
                                    onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">GitHub Link</label>
                                <input
                                    type="url"
                                    value={projectData.githubLink}
                                    onChange={(e) => setProjectData({ ...projectData, githubLink: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                    Add Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for Image Upload */}
            {imageModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Upload Profile Picture</h3>
                            <button
                                className="text-gray-600"
                                onClick={() => setImageModal(false)}
                            >
                                ✖
                            </button>
                        </div>
                        <form onSubmit={handleImageUpload}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Select an Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setSelectedImage(e.target.files[0])}
                                    className="mt-1 block w-full"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setImageModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer />
        </motion.div>
    );
};

export default Profile;