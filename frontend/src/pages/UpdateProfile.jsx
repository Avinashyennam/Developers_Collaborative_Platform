import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { DevContext } from '../context/Context';
import '../App.css';
const UpdateProfile = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState([]);
    const [inputSkill, setInputSkill] = useState('');
    const [interests, setInterests] = useState([]);
    const [inputInterest, setInputInterest] = useState('');
    const {user, setUser} = useContext(DevContext);


    const handleSkillAdd = (e) => {
        e.preventDefault();
        const newSkills = inputSkill
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill && !skills.includes(skill));

        setSkills([...skills, ...newSkills]);
        // alert("Skills added!")
        toast.success('Skills added!', { position: 'top-center' });
    };

    const handleInterestAdd = (e) => {
        e.preventDefault();

        // Split the input by commas, trim whitespace, and filter out duplicates or empty entries
        const newInterests = inputInterest
            .split(',')
            .map(interest => interest.trim()) // Trim each interest
            .filter(interest => interest && !interests.includes(interest)); // Exclude empty or duplicate interests
        setInterests([...interests, ...newInterests]);
        // alert("Interests added");
        toast.success('Interests added!', { position: 'top-center' });
    };

    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedName = capitalize(name);
        const formattedSkills = skills.map((skill) => capitalize(skill));
        const formattedInterests = interests.map((interest) => capitalize(interest));

        // Create data object and only include non-empty fields
        const formData = {
            ...(name && { name: formattedName }),
            ...(experienceLevel && { experienceLevel: experienceLevel.trim() }),
            ...(bio && { bio: bio.trim() }),
            ...(formattedSkills.length > 0 && { skills: formattedSkills }),
            ...(formattedInterests.length > 0 && { interests: formattedInterests }),
        };

        console.log("form data is", formData);

        try {
            const response = await fetch("http://localhost:5000/api/users/updateprofile", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'token': sessionStorage.getItem("token"),
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Profile submitted successfully!');
                const data = await response.json();
                console.log(data);
                setUser(data.user);
                toast.success('Profile updated!', { position: 'top-center' });
                navigate("/profile", {replace: true});
            } else {
                alert('Failed to submit profile.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting profile.');
        }
    };

    return (
        <div className='px-36 py-10'>
            <div className="background-container">
                <div className="content">
                    <h2>Enter Your Details</h2>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <label className="block mb-4">
                            <span className="text-black-700">Name:</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"

                            />
                        </label>

                        <label className="block mb-4">
                            <span className="text-black-700">Experience Level:</span>
                            <input
                                type="text"
                                value={experienceLevel}
                                onChange={(e) => setExperienceLevel(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"

                            />
                        </label>

                        <label className="block mb-4">
                            <span className="text-black-700">Bio:</span>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="text-black-700">Skills (comma-separated):</span>
                            <div className='flex'>
                                <input
                                    type="text"
                                    value={inputSkill}
                                    onChange={(e) => setInputSkill(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                    placeholder="e.g., React, Node.js, MongoDB"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleSkillAdd}
                                    className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </label>

                        <label className="block mb-4">
                            <span className="text-black-700">Interests (comma-separated):</span>
                            <div className='flex'>
                                <input
                                    type="text"
                                    value={inputInterest}
                                    onChange={(e) => setInputInterest(e.target.value)}
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                    placeholder="e.g., Web Development, AI, UI/UX Design"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleInterestAdd}
                                    className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Add
                                </button>
                            </div>
                        </label>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300 sub-btn"
                        >
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default UpdateProfile;