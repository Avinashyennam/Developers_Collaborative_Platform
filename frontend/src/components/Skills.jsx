import React, { useState, useEffect, useRef } from 'react';

// const SkillsAutocomplete = ({ onSkillAdd }) => {
//   const [inputSkill, setInputSkill] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const wrapperRef = useRef(null);

//   // Predefined skills list - you can expand this
//   const skillsList = [
//     "JavaScript", "Python", "Java", "C++", "Ruby",
//     "React", "Angular", "Vue.js", "Node.js", "Express.js",
//     "MongoDB", "PostgreSQL", "MySQL", "Redis",
//     "AWS", "Azure", "Google Cloud",
//     "Docker", "Kubernetes", "Jenkins",
//     "Git", "GitHub", "GitLab",
//     "HTML", "CSS", "Sass", "Less",
//     "TypeScript", "PHP", "Swift", "Kotlin",
//     "Flutter", "React Native", "iOS", "Android",
//     "Machine Learning", "Data Science", "Artificial Intelligence",
//     "DevOps", "Agile", "Scrum"
//   ];

//   // Filter suggestions based on input
//   const getSuggestions = (input) => {
//     const value = input.toLowerCase().trim();
//     if (value.length === 0) return [];

//     return skillsList.filter(skill => 
//       skill.toLowerCase().includes(value)
//     ).slice(0, 5); // Limit to 5 suggestions
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInputSkill(value);
//     setSuggestions(getSuggestions(value));
//     setShowSuggestions(true);
//   };

//   // Handle suggestion click
//   const handleSuggestionClick = (skill) => {
//     onSkillAdd(skill);
//     setInputSkill('');
//     setSuggestions([]);
//     setShowSuggestions(false);
//   };

//   // Handle click outside to close suggestions
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Handle add button click
//   const handleAddClick = () => {
//     if (inputSkill.trim()) {
//       // Find the closest matching skill from the list
//       const matchingSkill = skillsList.find(
//         skill => skill.toLowerCase() === inputSkill.toLowerCase()
//       ) || inputSkill;

//       onSkillAdd(matchingSkill);
//       setInputSkill('');
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   };

//   return (
//     <div className="relative" ref={wrapperRef}>
//       <label className="block mb-4">
//         <span className="text-gray-700">Skills:</span>
//         <div className="flex">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               value={inputSkill}
//               onChange={handleInputChange}
//               className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
//               placeholder="Start typing a skill..."
//             />
//             {showSuggestions && suggestions.length > 0 && (
//               <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200">
//                 {suggestions.map((skill, index) => (
//                   <div
//                     key={index}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => handleSuggestionClick(skill)}
//                   >
//                     {skill}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={handleAddClick}
//             className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Add
//           </button>
//         </div>
//       </label>
//     </div>
//   );
// };

// export default SkillsAutocomplete;

const SkillsAutocomplete = ({ onSkillAdd }) => {
    const [inputSkill, setInputSkill] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [addedSkills, setAddedSkills] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Predefined skills list - you can expand this
    const skillsList = [
        "JavaScript", "Python", "Java", "C++", "Ruby",
        "React", "Angular", "Vue.js", "Node.js", "Express.js",
        "MongoDB", "PostgreSQL", "MySQL", "Redis",
        "AWS", "Azure", "Google Cloud",
        "Docker", "Kubernetes", "Jenkins",
        "Git", "GitHub", "GitLab",
        "HTML", "CSS", "Sass", "Less",
        "TypeScript", "PHP", "Swift", "Kotlin",
        "Flutter", "React Native", "iOS", "Android",
        "Machine Learning", "Data Science", "Artificial Intelligence",
        "DevOps", "Agile", "Scrum"
    ];

    // Filter suggestions based on input
    const getSuggestions = (input) => {
        const value = input.toLowerCase().trim();
        if (value.length === 0) return [];

        return skillsList.filter(skill =>
            skill.toLowerCase().includes(value)
        ).slice(0, 5); // Limit to 5 suggestions
    };

    // Handle input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputSkill(value);
        setSuggestions(getSuggestions(value));
        setShowSuggestions(true);
    };

    // Handle suggestion click
    const handleSuggestionClick = (skill) => {
        if (!addedSkills.includes(skill)) {
            const updatedSkills = [...addedSkills, skill];
            setAddedSkills(updatedSkills);
            onSkillAdd(skill);
        }
        setInputSkill('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle add button click
    // const handleAddClick = () => {
    //     if (inputSkill.trim()) {
    //         const matchingSkill = skillsList.find(
    //             skill => skill.toLowerCase() === inputSkill.toLowerCase()
    //         ) || inputSkill;

    //         if (!addedSkills.includes(matchingSkill)) {
    //             const updatedSkills = [...addedSkills, matchingSkill];
    //             setAddedSkills(updatedSkills);
    //             onSkillAdd(matchingSkill);
    //         }
    //         // setInputSkill('');
    //         setSuggestions([]);
    //         setShowSuggestions(false);
    //     }
    //     setInputSkill('');
    // };

    return (
        <div className="relative" ref={wrapperRef}>
            <label className="block mb-4">
                <span className="text-gray-700">Skills:</span>
                <div className="flex">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={inputSkill}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                            placeholder="Start typing a skill..."
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200">
                                {suggestions.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleSuggestionClick(skill)}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* <button
                        type="button"
                        onClick={handleAddClick}
                        className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Add
                    </button> */}
                </div>
            </label>

            {/* Display added skills */}
            <div>
                <h3 className="text-gray-700 mb-2">Added Skills:</h3>
                <div className="flex flex-wrap gap-2">
                    {addedSkills.map((skill, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillsAutocomplete;
