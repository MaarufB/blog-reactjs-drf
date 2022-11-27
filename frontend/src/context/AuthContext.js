// THIS CODE BELOW WAS FROM https://github.com/MaarufB/django-react-auth
import React from "react";
import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );
    
    // We will create a state which will handle the user profile
    const [userProfile, setUserProfile] = useState(() => 
        (user && user.user_profile) ? user.user_profile : null
    // localStorage.getItem("userProfile") 
    //         ? JSON.parse(localStorage.getItem("userProfile"))
    //         : null
    ); 

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);

            // perform destructuring to get the token, userprofile
            
            setUser(jwt_decode(data.access));
            // const userCredentials = jwt_decode(data.access)

            localStorage.setItem("authTokens", JSON.stringify(data));
            // setUserProfile(user ? user.user_profile.profile_pic : null);
            
            console.log(jwt_decode(data.access));
            
            navigate("/");
            console.log(`Successfully Logged In~~~`)
            
        } else {
            alert("Something went wrong!");
        }
    };

    const getProfile = () =>{

    }


    const registerUser = async (first_name, last_name, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                password,
                password2
            })
        });
        if (response.status === 201) {
            console.log(`Successfully registered!!`)
            navigate("/login");
        } else {
            alert("Something went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    const contextData = {
        user,
        userProfile,
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
