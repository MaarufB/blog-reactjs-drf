import axios from "axios";
import { param } from "jquery";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// const HandleAction = (props) => {
//     const action

// }


const PostForm = () =>{
    // parameters passed by url
    const params = useParams();
    console.log(params);
    // Handle Navigation
    const navigate = useNavigate();

    // Base URL
    const baseURL = "http://127.0.0.1:8000/api";

    const [post, setPost] = useState({
        user: 1,
        post_title: "",
        body: ""
    });
    const [inputs, setInputs] = useState({

    });

    const [image, setImage] = useState();
    // const [inputs, setInputs] = useState(null);

    useEffect(() => {
        if (params.id){
            fetchPost();
        }
        else return
    },[]);

    const fetchPost = async () => {
        await axios.get(`${baseURL}/blog/${params.id}`)
            .then(response => {
                console.log(response.data);
                setPost(response.data);
            })
            .catch(error => {
                console.log(`errors\n${error}`);
            })
    }

    const handleChange = (event) => {
        // setImage(event.target.files[0]); 
        const handledData = {...post, [event.target.name]:event.target.value};
        
        console.log(handledData);
        setPost(handledData);   
        console.log(post); 
    }


    // This function will handle the submit button (CRUD), depends on the condition
    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(event);
        // console.log(post);
        createPost();

    }


    // Will handle the Post request to the backend side(Create posts);
    const createPost = async (event) => {
        // event.preventDefault();
        
        const targetFormat = {
            "id": 15,
            "user": null,
            "post_title": null,
            "body": null,
            // "image": null,
            // "comments": []
        }


        const formData = new FormData();
        
        // append form Inputs
        formData.append('post_title', post.post_title);
        formData.append('body', post.body);
        formData.append('user', post.user);

        await axios.post(`${baseURL}/blog/`,formData)
            .then(({data}) => {
                navigate("/");
                console.log(data);
            })
            .catch(({response}) => {
                console.log(response);
            })
    }

    const updatePost = async () => {

        return {
            action: "Update Post"
        }
    }

    const deletePost = async () => {

        return {
            action: "Delete Post"
        }
    }

    const handleAction = () => {
        if(!params.id){
            console.log("Add form")
            return(
            <button 
            className="btn btn-dark"
            onClick={handleSubmit}>Save</button>
            )
        }
        else if(params.id && !params.delete){
            console.log("Update FOrm")
            return(
            <button 
            className="btn btn-dark"
            onClick={handleSubmit}>Update</button>
            )
        }
        else if (params.delete){
            console.log("DELETE FORM")
            return (<button 
            className="btn btn-dark"
            onClick={handleSubmit}>Delete</button>
            )
        }
    }

    return(
    <div className="container border border-danger">
        <h2 className="text-center">Custom Form</h2>
        
        <div className="row justify-content-center">
            <div className="col-md-7 border-radius">
                <form className="form-group p-2 m-2 border shadow">
                    <div className="m-2">
                        <label className="form-label">Title</label>
                        
                        <input 
                            className="form-control"
                            name="post_title"
                            onChange={handleChange}
                            value={post?.post_title}
                            placeholder="Title" />
                    </div>

                    <div className="m-2">
                        <label className="form-label">Description</label>
                        <input 
                            className="form-control"
                            name="body"
                            onChange={handleChange}
                            value={post?.body}
                            placeholder="Description" />
                    </div>
                    <div className="d-flex justify-content-between m-2 p-2">
                        {handleAction()}
                        <Link to={"/"}>
                            <button className="btn btn-dark" onClick={handleSubmit}>Cancel</button>
                        </Link>
                    </div>             
                </form>
            </div>
        </div>
    </div>
    )
}

export default PostForm;