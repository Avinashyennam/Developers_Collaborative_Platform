// import React, { useState, useEffect, useContext } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { DevContext } from '../context/Context';
// import AcceptUser from '../components/Accept';
// import RejectUser from '../components/Reject';
// const PendingConnections = () => {
//     const [pendingConn, setPendingConn] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { user } = useContext(DevContext);
//     const id = user._id;

//     useEffect(() => {
//         const fetchPendingConn = async () => {
//             const token = sessionStorage.getItem('token');
//             if (!token) {
//                 console.log("Token not found in session storage.");
//                 return; // Exit if token is not found
//             }  
//             try {
//                 setLoading(true);
//                 const response = await fetch(`http://localhost:5000/api/users/pendingrequests`,{
//                     headers: {
//                         token: sessionStorage.getItem("token")
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch matches');
//                 }

//                 const data = await response.json();
//                 setPendingConn(data);
//             } catch (error) {
//                 console.log("failed to fetch users..");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchPendingConn();
//     }, []);

//     const handleAccept = (requesterId) => {
//         AcceptUser(requesterId, id);
//     };
//     const handleReject = (requesterId) => {
//         RejectUser(requesterId, id);
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center h-screen">
//                 <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                 {/* <h1>loading...</h1> */}
//             </div>
//         )
//     }
//     return (
//         <div className='mx-8 my-10 flex flex-col gap-8'>
//             <div className='gap-6 flex flex-col items-center'>
//                 <h1 className='text-4xl'>"🚀 Explore Opportunities: Review Your Pending Connections!"</h1>
//             </div>

//             <div className='flex flex-col items-center gap-10'>
//                 <h2 className='text-2xl'>Your Pending Connections</h2>
//                 <ul className='flex gap-2'>
//                     {
//                         pendingConn.map((match) => (
//                             <li key={match.from._id}>
//                                 <div className="flex flex-col items-center w-80" >
//                                     <div className="w-full h-72 overflow-hidden">
//                                         <img
//                                             src={match.from.profilePicture}
//                                             alt="not"
//                                             className='w-full h-full object-cover rounded-lg'
//                                         />
//                                     </div>
//                                     <div className="flex flex-col items-center bg-white w-5/6 p-3 rounded-lg -mt-12 shadow-2xl">
//                                         <div className="text-2xl font-semibold">{match.from.name}</div>
//                                         <div className="font-medium text-light-gray my-3">{match.from.email}</div>
//                                         <ul className="flex flex-wrap gap-2 max-h-20 overflow-y-auto w-full justify-center">
//                                             {match.from.skills.map((skill, index) => (
//                                                 <li key={index} className="bg-light-gray text-black px-2 py-1 rounded-full">
//                                                     {skill}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                         <p><strong>Requested At:</strong> {new Date(match.requestedAt).toLocaleString()}</p>
//                                         <div className='flex gap-4'>
//                                             <button className='w-24 h-10 hover:bg-red-500 transition-colors hover:text-white duration-300 rounded-lg border-[1px] border-slate-950 hover:border-0' onClick={() => handleAccept(match.from._id)}>Accept</button>
//                                             <button className='w-24 h-10 hover:bg-red-500 transition-colors hover:text-white duration-300 rounded-lg border-[1px] border-slate-950 hover:border-0' onClick={() => handleReject(match.from._id)}>Reject</button>
//                                         </div>
//                                     </div>

//                                 </div>
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div>
//             <ToastContainer />
//         </div>
//     )
// }

// export default PendingConnections;

import React, { useState, useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DevContext } from '../context/Context';
import AcceptUser from '../components/Accept';
import RejectUser from '../components/Reject';

const PendingConnections = () => {
    const [pendingConn, setPendingConn] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(DevContext);
    // const id = user._id;

    useEffect(() => {
        const fetchPendingConn = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log("Token not found in session storage.");
                return;
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
        const id = user._id;
        AcceptUser(requesterId, id);
    };
    const handleReject = (requesterId) => {
        const id = user._id;
        RejectUser(requesterId, id);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
                        Pending Connection Requests
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Review and respond to connection opportunities
                    </p>
                </div>

                {pendingConn.length === 0 ? (
                    <div className="text-center py-16 bg-white shadow-lg rounded-lg">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                            No Pending Connections
                        </h2>
                        <p className="text-gray-500">
                            You're all caught up! No new connection requests at the moment.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {pendingConn.map((match) => (
                            <div 
                                key={match.from._id} 
                                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="relative h-64 w-full">
                                    <img
                                        src={match.from.profilePicture}
                                        alt={match.from.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                        {match.from.name}
                                    </h2>
                                    <p className="text-gray-600 mb-4">
                                        {match.from.email}
                                    </p>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                            Skills
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {match.from.skills.map((skill, index) => (
                                                <span 
                                                    key={index} 
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-4">
                                        Requested At: {new Date(match.requestedAt).toLocaleString()}
                                    </p>
                                    <div className="flex space-x-4">
                                        <button 
                                            onClick={() => handleAccept(match.from._id)}
                                            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
                                        >
                                            Accept
                                        </button>
                                        <button 
                                            onClick={() => handleReject(match.from._id)}
                                            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition duration-300 font-semibold"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    )
}

export default PendingConnections;