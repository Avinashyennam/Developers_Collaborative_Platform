import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DevContext } from '../context/Context';
import '../App.css';
import ProfilePic from './ProfilePicture';
let Navbar = () => {

    const { isLogin, setIsLogin, user } = useContext(DevContext);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    console.log(isLogin);

    
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
        // localStorage.removeItem("token");
        sessionStorage.removeItem('token');
    };

    return (
        <div>
            <div className='w-full flex justify-between items-center px-8 text-white bg-black'>
                <div>
                    <img src='/logo-white.png' alt='not found' className='w-32 h-20 rounded-full' />
                </div>
                <div>
                    <ul className='flex justify-between gap-8 text-xl'>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/matches"><li>Matches</li></Link>
                        <Link to="/connections"><li>Connections</li></Link>
                        <Link to="/pendingconnections"><li>Pending Connections</li></Link>
                    </ul>
                </div>
                <div>
                    <ProfilePic />
                    {/* {
                        sessionStorage.getItem('token') ?
                            <div className=''>
                                <img
                                    src={user.profilePicture}
                                    alt='Avatar'
                                    width={50}
                                    height={50}
                                    className='rounded-full object-cover border border-gray-200'
                                    style={{ width: '60px', height: '60px' }}
                                    onClick={() => setOpen(!open)}
                                />

                                {open && (
                                    <ul
                                        ref={dropdownRef}
                                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg"
                                    >
                                        <li className="w-full px-4 py-2 text-left text-lg text-red-600 hover:bg-gray-100 rounded">Profile</li>
                                        <li><button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-lg text-red-600 hover:bg-gray-100 rounded"
                                        >
                                            Logout
                                        </button></li>
                                    </ul>
                                )}
                            </div>
                            :
                            <div className='bg-gray-200 px-2 py-1 rounded-lg'>
                                <Link to='/login'><button className='text-xl text-black flex items-center justify-center'>Login</button></Link>
                            </div>
                    } */}
                </div>
            </div>
        </div>
    )
}

export default Navbar;