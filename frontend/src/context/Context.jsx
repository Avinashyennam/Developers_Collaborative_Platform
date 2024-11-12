import React, { createContext, useEffect, useState } from "react";
import * as jwtDecode from 'jwt-decode';
export const DevContext = createContext(null);

const DevContextProvider = ({children}) => {

    const [id, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(() => {
        const token = localStorage.getItem('token');
        return token && token.length > 0 ? true : false;
    });

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken._id); // Use the correct key based on your token structure
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    },[])

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