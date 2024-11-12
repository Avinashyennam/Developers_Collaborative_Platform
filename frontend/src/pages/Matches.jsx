import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faClipboard, faEnvelope, faLaptopCode, faPeopleGroup, faCode, faNetworkWired } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion';
import { DevContext } from '../context/Context';
import connectUser from '../components/connectUser'
const Matches = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useContext(DevContext);
    console.log("Current ID:", id);


    useEffect(() => {
        const fetchMatches = async () => {
            if (!id) {
                console.log("User ID is not set yet.");
                return; // Exit if id is null
            }
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/matchusers/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                console.log(data);
                setMatches(data);
                console.log(matches);
            } catch (error) {
                console.log("failed to fetch users..");
            } finally {
                setLoading(false);
            }
        }
        fetchMatches();
    }, [id])

    const handleConnect = (recipientId) => {
        connectUser(recipientId, id);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [animationKey, setAnimationKey] = useState(0);
    const handleUserClick = (user) => {
        setSelectedUser(user);
        setAnimationKey((prevKey) => prevKey + 1);
        console.log(selectedUser);
    }
    return (
        <div className='px-36 my-24 flex flex-col gap-10'>
            <div className='flex flex-col items-center gap-20'>
                <div className='w-1/2 text-center flex flex-col gap-5'>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <h1 className='text-5xl font-bold'>Unlock Your Developer Potential</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 200 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        <h2 className='text-lg'>
                            Developer Matchmaking connects you with peers who share your passion for coding.
                            Collaborate, learn, and grow together in a vibrant community.
                        </h2>
                    </motion.div>
                </div>
                <div className='flex gap-4 items-center'>
                    <div className='flex flex-col text-center gap-4'>
                        <FontAwesomeIcon icon={faPeopleGroup} size="2xl" style={{ color: "#2ed818" }} />
                        <h1 className='text-3xl font-semibold'>Collaborate with Peers</h1>
                        <p>
                            Join forces with like-minded developers to work on exciting projects.
                            Our platform helps you find the right partners for your coding journey,
                            enhancing your experience.
                        </p>
                    </div>
                    <div className='flex flex-col text-center gap-4'>
                        <FontAwesomeIcon icon={faCode} size="2xl" style={{ color: "#2ed818" }} />
                        <h1 className='text-3xl font-semibold'>Enhance Your Skills</h1>
                        <p>
                            Engage in peer-to-peer coding practice to sharpen your skills.
                            Our matchmaking service encourages knowledge sharing and skill development within the community.
                        </p>
                    </div>
                    <div className='flex flex-col text-center gap-4'>
                        <FontAwesomeIcon icon={faNetworkWired} size="2xl" style={{ color: "#2ed818" }} />
                        <h1 className='text-3xl font-semibold'>Build Your Network</h1>
                        <p>
                            Expand your professional network by connecting with developers who share your interests.
                            Foster relationships that can lead to future collaborations and opportunitie
                        </p>
                    </div>
                </div>
            </div>
            {loading === true ?
                <div className="flex items-center justify-center h-screen">
                    <div className="w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div> :
                <div className='flex flex-col items-center gap-10'>
                    <h2 className='text-2xl'>Your Matches</h2>
                    <div className='flex gap-10 w-full'>
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.7 }}
                            key={animationKey}
                            className='w-1/2'
                        >
                            {selectedUser ? (
                                <div
                                    className='flex flex-col items-center gap-8 border rounded-lg p-4 bg-slate-200 shadow-xl'
                                >
                                    <div>
                                        <img src={selectedUser.profilePicture} alt='not found' width={400} height={300} className='rounded-md' />
                                    </div>
                                    <div className='flex flex-col gap-2 text-xl'>
                                        <h1 className='font-semibold'>{selectedUser.name}</h1>
                                        <div className='flex gap-2 items-center'>
                                            <FontAwesomeIcon icon={faEnvelope} className='text-2xl text-green-800' />
                                            <h2>{selectedUser.email}</h2>
                                        </div>

                                    </div>
                                    <div className='text-lg flex flex-col gap-4'>
                                        <div className='flex gap-2 items-center'>
                                            <FontAwesomeIcon icon={faClipboard} className='text-2xl text-green-800' />
                                            <h5>Bio:</h5>
                                            <p>A Passionate Fullstack Developer</p>
                                        </div>
                                        <div className='flex gap-2 items-center'>
                                            <FontAwesomeIcon icon={faLaptopCode} className='text-2xl text-green-800' />
                                            <h5>Skills:</h5>
                                        </div>

                                        <ul className='flex gap-4 flex-wrap'>
                                            {selectedUser.skills.map((skill, index) => (
                                                <li key={index}>{skill}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className='w-24 h-10 hover:bg-red-500 transition-colors hover:text-white duration-300 rounded-lg border-[1px] border-slate-950 hover:border-0' onClick={() => handleConnect(selectedUser._id)}>Connect</button>
                                </div>
                            ) : (
                                <p>Select a user to see details</p>
                            )}
                        </motion.div>
                        <div className='w-1/2 flex flex-col items-center gap-4'>
                            {
                                matches.map((match) => {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1 }}
                                            key={match._id}
                                            onClick={() => handleUserClick(match)}
                                        >
                                            <img src={match.profilePicture} alt="not found" width={100} height={100} className='rounded-full shadow-2xl shadow-indigo-500/50' />
                                        </motion.div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div >
            }
        </div >
    )
}

export default Matches;