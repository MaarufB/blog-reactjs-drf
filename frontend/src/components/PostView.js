import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "./Comments";

const PostView = (props) => {
    const baseURL = "/api";

    const params = useParams();
    console.log(`ID ${params.id}`)
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState({
        id: 90,
        comment_text: "",
        post: params.id,
        user: 1
    }
    );

    useEffect(() => {
        fetchPostById(params.id);
    }, []);

    const fetchPostById = async () => {
        await axios.get(`${baseURL}/blog/${params.id}`)
            .then(response => {
                setPost(response.data);
                const {comments, post_title} = response.data;
                setCommentList(comments);
                console.log(`Comments: ${commentList}`);
                console.log(post_title);
            })
            .catch(error =>{
                console.log(error);
            })
    }

    const createComment = async () => {
        const formData = new FormData();
        formData.append('id', comment.id);
        formData.append('comment_text', comment.comment_text);
        formData.append('post', comment.post);
        formData.append('user', comment.user);

        await axios.post(`${baseURL}/post-comment/`, formData, {
            headers:{
                "Content-Type": "application/json",
            },
        }).then(({data}) => {
            console.log(data);
            comment.comment_text = "";

        }).catch(({response}) => {
            console.log(response);
        })



    }

    const handleChange = (event) => {
        setComment({...comment, [event.target.name]:event.target.value})
        console.log(comment);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createComment();
    }

    return (
        <div className="container mt-3 p-3">
            <div className="container p-4">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="container">
                            <div className="mb-3">
                                <p className="fw-lighter m-0">June 12,2021</p>
                                <p className="fw-bold m-0">Ma-aruf Burad</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 mt-2">
                                    <h2 className="fw-bold mb-4">{post?.post_title}</h2>
                                    {/* <p>
                                        he talks about the side hustles and strange ways to have a healthy and constant income. The website talks about how the wife from the couple escaped her 9 to 5 job and how they have a stable income source without having a full-time job.
                                    </p> */}
                                    <p>{post?.body}</p>
                                </div>
                                <div className="col-12 p-3">
                                    <div className="d-flex justify-content-center">
                                        <img className="img-fluid" 
                                            src={post?.image} 
                                            alt="post"
                                            height="100"
                                            width="720" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-8">
                        {/* <form className="p-3"> */}
                            <textarea 
                                className="form-control" 
                                name="comment_text"
                                onChange={handleChange}
                                value={comment?.comment_text}
                                placeholder="Type your comment here..." 
                                rows="2">

                                </textarea>
                            <button 
                                className="btn btn-primary mt-2"
                                onClick={handleSubmit}>Post</button>
                        {/* </form> */}
                        <hr />
                    </div>
                </div>
    
                <div className="container p-4">
                    <h2 className="text-center mb-3">Comments</h2>
                    {commentList.map((item)=> (
                        <Comments 
                            key={item.id}
                            commentText={item.comment_text}>
                        </Comments>
                    ))}                    
                </div>
            </div>
        </div>
    )
}

export default PostView;

