import React, { createContext, useEffect, useState } from "react";
import * as jwt_decode from 'jwt-decode';
export const DevContext = createContext(null);

const DevContextProvider = (props) => {

    const [id, setId] = useState(null);
    const [isLogin, setIsLogin] = useState(() => {
        const token = localStorage.getItem('token');
        return token && token.length > 0 ? true : false;
    });

    const getUserId = ()=>{
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) return null;
        try{
            const decoded = jwt_decode(token);
            setId(decoded.id);
            console.log("Id is ", id);
        } catch{
            console.error("Failed to decode token", error);
        }
    }

    const contextValue = { id, setId, isLogin, setIsLogin };
    return (
        <DevContext.Provider value={contextValue}>
            {props.children}
        </DevContext.Provider>
    )
}

export default DevContextProvider;