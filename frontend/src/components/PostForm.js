import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const PostForm = () =>{
    // parameters passed by url
    const params = useParams();
    console.log(params);
    // Handle Navigation
    const navigate = useNavigate();

    // Base URL
    const baseURL = "/api";

    const [post, setPost] = useState({
        user: 1,
        post_title: "",
        body: ""
    });
    const [actionType, setActionType] = useState("post");

    const [inputs, setInputs] = useState({

    });

    const [image, setImage] = useState();
    // const [inputs, setInputs] = useState(null);

    useEffect(() => {
        if (params.id){
            fetchPost();
        }
        else return
        // if (params.id && params.delete => setActionType("delete")

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
        setPost(handledData);   
        if (event.target.name == "image"){
            setImage(event.target.files[0]);
        }
    }


    // This function will handle the submit button (CRUD), depends on the condition
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!params.id) {
            console.log("Add");
            createPost();
        }
        else if(params.id && !params.delete){
            console.log("Update");
            updatePost();
            navigate("/");
        }
        else if(params.id && params.delete){
            console.log("Delete");
            deletePost();

        }

    }


    // Will handle the Post request to the backend side(Create posts);
    const createPost = async () => {

        const formData = new FormData();
        
        // append form Inputs
        formData.append('post_title', post.post_title);
        formData.append('body', post.body);
        formData.append('user', post.user);
        formData.append('image', image);

        await axios.post(`${baseURL}/blog/`,formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }).then(({data}) => {
                navigate("/");
                console.log(data);
            })
            .catch(({response}) => {
                console.log(response);
            })
    }

    const updatePost = async () => {

        const formData = new FormData();
        
        // append form Inputs
        formData.append('post_title', post.post_title);
        formData.append('body', post.body);
        formData.append('user', post.user);
        if(image!=null){
            formData.append('image', image);
        }

        await axios.put(`${baseURL}/blog/${params.id}/`,formData)
            .then(({data}) => {
                console.log("Update");
                navigate("/");
            })
            .catch(({response}) => {
                console.log(response);
            })
    }

    const deletePost = async () => {
        await axios.delete(`${baseURL}/blog/${params.id}/`)
            .then((data) => {
                console.log(data);
                navigate("/");
            })
            .catch(({response:{data}}) => {
                console.log(data.message)
            });
    }

    const handleAction = () => {
        if(!params.id){
            // console.log("Add form")
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

                    <div className="m-2">
                        <label className="form-label">Image</label>
                        <input 
                            className="form-control"
                            name="image"
                            type="file"
                            accept="image/jpeg,image/png,image/gif"
                            onChange={handleChange}
                            // value={image?.body}
                            placeholder="Image" />
                    </div>

                    <div className="d-flex justify-content-between m-2 p-2">
                        {handleAction()}
                        <Link to={"/"}>
                            <button className="btn btn-dark">Cancel</button>
                        </Link>
                    </div>             
                </form>
            </div>
        </div>
    </div>
    )
}

export default PostForm;