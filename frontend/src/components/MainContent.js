import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { dummyPost } from "../dummy/dummyPost";
import PostList from "./PostList";

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
    <div className="container mt-3 border border-primary">
        {posts.map(item => (
                <PostList 
                    key={item.id}
                    id={item.id}
                    title={item.post_title}
                    image={item.image}
                    titleDescription={item.body}
                />
            ))}
    </div>
    )
}

export default MainContent;