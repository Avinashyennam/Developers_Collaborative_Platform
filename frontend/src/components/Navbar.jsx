import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import ProfilePic from './ProfilePicture';
let Navbar = () => {
    return (
        <div>
            <div className='w-full flex justify-between items-center px-8 text-white bg-black'>
                <div>
                    <img src='/logo-white.png' alt='not found' className='w-32 h-20 rounded-full' />
                </div>
                <div>
                    <ul className='flex justify-between gap-8 text-xl'>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/blogs"><li>Posts</li></Link>
                        <Link to="/matches"><li>Matches</li></Link>
                        <Link to="/connections"><li>Connections</li></Link>
                        <Link to="/pendingconnections"><li>Pending Connections</li></Link>
                    </ul>
                </div>
                <div>
                    <ProfilePic />
                </div>
            </div>
        </div>
    )
}

export default Navbar;