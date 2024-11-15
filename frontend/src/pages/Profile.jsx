import React, { useContext, useEffect, useState } from "react";
import { DevContext } from "../context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faClipboard, faEnvelope, faLaptopCode, faPeopleGroup, faCode, faNetworkWired } from '@fortawesome/free-solid-svg-icons'
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
            <div className="bg-gray-100 min-h-screen px-36 py-16 flex flex-col gap-4 justify-center items-center">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
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

                <div className="px-6 py-4 w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col gap-10">
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

                {/* Employment History Section */}
                <div className="px-6 py-4 border-t border-gray-200 w-full max-w-2xl bg-white rounded-lg shadow-lg">
                    <h3 className="text-gray-700 font-semibold">Employment history</h3>
                    <div className="mt-2">
                        <p className="font-semibold">Product Designer</p>
                        <p className="text-gray-600">Instagram - Full-time</p>
                        <p className="text-gray-500 text-sm">June 2020 - Present · 2 years</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile