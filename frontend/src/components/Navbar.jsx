import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DevContext } from '../context/Context';
import '../App.css';
// import Login from '../pages/Login';
let Navbar = () => {

    const { isLogin, setIsLogin } = useContext(DevContext);
    console.log(isLogin);

    const handleLogout = () => {
        setIsLogin(false);
        localStorage.removeItem("token");
    };

    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className='flex justify-between items-center mx-8'>
                <div>
                    <img src='/collab.png' alt='not found' className='w-32 h-20 rounded-full' />
                </div>
                <div>
                    <ul className='flex justify-between gap-8 text-xl'>
                        <Link to="/"><li>Home</li></Link>
                        <Link to="/matches"><li>Matches</li></Link>
                        <Link to="/connections"><li>Connections</li></Link>
                        <Link to="/pendingconnections"><li>Pending Connections</li></Link>

                        {/* <Link href="#home"><li>Home</li></Link>
                        <Link href="#matches"><li>Matches</li></Link>
                        <Link href="#connections"><li>Connections</li></Link>
                        <Link href="#pending"><li>Pending Connections</li></Link> */}

                        {/* <li><a href="#home" style="scroll-behavior: smooth;">Home</a></li>
                        <li><a href="#matches">Matches</a></li>
                        <li><a href="#connections">Connections</a></li>
                        <li><a href="#pending">Pending</a></li> */}
                    </ul>
                </div>
                <div>
                    {isLogin === true ?
                        <div className='bg-slate-700 px-2 py-1 rounded-lg'>
                            <Link to='/login'><button className='text-xl text-white flex items-center justify-center' onClick={handleLogout}>Logout</button></Link>
                        </div> :
                        <div className='bg-slate-700 px-2 py-1 rounded-lg'>
                            <Link to='/login'><button className='text-xl text-black flex items-center justify-center'>Login</button></Link>
                        </div>
                    }
                    {/* <Link to="/login"><button>Login</button></Link> */}
                    {/* <img src="/avatar.webp" alt='not found' className='w-24 h-24 rounded-full' /> */}
                </div>
            </div>
            {/* <hr></hr> */}
        </div>
    )
}

export default Navbar;