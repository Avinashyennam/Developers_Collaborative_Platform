import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEnvelope, faNetworkWired, faUser, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { DevContext } from '../context/Context';
import connectUser from '../components/connectUser';

const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const { user } = useContext(DevContext);

    // const navigate = useNavigate();
    // if(!sessionStorage.getItem("token")){
    //     navigate("/login");
    // }

    useEffect(() => {
        const fetchMatches = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) return;

            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/matchusers`, {
                    headers: { token }
                });

                if (!response.ok) throw new Error('Failed to fetch matches');

                const data = await response.json();
                setMatches(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();
    }, []);

    const handleConnect = (recipientId) => {
        connectUser(recipientId, user._id);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                {/* <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-24 h-24 border-8 border-blue-500 border-t-transparent rounded-full"
                /> */}
                <img src="/rb_2299.png" alt='not found' width={600} height={400} />
                <h1 className='text-2xl font-semibold'>Login to know your matches</h1>
            </div>
        );
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
                    Developer Network Connections
                </h1>

                {matches.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center text-gray-600 text-2xl"
                    >
                        No matches found yet. Keep expanding your skills!
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-12 gap-8">
                        {/* Matches Sidebar */}
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="col-span-3 space-y-4"
                        >
                            {matches.map((match) => (
                                <motion.div
                                    key={match._id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedUser(match)}
                                    className={`
                                        cursor-pointer p-4 rounded-xl transition-all 
                                        ${selectedUser?._id === match._id
                                            ? 'bg-blue-500 text-white shadow-xl'
                                            : 'bg-white text-gray-800 hover:bg-blue-100 shadow-md'}
                                    `}
                                >
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={match.profilePicture}
                                            alt={match.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{match.name}</h3>
                                            <p className="text-sm opacity-70">
                                                {match.skills.slice(0, 2).join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* User Details */}
                        <AnimatePresence mode="wait">
                            {selectedUser && (
                                <motion.div
                                    key="user-details"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: 50, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="col-span-9 bg-white rounded-2xl p-8 shadow-2xl"
                                >
                                    <div className="grid grid-cols-2 gap-8">
                                        <div>
                                            <img
                                                src={selectedUser.profilePicture}
                                                alt={selectedUser.name}
                                                className="w-full rounded-xl shadow-lg"
                                            />
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-3xl font-bold mb-2">{selectedUser.name}</h2>
                                                <p className="text-gray-600 flex items-center">
                                                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                                                    {selectedUser.email}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                                    <FontAwesomeIcon icon={faCode} className="mr-2 text-blue-500" />
                                                    Skills
                                                </h3>
                                                {/* <h3>{selectedUser._id}</h3> */}
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedUser.skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleConnect(selectedUser._id)}
                                                className="w-full bg-blue-500 text-white py-3 rounded-xl 
                                                hover:bg-blue-600 transition-colors flex items-center 
                                                justify-center space-x-2"
                                            >
                                                <FontAwesomeIcon icon={faNetworkWired} />
                                                <span>Connect</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default Matches;