import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import { DevContext } from "../context/Context";

const ProfilePic = () => {

    const [profilePic, setProfilePic] = useState(null);
    const { isLogin, id, setIsLogin, user } = useContext(DevContext);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {

        const closeDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', closeDropdown);
        return () => {
            // Clean up the event listener when the component unmounts
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);

    const handleLogout = () => {
        setIsLogin(false);
        sessionStorage.removeItem('token');
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            fetchProfileData(token);
        }
    }, [isLogin]);

    const fetchProfileData = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/users/getprofile", {
                headers: {
                    'token': token,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setProfilePic(data.profile);
            }
        } catch (error) {
            console.error('Failed to fetch profile data', error);
        }
    }
    return (
        <div>
            {
                sessionStorage.getItem('token') ? (
                    <div>
                        {profilePic ? (
                            <img
                                src={profilePic}
                                alt='Avatar'
                                width={50}
                                height={50}
                                className='rounded-full object-cover border border-gray-200'
                                style={{ width: '60px', height: '60px' }}
                                onClick={() => setOpen(!open)}
                            />
                        ) : (
                            <div
                                className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-300 text-black text-xl font-bold border border-gray-200'
                                onClick={() => setOpen(!open)}
                                style={{ cursor: 'pointer' }}
                            >
                                {(user?.name?.[0]?.toUpperCase() || '?')}
                            </div>
                        )}

                        {open && (
                            <ul
                                ref={dropdownRef}
                                className='absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg'
                            >
                                <Link to='/profile'>
                                    <li className='w-full px-4 py-2 text-left text-lg text-red-600 hover:bg-gray-100 rounded' onClick={()=> setOpen(close)}>
                                        My profile
                                    </li>
                                </Link>
                                <Link to='/updateprofile'>
                                    <li className='w-full px-4 py-2 text-left text-lg text-red-600 hover:bg-gray-100 rounded' onClick={()=> setOpen(close)}>
                                        Update profile
                                    </li>
                                </Link>
                                <Link to='/login'>
                                    <li onClick={()=> setOpen(close)}>
                                        <button
                                            onClick={handleLogout}
                                            className='w-full px-4 py-2 text-left text-lg text-red-600 hover:bg-gray-100 rounded'
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </Link>
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className='bg-gray-200 px-2 py-1 rounded-lg'>
                        <Link to='/login'>
                            <button className='text-xl text-black flex items-center justify-center'>
                                Login
                            </button>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default ProfilePic