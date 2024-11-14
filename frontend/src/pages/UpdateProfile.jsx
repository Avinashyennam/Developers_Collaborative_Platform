import React, { useState, useEffect, useContext } from 'react'
import { DevContext } from '../context/Context';
import '../App.css';
const UpdateProfile = () => {

    const { isLogin } = useContext(DevContext);
    const [name, setName] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState([]);
    const [inputSkill, setInputSkill] = useState('');
    const [interests, setInterests] = useState([]);
    const [inputInterest, setInputInterest] = useState('');

    // Helper function to handle array inputs
    // const handleArrayChange = (setter) => (e) => {
    //     const values = e.target.value.split('/,\s*/').map((item) => item.trim());
    //     setter(values);
    // };

    const handleSkillAdd = (e) => {
        e.preventDefault();
        if (inputSkill.trim() && !skills.includes(inputSkill.trim())) {
            setSkills([...skills, inputSkill.trim()]);
            // setInputSkill('');
        }
    };

    const handleInterestAdd = (e) => {
        e.preventDefault();
        if (inputInterest.trim() && !interests.includes(inputInterest.trim())) {
            setInterests([...interests, inputInterest.trim()]);
            // setInputInterest('');
        }
    };

    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

    // useEffect(() => {
    //     const token = sessionStorage.getItem("token");
    // }, [isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedName = capitalize(name);
        const formattedSkills = skills.map((skill) => capitalize(skill));
        const formattedInterests = interests.map((interest) => capitalize(interest));

        // const formData = {
        //     name: formattedName,
        //     experienceLevel,
        //     bio,
        //     skills: formattedSkills,
        //     interests: formattedInterests,
        // };
        // Create data object and only include non-empty fields
        const formData = {
            ...(name && { name: formattedName }),
            ...(experienceLevel && { experienceLevel: experienceLevel.trim() }),
            ...(bio && { bio: bio.trim() }),
            ...(formattedSkills.length > 0 && { formattedSkills }),
            ...(formattedInterests.length > 0 && { formattedInterests }),
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
                    {/* <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <button type="submit">Submit</button> */}

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                        <label className="block mb-4">
                            <span className="text-black-700">Name:</span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                required
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="text-black-700">Experience Level:</span>
                            <input
                                type="text"
                                value={experienceLevel}
                                onChange={(e) => setExperienceLevel(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                required
                            />
                        </label>

                        <label className="block mb-4">
                            <span className="text-black-700">Bio:</span>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                                required
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