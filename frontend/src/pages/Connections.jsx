import React , {useState, useContext, useEffect} from 'react';
import { DevContext } from '../context/Context';
const Connections = ()=>{

    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useContext(DevContext);

    useEffect(()=>{
        const fetchConnections = async()=>{
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
    },[id]);

    if (loading) return <p>Loading matches...</p>;
    return(
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
                                <div className="flex flex-col items-center" >
                                    <img src="team-6.jpg" width={300} height={250} alt="not" />
                                    <div className="flex flex-col items-center bg-white w-5/6 p-3 rounded-lg -mt-20 shadow-2xl">
                                        <div className="text-2xl font-semibold">{match.name}</div>
                                        <div className="font-medium text-light-gray my-3">{match.email}</div>
                                        <ul className="flex flex-wrap gap-2">
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