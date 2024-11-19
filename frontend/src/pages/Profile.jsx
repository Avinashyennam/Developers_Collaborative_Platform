import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { DevContext } from "../context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBuilding, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(DevContext);
    const [showModal, setShowModal] = useState(false);
    const [imageModal, setImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        githubLink: ""
    });

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
                // const newProject = await response.json();
                // console.log("Project added:", newProject);
                // // Optionally update the UI or fetch updated project list
                // user.projects.push(newProject); // Temporary update
                // setProjectData({ title: "", description: "", githubLink: "" }); // Reset form

                toast.success('Project added successfully!', { position: 'top-center' });
                setProjectData({ title: '', description: '', githubLink: '' });
                const data = await response.json();
                setUser({ ...user, projects: data.projects });
                setShowModal(false);
            } else {
                // console.error("Failed to add project");
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
                console.log("after deleting acc",user);                
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

    const deleteProject = async(projectId)=>{
        try {
            const id = user._id;
            const response = await fetch(`http://localhost:5000/api/users/${id}/deleteproject/${projectId}`,{
                method: "DELETE"
            });
            if(response.ok){
                const data = await response.json();
                setUser({...user, projects: data.updatedProjects});
                toast.success('Project deleted successfully!', { position: 'top-center' });
            }
            else{
                const errorData = await response.json();
                toast.error(`Error: ${errorData.message}`, { position: 'top-center' });
            }
        } catch (error) {
            console.error("error while deleting project", error);
        }
    }

    // console.log(user);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <div className="bg-gray-100 min-h-screen px-36 py-16 flex  gap-4 justify-center">
                <div className="w-3/5 flex flex-col gap-2">
                    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
                        {/* Top Colored Section */}
                        <div className="bg-gradient-to-r from-yellow-300 to-pink-300 h-28 rounded-t-lg relative">
                            {/* Profile Picture */}
                            <div className="absolute left-24 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                {
                                    user.profilePicture ?
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        /> :
                                        <div
                                            className='flex items-center justify-center w-full h-full rounded-full bg-gray-200 text-black text-xl font-bold border border-gray-200'
                                            onClick={() => setOpen(!open)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {(user?.name?.[0]?.toUpperCase() || '?')}
                                        </div>
                                }
                            </div>
                        </div>

                        {/* User Information */}
                        <div className="pt-14 pb-6 ml-10">
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            {user.bio ?
                                <p>{user.bio}</p> :
                                <p>Passionate Software Developer</p>
                            }
                            <h3>Experience level: {user.experienceLevel}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600 flex gap-1 items-center">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>{user.email}</span>
                                </span>
                                <span> </span>
                                <span className="flex gap-1 items-center">
                                    <FontAwesomeIcon icon={faBuilding} className="text-gray-600" />
                                    <span>Lead product designer at Google</span>
                                </span>
                                <span> </span>
                                <span className="text-gray-500">Full-time</span>
                            </div>
                            <ul>
                                <li>matches: {user.matches.length}</li>
                                <li>connections: {user.connections.length}</li>
                                <li>pending connections: {user.pendingConnections.length}</li>
                            </ul>
                            <div className="mt-4 flex justify-center gap-4">
                                <button onClick={() => setImageModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Picture</button>
                                <button onClick={deleteAccount} className="bg-rose-600 text-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Delete account</button>
                            </div>

                        </div>
                    </div>

                    {/* Skills Section */}

                    <div className="px-6 py-4 w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col gap-10">
                        <div>
                            <h3 className="text-gray-700 font-semibold">Skills</h3>
                            {user.skills.length == 0 ?
                                <div>
                                    <Link to="/updateprofile">
                                        <span className="text-blue-600">Click here to add skills</span>
                                    </Link>
                                </div> :
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {
                                        user.skills.map((skill) => (
                                            <span key={skill.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {skill}
                                            </span>
                                        ))
                                    }
                                </div>
                            }

                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold">Interests</h3>
                            {
                                user.interests.length == 0 ?
                                    <div>
                                        <Link to="/updateprofile">
                                            <span className="text-blue-600">Click here to add interests</span>
                                        </Link>
                                    </div> :
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {
                                            user.interests.map((interest) => (
                                                <span key={interest.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                    {interest}
                                                </span>
                                            ))
                                        }
                                    </div>
                            }

                        </div>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="px-10 py-6 border-t border-gray-200 w-full max-w-md bg-white rounded-lg shadow-lg">
                    <h3 className="flex flex-col gap-1 text-gray-800 font-bold text-xl border-b pb-3 mb-4">Projects</h3>
                    {user.projects.length > 0 ? (
                        user.projects.map((project, index) => (

                            <div key={index} className="mb-6 shadow-inner p-2 flex justify-between">
                                <div>
                                    <div className="flex gap-2">
                                        <h4 className="text-lg font-semibold text-blue-600">{project.title}</h4>
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 flex items-center"
                                            >
                                                {/* <span className="hover:underline">View Project</span> */}
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm"/>
                                            </a>
                                        )}
                                    </div>

                                    <p className="text-gray-700">{project.description}</p>
                                </div>
                                {/* <div className="text-sm text-gray-500 mt-1">
                                    <span>Tech Stack: </span>
                                    <span className="text-gray-700 font-medium">{project.techStack.join(', ')}</span>
                                </div> */}
                                {/* {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 mt-2 inline-block flex gap-2 items-center"
                                    >
                                        <span className="hover:underline">View Project</span>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
                                    </a>
                                )} */}
                                <FontAwesomeIcon icon={faTrash} size="md" className="text-red-600 mr-2 mt-2 cursor-pointer"  onClick={()=> deleteProject(project._id)}/>
                                
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No projects to display.</p>
                    )}

                    <button onClick={() => setShowModal(true)} className="border p-2 border-gray-500 rounded-lg hover:bg-gray-100">Add more </button>
                </div>
                {/* <ToastContainer /> */}
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
            )};

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

        </div>
    );
};

export default Profile;