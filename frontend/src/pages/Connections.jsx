import React, { useState, useContext, useEffect } from 'react';
import { DevContext } from '../context/Context';
const Connections = () => {

    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useContext(DevContext);

    useEffect(() => {
        const fetchConnections = async () => {
            if (!id) {
                console.log("User ID is not set yet.");
                return; // Exit if id is null
            }
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/connections/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                console.log(data);
                setConnections(data);
                console.log(connections);
            } catch (error) {
                console.log("failed to fetch users..");
            } finally {
                setLoading(false);
            }
        }
        fetchConnections();
    }, [id]);

    // if (loading) return <p>Loading matches...</p>;
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                {/* <h1>loading...</h1> */}
            </div>
        )
    }
    return (
        <div className='mx-8 my-10 flex flex-col gap-8'>
            <div className='gap-6 flex flex-col items-center'>
                <h1 className='text-4xl'>"🎉 You've Got Connections! Explore Your Network!"</h1>
                {/* <p className='text-xl'>Explore developers who share your skills, interests, and experience level. Connect, collaborate, and turn ideas into reality with partners perfectly matched to you.</p> */}
            </div>

            <div className='flex flex-col items-center gap-10'>
                <h2 className='text-2xl'>Your Connections</h2>
                <ul className='flex gap-2'>
                    {
                        connections.map((match) => (
                            <li key={match._id}>
                                <div className="flex flex-col items-center w-80" >
                                    <div className="w-full h-72 overflow-hidden">
                                        <img
                                            src={match.profilePicture}
                                            alt="not"
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                    <div className="flex flex-col items-center bg-white w-5/6 p-3 rounded-lg -mt-12 shadow-2xl">
                                        <div className="text-2xl font-semibold">{match.name}</div>
                                        <div className="font-medium text-light-gray my-3">{match.email}</div>
                                        <ul className="flex flex-wrap gap-2 max-h-20 overflow-y-auto w-full justify-center">
                                            {match.skills.map((skill, index) => (
                                                <li key={index} className="bg-light-gray text-black px-2 py-1 rounded-full">
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Connections;