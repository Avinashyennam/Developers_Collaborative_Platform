import React, { useContext, useEffect, useState } from "react";
import { DevContext } from "../context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { faBuilding, faEnvelope } from '@fortawesome/free-regular-svg-icons'
const Profile = () => {

    const { user } = useContext(DevContext);
    // console.log(user);

    const [matchesCount, setMatchesCount] = useState(0);
    const [connectionsCount, setConnectionsCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);

    useEffect(() => {
        function count() {
            if (user) {
                setMatchesCount(user.matches.length);
                setConnectionsCount(user.connections.length);
                setPendingCount(user.pendingConnections.length);
            }
        }
        count();
    }, [user]);

    if (!user || !user.profilePicture) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <div className="bg-gray-100 min-h-screen px-36 py-16 flex  gap-4 justify-center">
                <div className="w-3/5">
                    <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg">
                        {/* Top Colored Section */}
                        <div className="bg-gradient-to-r from-yellow-300 to-pink-300 h-28 rounded-t-lg relative">
                            {/* Profile Picture */}
                            <div className="absolute left-24 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                                <img
                                    // src="/Kat Graham.jpeg" // replace with actual image URL
                                    src={user.profilePicture}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
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
                            {/* <p className="text-gray-600">Lead product designer at Google</p>
                        <p className="text-gray-500 text-sm">{user.email} · Full-time</p> */}
                            <ul>
                                <li>matches: {matchesCount}</li>
                                <li>connections: {connectionsCount}</li>
                                <li>pending connections: {pendingCount}</li>
                            </ul>
                            <div className="mt-4 flex justify-center gap-4">
                                {/* <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Message</button> */}
                                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Share profile</button>
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}

                    <div className="px-6 py-4 w-full max-w-3xl bg-white rounded-lg shadow-lg flex flex-col gap-10">
                        <div>
                            <h3 className="text-gray-700 font-semibold">Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {
                                    user.skills.map((skill) => (
                                        <span key={skill.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {skill}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-700 font-semibold">Interests</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {
                                    user.interests.map((interest) => (
                                        <span key={interest.id} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                                            {interest}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-10 py-6 border-t border-gray-200 w-full max-w-md bg-white rounded-lg shadow-lg">
                    <h3 className="flex flex-col gap-1 text-gray-800 font-bold text-xl border-b pb-3 mb-4">Projects</h3>
                    {user.projects.length > 0 ? (
                        user.projects.map((project, index) => (
                            <div key={index} className="mb-6 shadow-inner p-2">
                                <h4 className="text-lg font-semibold text-blue-600">{project.title}</h4>
                                <p className="text-gray-700">{project.description}</p>
                                {/* <div className="text-sm text-gray-500 mt-1">
                                    <span>Tech Stack: </span>
                                    <span className="text-gray-700 font-medium">{project.techStack.join(', ')}</span>
                                </div> */}
                                {project.githubLink && (
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 mt-2 inline-block flex gap-2 items-center"
                                    >
                                        <span className="hover:underline">View Project</span>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm"/>
                                    </a>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No projects to display.</p>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Profile;