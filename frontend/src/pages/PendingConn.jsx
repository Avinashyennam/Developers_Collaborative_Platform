import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DevContext } from '../context/Context';
import AcceptUser from '../components/Accept';
import RejectUser from '../components/Reject';
const PendingConnections = () => {
    const [pendingConn, setPendingConn] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(DevContext);
    const id = user._id;

    useEffect(() => {
        const fetchPendingConn = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log("Token not found in session storage.");
                return; // Exit if token is not found
            }  
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/pendingrequests`,{
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                setPendingConn(data);
            } catch (error) {
                console.log("failed to fetch users..");
            } finally {
                setLoading(false);
            }
        }
        fetchPendingConn();
    }, []);

    const handleAccept = (requesterId) => {
        AcceptUser(requesterId, id);
    };
    const handleReject = (requesterId) => {
        RejectUser(requesterId, id);
    };

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
            </div>
            <ToastContainer />
        </div>
    )
}

export default PendingConnections;