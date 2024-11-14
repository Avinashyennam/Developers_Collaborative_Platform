import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DevContext } from '../context/Context';
const Login = () => {
    const [viewlogin, setLogin] = useState(true);
    const { isLogin, setIsLogin, sap, id, setUserId, setUser, user } = useContext(DevContext);
    console.log("sap is", sap);
    console.log(setUserId);
    // setUserId(1);
    console.log(id);
    console.log("isLogin before login", isLogin);
    // const { setUserId } = useState(DevContext);
    const navigate = useNavigate();
    // const {isLogin, setIsLogin} = useContext(ShopContext);
    const [signupdata, setSignupdata] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLoginData({
            ...loginData,
            [name]: value,
        });
        //console.log(loginData);
    }

    const handleSignupChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSignupdata({
            ...signupdata,
            [name]: value,
        })
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/users/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signupdata)
            })
            if (response.ok) {
                console.log("signup Successful");
                let responseData = await response.json();
                sessionStorage.setItem('token', responseData.token);
                setIsLogin(true);
                const userId = responseData.user._id;
                setUserId(userId);
                setUser(responseData.user);
                console.log(responseData.user);
                navigate('/');
            }
            else {
                alert("User already exists");
                let responseData = await response.json();
                console.log(responseData);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            if (response.ok) {
                console.log("Login successful");
                let responseData = await response.json();
                // console.log("response is", responseData);
                // localStorage.setItem("token", responseData.token);
                sessionStorage.setItem('token', responseData.token);
                setIsLogin(true);
                console.log("isLogin after login", isLogin);
                const userId = responseData.user._id;
                // console.log("User ID:", userId);

                setUserId(userId);
                // console.log("user id is ", responseData.user._id);
                setIsLogin(true);
                setUser(responseData.user);
                console.log(responseData.user);
                navigate('/');

            }
            else {
                alert("User not found");
                let responseData = await response.json();
                console.log(responseData);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center p-10 gap-10">
                <div className="text-3xl flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-gray-800 flex flex-col items-center">
                        <h2>
                            Welcome!
                        </h2>
                        We're excited to have you join our community
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Start your journey with us. Let’s get started!
                    </p>
                </div>
                <div className="sm: w-3/5 2xl:w-2/5">

                    {(viewlogin == true) ?
                        <div>
                            <form className="login-form flex flex-col justify-center items-center gap-4 border p-10 rounded-lg sm:p-4">
                                <input type="email" name="email" value={loginData.email} placeholder="Enter Email" onChange={handleChange} />
                                <input type="password" name="password" value={loginData.password} placeholder="Enter Password" onChange={handleChange} />
                                <button type="button" className="bg-white text-black text-xl w-28 p-1 rounded-lg" onClick={handleLogin}>Login</button>
                                <h1 className="text-xl">Didn't have an account? <span className="text-blue-700 cursor-pointer" onClick={() => setLogin(!viewlogin)}>Click </span>here to Signup</h1>
                            </form>
                        </div>
                        :
                        <div>
                            <form className="login-form flex flex-col justify-center items-center gap-4 border p-10 rounded-lg sm:p-4" onSubmit={handleSignUp}>
                                <input type="text" name="name" value={signupdata.name} placeholder="Enter name" onChange={handleSignupChange} />
                                <input type="email" name="email" value={signupdata.email} placeholder="Enter Email" onChange={handleSignupChange} />
                                <input type="password" name="password" value={signupdata.password} placeholder="Enter Password" onChange={handleSignupChange} />
                                <button className="bg-white text-black text-xl w-28 p-1 rounded-lg">Continue</button>
                                <h1 className="text-xl">Already have an account? <span className="text-blue-700 cursor-pointer" onClick={() => setLogin(!viewlogin)}>Click </span>here to login</h1>
                            </form>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default Login