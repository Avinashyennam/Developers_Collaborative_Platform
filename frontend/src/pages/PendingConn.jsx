import React, { useState, useEffect, useContext } from 'react';
import { DevContext } from '../context/Context';
// import connectUser from '../components/connectUser'
import AcceptUser from '../components/Accept';
import RejectUser from '../components/Reject';
const PendingConnections = () => {
    const [pendingConn, setPendingConn] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useContext(DevContext);

    useEffect(() => {
        const fetchPendingConn = async () => {
            if (!id) {
                console.log("User ID is not set yet.");
                return; // Exit if id is null
            }
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/pendingrequests/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                // console.log(data);
                setPendingConn(data);
                // console.log(connections);
            } catch (error) {
                console.log("failed to fetch users..");
            } finally {
                setLoading(false);
            }
        }
        fetchPendingConn();
    }, [id]);

    const handleAccept = (requesterId) => {
        AcceptUser(requesterId, id);
    };
    const handleReject = (requesterId) => {
        RejectUser(requesterId, id);
    };

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
                <h1 className='text-4xl'>"🚀 Explore Opportunities: Review Your Pending Connections!"</h1>
                {/* <p className='text-2xl'>Explore developers who share your skills, interests, and experience level. Connect, collaborate, and turn ideas into reality with partners perfectly matched to you.</p> */}
            </div>

            <div className='flex flex-col items-center gap-10'>
                <h2 className='text-2xl'>Your Pending Connections</h2>
                <ul className='flex gap-2'>
                    {
                        pendingConn.map((match) => (
                            <li key={match.from._id}>
                                <div className="flex flex-col items-center w-80" >
                                    <div className="w-full h-72 overflow-hidden">
                                        <img
                                            src={match.from.profilePicture}
                                            alt="not"
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                    <div className="flex flex-col items-center bg-white w-5/6 p-3 rounded-lg -mt-12 shadow-2xl">
                                        <div className="text-2xl font-semibold">{match.from.name}</div>
                                        <div className="font-medium text-light-gray my-3">{match.from.email}</div>
                                        <ul className="flex flex-wrap gap-2 max-h-20 overflow-y-auto w-full justify-center">
                                            {match.from.skills.map((skill, index) => (
                                                <li key={index} className="bg-light-gray text-black px-2 py-1 rounded-full">
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                        <p><strong>Requested At:</strong> {new Date(match.requestedAt).toLocaleString()}</p>
                                        <div className='flex gap-4'>
                                            <button className='w-24 h-10 hover:bg-red-500 transition-colors hover:text-white duration-300 rounded-lg border-[1px] border-slate-950 hover:border-0' onClick={() => handleAccept(match.from._id)}>Accept</button>
                                            <button className='w-24 h-10 hover:bg-red-500 transition-colors hover:text-white duration-300 rounded-lg border-[1px] border-slate-950 hover:border-0' onClick={() => handleReject(match.from._id)}>Reject</button>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        ))
                    }
                </ul>
                {/* <ul>
                    {
                        pendingConn.map((match) => (
                            <li key={match.from._id}>
                                <h3>{match.from.name}</h3>
                                <p><strong>Email:</strong> {match.from.email}</p>
                                <p><strong>Skills:</strong> {match.from.skills.join(', ')}</p>
                                <p><strong>Requested At:</strong> {new Date(match.requestedAt).toLocaleString()}</p>
                            </li>
                        ))
                    }
                </ul> */}
            </div>
        </div>
    )
}

export default PendingConnections;