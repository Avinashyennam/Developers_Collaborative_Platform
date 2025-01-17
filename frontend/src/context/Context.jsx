import React, { createContext, useEffect, useState, useCallback } from "react";
export const DevContext = createContext(null);

const DevContextProvider = ({ children }) => {

    const [id, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(() => {
        const token = sessionStorage.getItem('token');
        return token && token.length > 0 ? true : false;
    });
    const [blogs, setBlogs] = useState([]);
    const fetchBlogs = useCallback(async () => {
        try {
          const response = await fetch("http://localhost:5000/api/users/allblogs"); // Replace with your actual backend API
          if (!response.ok) {
            throw new Error("Failed to fetch blogs");
          }
          const data = await response.json();
          setBlogs(data.blogs);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      }, 
    []);

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
    return (
        <DevContext.Provider value={{ id, setUserId, isLogin, setIsLogin, user, setUser, blogs, fetchBlogs }}>
            {children}
        </DevContext.Provider>
    )
}
export default DevContextProvider;