// import { createContext, useState, useEffect } from 'react'
// import jwt_decode from "jwt-decode";
// import { useNavigate } from 'react-router-dom'

// const AuthContext = createContext()

// export default AuthContext;

// export const AuthProvider = ({ children }) => {
//     let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
//     let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
//     let [loading, setLoading] = useState(true)

//     const navigate = useNavigate()

//     let loginUser = async (e) => {
//         e.preventDefault()
//         let response = await fetch('http://127.0.0.1:8000/api/token/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
//         })
//         let data = await response.json()

//         if (response.status === 200) {
//             setAuthTokens(data)
//             setUser(jwt_decode(data.access))
//             localStorage.setItem('authTokens', JSON.stringify(data))
//             navigate('/')
//         } else {
//             alert('Something went wrong!')
//         }
//     }

//     let registerUser = async(username, password, password2) => {
//         console.log(`username: ${username}, password: ${password}, password2: ${password2}`)
//         const response = await fetch("http://127.0.0.1/api/register/",{
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 username,
//                 password,
//                 password2
//             })
//         });
//         console.log(`register status:\n${response.status}`)
//         if (response.status === 201){
//             navigate("/login");
//             console.log("Successfully Registered!")
//         } else {
//             alert("Something Went Wrong!");
//         }
//     }

//     let logoutUser = () => {
//         setAuthTokens(null)
//         setUser(null)
//         localStorage.removeItem('authTokens')
//         navigate('/login')
//     }


//     let updateToken = async () => {

//         let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ 'refresh': authTokens?.refresh })
//         })

//         let data = await response.json()

//         if (response.status === 200) {
//             setAuthTokens(data)
//             setUser(jwt_decode(data.access))
//             localStorage.setItem('authTokens', JSON.stringify(data))
//         } else {
//             logoutUser()
//         }

//         if (loading) {
//             setLoading(false)
//         }
//     }

//     let contextData = {
//         user: user,
//         authTokens: authTokens,
//         loginUser: loginUser,
//         logoutUser: logoutUser,
//         registerUser: registerUser,
//     }


//     useEffect(() => {

//         if (loading) {
//             updateToken()
//         }

//         let fourMinutes = 1000 * 60 * 4

//         let interval = setInterval(() => {
//             if (authTokens) {
//                 updateToken()
//             }
//         }, fourMinutes)
//         return () => clearInterval(interval)

//     }, [authTokens, loading])

//     return (
//         <AuthContext.Provider value={contextData} >
//             {loading ? null : children}
//         </AuthContext.Provider>
//     )
// }


// THIS CODE BELOW WAS FROM https://github.com/MaarufB/django-react-auth
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
            setUser(jwt_decode(data.access));
            localStorage.setItem("authTokens", JSON.stringify(data));
            navigate("/");
            console.log(`Successfully Logged In~~~`)
        } else {
            alert("Something went wrong!");
        }
    };

    const registerUser = async (username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
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
