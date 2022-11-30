import axios from "axios";
// import { param } from "jquery";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import avatar from "../assets/images/avatar.jpg";

export default function PostView(props){
    const baseURL = "/api";
    const { user:{user_id}, authTokens } = useContext(AuthContext);
    const {access} = authTokens;

    const params = useParams();
    const [post, setPost] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [comment, setComment] = useState({
        id: 0,
        comment_text: "",
        post: params.id,
        user: 1
    });
    const [userProfileImage, setUserProfileImage] = useState(null);
    const [postUser, setPostUser] = useState(null);
    const [userProfile, setUserProfile] = useState(() => {
        if(post){
            setPostUser(post?.user || null);
            if(!userProfile){
                setUserProfile(postUser?.user_profile);
                if(!userProfile){
                    setUserProfileImage(userProfile?.profile_pic || avatar)
                }
            }
        }
    })

    useEffect(() => {
    

        if (params.id)
        {
            fetchPostById(params.id)
        }
        
    }, [params.id, commentList.length]);

    const fetchPostById = async () => {
        await axios.get(`${baseURL}/blog/${params.id}`, {
            headers:{
                'Authorization': `Bearer ${access}`,
            }
        })
            .then(response => {
                setPost(response.data);
                // const {comments} = response.data;
                // setCommentList(comments);
                setCommentList(response.data.comments);
                console.log(response.data)
            })
            .catch(error =>{
                // console.log(error);
            })
    }


    const createComment = async () => {
        const formData = new FormData();
        formData.append('id', comment.id);
        formData.append('comment_text', comment.comment_text);
        formData.append('post', comment.post);
        formData.append('user', parseInt(user_id));

        

        await axios.post(`${baseURL}/post-comment/`, formData, {
            headers:{
                'Authorization': `Bearer ${access}` ,
                "Content-Type": "application/json",
            },
        }).then(({data, status}) => {
            // console.log(`comments \n${data}`);
            comment.comment_text = "";
            if(status == 201){
                fetchPostById();
            }

        }).catch(({response}) => {
            // console.log(response);
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
        <div className="container mt-4 p-3 container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <div className="container mb-3 shadow">
                        <div className="d-flex p-2">       
                            <div className="row">
                                <img
                                    // src="https://media-exp1.licdn.com/dms/image/C4D03AQEv-vwlqnX7Zw/profile-displayphoto-shrink_200_200/0/1622088978783?e=1668038400&v=beta&t=UFKCg2vcXrauuWsdrf9no_abwmTt54Nl63lsd31dV-w"
                                    src={post?.user?.user_profile?.profile_pic}
                                    className="rounded-circle col"
                                    height="32"
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
                            <div className="col-10" style={{
                                // maxHeight:"50vh"
                            }}>
                               <img className="img-fluid border" 
                                    src={post?.image} 
                                    alt="post"
                                    loading="lazy"
                                    // height="320"
                                    width="320"
                                 />
                            </div>
                            <div className="col-12 mt-3">
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
                                        value={comment.comment_text}
                                        placeholder="Type your comment here..." 
                                        rows="2">
                                        </textarea>
                                    <button className="btn btn-dark mt-2" onClick={handleSubmit}>Submit</button>
                                    {/* <hr /> */}
                                </div>
                            </div>
                            <div className="container mt-3 mb-3">
                                <h2 className="text-center">Comments</h2>
                                {commentList.map(({id, comment_text, user}) => (
                                    <Comments 
                                        // key={item.id}
                                        // commentText={item.comment_text}
                                        // username={}
                                        key={id}
                                        commentText={comment_text}
                                        user={user}
                                        >
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
// export default PostView;

