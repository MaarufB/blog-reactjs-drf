import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import PostList from "./PostList";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
    const {authTokens, user, userProfile} = useContext(AuthContext);   
    const {access, refresh} = authTokens;

    const tokenConfig = {
        access: access,
        refresh: refresh,
    }


    // console.log(`user: ${userProfile} \n${Object.entries(user)}`)
    // console.log(`username: ${}`)
    const baseURL = "http://127.0.0.1:8000/api";

    const [posts, setPosts] = useState([]);
    
    // navigate
    const navigate = useNavigate()

    useEffect(() => {
        fetchPost();
    },[]);

    const fetchPost = async () => {
        await axios.get(`${baseURL}/blog`, {
            headers:{
                'Authorization': `Bearer ${access}`,
            }
        })
            .then(response => {
                // console.log(response.data)
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error.response.status)
                
                if (error.response.status == 401){
                    navigate('/login');
                }

            })
    }
    
    return (
    <div className="container mt-4">
        <div className="row justify-content-center">
            <div className="col-md-8 md-lg-8">
                {posts.map(item => (
                        <PostList 
                            key={item.id}
                            id={item.id}
                            title={item.post_title}
                            image={item.image}
                            body={item.body}
                            user={item.user}
                        />
                    ))}
            </div>
                
        </div>
    </div>
    )
}

export default MainContent;