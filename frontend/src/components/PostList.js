import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import AuthContext from "../context/AuthContext";
import "../App.css";


const PostList = (props) => {
    const postTitle = props.title;

    return ( 
        <div className="container mb-3 shadow">
            <div className="d-flex m-0">
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
                </div>
                <span className="ms-auto">...</span>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <img 
                        className="post-image"
                        src={props.image} 
                        />
                </div>                    
                <div className="col-md-8 mb-3">
                    <h1 className="post-title">{postTitle}</h1>
                    <div>                                
                        <p className="post-description">{props.body}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={`/post/${props.id}`}>
                            <button className="btn btn-dark btn-view" style={{textDecoration:"underline"}}>View More</button>                            
                        </Link>
                                    {/* <Link to={`/post/update/${props.id}`}>
                                        <button className="btn btn-dark btn-update">Update</button>
                                    </Link>
                                    <Link to={`/post/delete/${props.id}`}>
                                        <button className="btn btn-danger btn-delete">Delete</button>
                                    </Link> */}
                   </div>
                </div>
            </div>
        </div>
        
    )
}

export default PostList;


