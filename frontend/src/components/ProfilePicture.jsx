import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { DevContext } from "../context/Context";
import { motion, AnimatePresence } from 'framer-motion';

const ProfilePic = () => {
    const [profilePic, setProfilePic] = useState(null);
    const { isLogin, setIsLogin, user, setUser } = useContext(DevContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const closeDropdown = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', closeDropdown);
        return () => {
            document.removeEventListener('mousedown', closeDropdown);
        };
    }, []);

    const handleLogout = () => {
        setIsLogin(false);
        setIsOpen(false);
        setUser(null);
        sessionStorage.removeItem('token');
        navigate('/login');
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {sessionStorage.getItem('token') ? (
                <div className="relative">
                    {user?.profilePicture ? (
                        <img
                            src={user.profilePicture}
                            alt='Avatar'
                            className='rounded-full object-cover border border-gray-200 cursor-pointer'
                            style={{ width: '60px', height: '60px' }}
                            onClick={toggleDropdown}
                        />
                    ) : (
                        <div
                            className='flex items-center justify-center w-16 h-16 rounded-full bg-gray-300 text-black text-xl font-bold border border-gray-200 cursor-pointer'
                            onClick={toggleDropdown}
                        >
                            {(user?.name?.[0]?.toUpperCase() || '?')}
                        </div>
                    )}

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                                className='absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 w-48'
                            >
                                <div className="py-1">
                                    <Link 
                                        to='/profile' 
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        My Profile
                                    </Link>
                                    <Link 
                                        to='/updateprofile' 
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-100'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Update Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className='w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100'
                                    >
                                        Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link to='/login' className='block'>
                    <div className='bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition duration-300 ease-in-out'>
                        <span className='text-xl flex items-center justify-center'>
                            Login
                        </span>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default ProfilePic;