import React, { createContext, useEffect, useState } from "react";
// import * as jwtDecode from 'jwt-decode';
export const DevContext = createContext(null);

const DevContextProvider = ({ children }) => {

    const [id, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(() => {
        const token = sessionStorage.getItem('token');
        return token && token.length > 0 ? true : false;
    });

    useEffect(() => {
        async function getUser() {
            try {
                if (sessionStorage.getItem("token")) {
                    const response = await fetch("http://localhost:5000/api/users/getuser", {
                        method: "GET",
                        headers: {
                            token: sessionStorage.getItem("token")
                        }
                    })

                    if (response.ok) {
                        const data = await response.json();
                        // console.log(data);
                        setUser(data.user);
                    }
                }
            } catch (error) {
                console.log("error while retriving user details");
            }
        }
        getUser();
    },[]);

    // Save user data to sessionStorage and load from it on refresh
    useEffect(() => {
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser)); // Restore user state from sessionStorage
            // setLoading(false);
        }
    }, []);
    // console.log(sessionStorage.getItem("token"));

    // const getUserId = ()=>{
    //     const token = localStorage.getItem('token');
    //     console.log(token);
    //     if (!token) return null;
    //     try{
    //         const decoded = jwt_decode(token);
    //         setId(decoded.id);
    //         console.log("Id is ", id);
    //     } catch{
    //         console.error("Failed to decode token", error);
    //     }
    // }

    // const contextValue = ;
    return (
        <DevContext.Provider value={{ id, setUserId, isLogin, setIsLogin, user, setUser }}>
            {children}
        </DevContext.Provider>
    )
}
export default DevContextProvider;