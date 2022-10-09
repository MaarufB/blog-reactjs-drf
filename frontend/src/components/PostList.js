import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import avatar from "../assets/images/avatar.jpg";


const PostList = (props) => {
    const description = (props.body.length > 200) ? props.body.slice(0,200) + " ......Read More" : props.body;
    const profile_pic = props.user ? props.user.profile_pic : avatar;

    return ( 
        <div className="container mb-3 shadow">
            <div className="row mb-2 p-2">
                <div className="col" >
                    <div className="d-flex">
                        <img
                            className="rounded-cicle"
                            src= {profile_pic}
                            loading="lazy"
                            alt="Profile image"
                            height="50"
                            width="50"
                            style={{
                                borderRadius: "50%"
                            }}
                            />
                            
                        <p className="post-user mx-3">maarufb</p>
                        <span className="ms-auto">
                            <p 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                style={{
                                    cursor:"pointer"
                                }}>....
                            </p>
                        
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to={`/post/update/${props.id}`}> 
                                        <span className="dropdown-item drop-item">Update</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/post/delete/${props.id}`}>
                                       <span className="dropdown-item drop-item">Delete</span>
                                    </Link>
                                </li>
                            </ul>
                        </span>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center p-2">
                <div className="col-12 mb-3">
                    <img
                        className="post-image"
                        src={props.image}
                        alt="post by the user"
                        loading="lazy"
                        height="320"
                        />
                </div>
                <div className="col-12">
                    <h1 className="post-title">{props.title}</h1>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={`/post/${props.id}`}>
                            <button className="btn btn-dark btn-view bg-white text-dark border-0" style={{textDecoration:"underline"}}>View More</button>
                        </Link>
                   </div>
                </div>
                <span className="mb-3"></span>
            </div>
        </div>
        
    )
}

export default PostList;