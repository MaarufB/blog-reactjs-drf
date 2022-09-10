import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
// import { dummyPost } from "../dummy/dummyPost";
import PostList from "./PostList";
// import { Outlet } from "react-router-dom";

const MainContent = () => {
    const baseURL = "http://127.0.0.1:8000/api";

    const [posts, setPosts] = useState([]);
    
    useEffect(() => {
        fetchPost();
    },[]);

    const fetchPost = async () => {
        await axios.get(`${baseURL}/blog`)
            .then(response => {
                console.log(response.data);
                setPosts(response.data);
            })
            .catch(error => {
                console.log(`errors\n${error}`);
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
                        />
                    ))}
            </div>
                
        </div>
    </div>
    )
}

export default MainContent;