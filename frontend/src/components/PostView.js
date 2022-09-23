import axios from "axios";
// import { param } from "jquery";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PostView = (props) => {
    const baseURL = "/api";
    const { authTokens } = useContext(AuthContext);
    const {access} = authTokens;

    const params = useParams();
    
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
    

        if (params.id)
        {
            fetchPostById(params.id)
        }
    });

    const fetchPostById = async () => {
        await axios.get(`${baseURL}/blog/${params.id}`, {
            headers:{
                'Authorization': `Bearer ${access}`,
            }
        })
            .then(response => {
                setPost(response.data);
                const {comments} = response.data;
                setCommentList(comments);
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
                'Authorization': `Bearer ${access}` ,
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
        setComment(
            {...comment, [event.target.name]:event.target.value}
            );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.comment_text !== "" || comment.comment_text != null){
            createComment();
        }   
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-8">
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
                            <span className="ms-auto">
                                <p 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                    style={{
                                        cursor:"pointer"
                                    }}>....</p>
                                    
                                <ul className="dropdown-menu">
                                    <li><span className="dropdown-item">Update</span></li>
                                    <li><span className="dropdown-item">Delete</span></li>
                                </ul>
                            </span>
                        </div>                            
                        <div className="row justify-content-center p-4">
                            <div className="col-10">
                                <div className="d-flex justify-content-center">
                                    <img className="img-fluid" 
                                        src={post?.image} 
                                        alt="post"
                                        height="100"
                                        width="720" />
                               </div>
                            </div>
                            <div className="col-10 mt-3">
                                <h2 className="fw-bold mb-4">{post?.post_title}</h2>
                                <p>{post?.body}</p>
                            </div>
                        </div>

                        {/* comment section */}
                        <div className="container section-comment">
                            <div className="row justify-content-center">
                                <div className="col-10">
                                    <textarea 
                                        className="form-control" 
                                        name="comment_text"
                                        onChange={handleChange}
                                        value={comment?.comment_text}
                                        placeholder="Type your comment here..." 
                                        rows="2">
                                        </textarea>
                                    <button className="btn btn-dark mt-2" onClick={handleSubmit}>Submit</button>
                                    {/* <hr /> */}
                                </div>
                            </div>
                            <div className="container mt-3 mb-3">
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

