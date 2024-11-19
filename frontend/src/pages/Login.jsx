import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevContext } from '../context/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [viewLogin, setLogin] = useState(true);
    const { setIsLogin, setUserId, setUser } = useContext(DevContext);
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e, isSignup = false) => {
        const { name, value } = e.target;
        isSignup 
            ? setSignupData(prev => ({ ...prev, [name]: value }))
            : setLoginData(prev => ({ ...prev, [name]: value }));
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(signupData)
            });

            if (response.ok) {
                const responseData = await response.json();
                sessionStorage.setItem('token', responseData.token);
                setIsLogin(true);
                setUserId(responseData.user._id);
                navigate('/');
            } else {
                alert("User already exists");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const responseData = await response.json();
                sessionStorage.setItem('token', responseData.token);
                setIsLogin(true);
                setUserId(responseData.user._id);
                setUser(responseData.user);
                navigate('/');
            } else {
                alert("User not found");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {viewLogin ? "Welcome Back!" : "Create Account"}
                        </h1>
                        <p className="text-gray-500">
                            {viewLogin 
                                ? "Sign in to continue your journey" 
                                : "Join our community today"}
                        </p>
                    </div>

                    {viewLogin ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={loginData.email}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Email Address" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={loginData.password}
                                    onChange={(e) => handleChange(e)}
                                    placeholder="Password" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                            >
                                Login <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div className="relative">
                                <FontAwesomeIcon icon={faUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={signupData.name}
                                    onChange={(e) => handleChange(e, true)}
                                    placeholder="Full Name" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={signupData.email}
                                    onChange={(e) => handleChange(e, true)}
                                    placeholder="Email Address" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <FontAwesomeIcon icon={faLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={signupData.password}
                                    onChange={(e) => handleChange(e, true)}
                                    placeholder="Create Password" 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
                            >
                                Sign Up <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                            </button>
                        </form>
                    )}

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            {viewLogin 
                                ? "Don't have an account? " 
                                : "Already have an account? "}
                            <span 
                                onClick={() => setLogin(!viewLogin)} 
                                className="text-blue-600 hover:underline cursor-pointer"
                            >
                                {viewLogin ? "Sign Up" : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;