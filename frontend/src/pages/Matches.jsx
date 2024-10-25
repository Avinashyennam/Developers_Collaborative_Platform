import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebookF, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { DevContext } from '../context/Context';

const Matches =  () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useContext(DevContext);
    console.log("id is", id);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/users/matchusers/:${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch matches');
                }

                const data = await response.json();
                setMatches(data.matches);
            } catch (error) {
                console.log("failed to fetch users..");
            } finally {
                setLoading(false);
            }
        }
        fetchMatches();
    }, [])


    if (loading) return <p>Loading matches...</p>;
    return (
        <div className='mx-8 my-10'>
            <div className='gap-6 flex flex-col'>
                <h1 className='text-5xl'>"Discover Your Ideal Matches!"</h1>
                <p className='text-2xl'>Explore developers who share your skills, interests, and experience level. Connect, collaborate, and turn ideas into reality with partners perfectly matched to you.</p>
            </div>
            {/* <div className="flex flex-col items-center">
                <img src="team-6.jpg" width={380} height={280} alt="not" />
                <div className="flex flex-col items-center bg-white w-5/6 p-7 rounded-lg -mt-20 shadow-2xl">
                    <div className="text-2xl font-semibold">Katherine Pierce</div>
                    <div className="font-medium text-light-gray my-3">Senior Agent</div>
                    <div className="flex gap-4">
                        <div className="w-12 h-12 flex justify-center items-center border hover:bg-real-green transition-colors duration-300 text-light-gray hover:text-white rounded-lg"><FontAwesomeIcon icon={faFacebookF} style={{ width: "15px", height: "25px" }} /></div>
                        <div className="w-12 h-12 flex justify-center items-center border hover:bg-real-green transition-colors duration-300 text-light-gray hover:text-white rounded-lg"><FontAwesomeIcon icon={faTwitter} style={{ width: "25px", height: "25px" }} /></div>
                        <div className="w-12 h-12 flex justify-center items-center border hover:bg-real-green transition-colors duration-300 text-light-gray hover:text-white rounded-lg"><FontAwesomeIcon icon={faWhatsapp} style={{ width: "25px", height: "25px" }} /></div>
                    </div>
                </div>
            </div> */}

            <div>
                <h2>Your Matches</h2>
                {matches.length === 0 ? (
                    <p>No matches found</p>
                ) : (
                    <ul>
                        {matches.map((match) => (
                            <li key={match._id}>
                                <h3>{match.name}</h3>
                                <p>Skills: {match.skills.join(', ')}</p>
                                <p>Interests: {match.interests.join(', ')}</p>
                                <p>Experience Level: {match.experienceLevel}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Matches;