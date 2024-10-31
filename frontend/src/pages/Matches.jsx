import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
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


    if (loading) return <p>Loading matches...</p>;
    return (
        <div className='mx-8 my-10 flex flex-col gap-10'>
            <div className='gap-6 flex flex-col items-center'>
                <h1 className='text-4xl'>"✨ Your Matches: Connect with Like-Minded Developers!"</h1>
                <p className='text-xl'>Discover collaboration opportunities tailored for your skills and interests.</p>
            </div>
            <div className='flex flex-col items-center gap-10'>
                <h2 className='text-2xl'>Your Matches</h2>
                <ul className='flex gap-4'>
                    {
                        matches.map((match) => {
                            return (
                                <li key={match._id}>
                                    <div className="flex flex-col items-center w-80" >
                                        <div className="w-full h-72 overflow-hidden">
                                            <img
                                                src={match.profilePicture}
                                                alt="not"
                                                className='w-full h-full object-cover rounded-lg'
                                            />
                                        </div>
                                        <div className="flex flex-col items-center w-4/5 bg-white p-3 rounded-lg -mt-12 shadow-2xl">
                                            <div className="text-2xl font-semibold">{match.name}</div>
                                            <div className="font-medium text-light-gray my-3">{match.experienceLevel}</div>
                                            <ul className="flex flex-wrap gap-2 max-h-20 overflow-y-auto w-full justify-center">
                                                {match.skills.map((skill, index) => (
                                                    <li key={index} className="bg-light-gray text-black px-2 py-1 rounded-full">
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className='w-24 h-10 hover:bg-red-500 transition-colors hover:text-white duration-300 rounded-lg border-[1px] border-slate-950 hover:border-0' onClick={() => handleConnect(match._id)}>Connect</button>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div >
        </div >
    )
}

export default Matches;