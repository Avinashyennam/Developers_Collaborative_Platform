// import React, { useState, useContext, useEffect } from 'react';
// import { DevContext } from '../context/Context';
// const Connections = () => {

//     const [connections, setConnections] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const { id } = useContext(DevContext);

//     useEffect(() => {
//         const fetchConnections = async () => {
//             const token = sessionStorage.getItem('token');
//             if (!token) {
//                 console.log("Token not found in session storage.");
//                 return; // Exit if token is not found
//             }  
//             try {
//                 setLoading(true);
//                 const response = await fetch(`http://localhost:5000/api/users/connections`,{
//                     headers: {
//                         token: sessionStorage.getItem("token")
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch matches');
//                 }

//                 const data = await response.json();
//                 console.log(data);
//                 setConnections(data);
//                 // console.log(connections);
//             } catch (error) {
//                 console.log("failed to fetch users..");
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchConnections();
//     }, []);

//     // if (loading) return <p>Loading matches...</p>;
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
//                 <h1 className='text-4xl'>"🎉 You've Got Connections! Explore Your Network!"</h1>
//                 {/* <p className='text-xl'>Explore developers who share your skills, interests, and experience level. Connect, collaborate, and turn ideas into reality with partners perfectly matched to you.</p> */}
//             </div>

//             <div className='flex flex-col items-center gap-10'>
//                 <h2 className='text-2xl'>Your Connections</h2>
//                 <ul className='flex gap-2'>
//                     {
//                         connections.map((match) => (
//                             <li key={match._id}>
//                                 <div className="flex flex-col items-center w-80" >
//                                     <div className="w-full h-72 overflow-hidden">
//                                         <img
//                                             src={match.profilePicture}
//                                             alt="not"
//                                             className='w-full h-full object-cover rounded-lg'
//                                         />
//                                     </div>
//                                     <div className="flex flex-col items-center bg-white w-5/6 p-3 rounded-lg -mt-12 shadow-2xl">
//                                         <div className="text-2xl font-semibold">{match.name}</div>
//                                         <div className="font-medium text-light-gray my-3">{match.email}</div>
//                                         <ul className="flex flex-wrap gap-2 max-h-20 overflow-y-auto w-full justify-center">
//                                             {match.skills.map((skill, index) => (
//                                                 <li key={index} className="bg-light-gray text-black px-2 py-1 rounded-full">
//                                                     {skill}
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Connections;

import React, { useState, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DevContext } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedConnection, setSelectedConnection] = useState(null);
    const { id } = useContext(DevContext);

    useEffect(() => {
        const fetchConnections = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                console.log("Token not found in session storage.");
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/connections`, {
                    headers: {
                        token: sessionStorage.getItem("token")
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                setConnections(data);
            } catch (error) {
                console.log("failed to fetch users..");
            } finally {
                setLoading(false);
            }
        }
        fetchConnections();
    }, []);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full"
                />
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-16 px-8">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto"
            >
                <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
                    🎉 Your Developer Network
                </h1>

                {connections.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center text-gray-600 text-2xl"
                    >
                        No connections yet. Start networking!
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-12 gap-8">
                        {/* Connections Sidebar */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="col-span-4 space-y-4  max-h-[700px]"
                        >
                            {connections.map((connection) => (
                                <motion.div
                                    key={connection.email}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedConnection(connection)}
                                    className={`
                                        cursor-pointer p-4 rounded-xl transition-all 
                                        ${selectedConnection?.email === connection.email
                                            ? 'bg-blue-500 text-white shadow-xl'
                                            : 'bg-white text-gray-800 hover:bg-blue-100 shadow-md'}
                                    `}
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={connection.profilePicture}
                                            alt={connection.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{connection.name}</h3>
                                            <p className="text-sm opacity-70">
                                                {connection.skills.slice(0, 2).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Connection Details */}
                        <AnimatePresence mode="wait">
                            {selectedConnection && (
                                <motion.div
                                    key="connection-details"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 50, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="col-span-8 bg-white rounded-2xl p-8 shadow-2xl"
                                >
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="overflow-hidden rounded-xl">
                                            <motion.img
                                                src={selectedConnection.profilePicture} 
                                                alt={selectedConnection.name} 
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    ease: "easeInOut"
                                                }}
                                                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-3xl font-bold mb-2">{selectedConnection.name}</h2>
                                                <p className="text-gray-600 flex items-center">
                                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                                    {selectedConnection.email}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                                    <FontAwesomeIcon icon={faCode} className="mr-2 text-blue-500" />
                                                    Skills
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedConnection.skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                                    <FontAwesomeIcon icon={faNetworkWired} className="mr-2 text-green-500" />
                                                    Experience Level
                                                </h3>
                                                <p className="capitalize bg-green-100 text-green-800 px-3 py-1 rounded-full inline-block">
                                                    {selectedConnection.experienceLevel}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default Connections;