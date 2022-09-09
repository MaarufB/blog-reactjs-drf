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
            setCommentList(data);

        }).catch(({response}) => {
            console.log(response);
        })
    }

    const handleChange = (event) => {
        setComment({...comment, [event.target.name]:event.target.value})
        // console.log(comment);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!comment.comment_text =="" || !comment.comment_text == null){
            createComment();
        }   
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="container mb-3 shadow">
                        <div className="d-flex p-2">       
                            <div className="row">
                                <img
                                    src="https://media-exp1.licdn.com/dms/image/C4D03AQEv-vwlqnX7Zw/profile-displayphoto-shrink_200_200/0/1622088978783?e=1668038400&v=beta&t=UFKCg2vcXrauuWsdrf9no_abwmTt54Nl63lsd31dV-w"
                                    className="rounded-circle col"
                                    height="50"
                                    alt="Black and White Portrait of a Man"
                                    loading="lazy"
                                    />
                                <p className="post-user col m-auto">maarufb</p>
                            </div>
                    
                            <span className="ms-auto">...</span>
                        </div>                            
                        <div className="container justify-content-center p-4">
                            <div className="col-12 mt-2">
                                <h2 className="fw-bold mb-4">{post?.post_title}</h2>
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
                        {/* comment section */}
                        <div className="container section-comment">
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
                                            className="btn btn-dark mt-2"
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
                </div>
            </div>            
        </div>
    )
}

export default PostView;

