import React from "react";
import { Link } from "react-router-dom";
import "../App.css";


const PostList = (props) => {
    const postTitle = props.title;
    const description = (props.body.length > 200) ? props.body.slice(0,200) +" ......Read More" : props.body;

    
    // console.log(props.user.profile_pic)
    const { profile_pic } = (props.user) ? props.user : "https://media-exp1.licdn.com/dms/image/C4D03AQEv-vwlqnX7Zw/profile-displayphoto-shrink_200_200/0/1622088978783?e=1668038400&v=beta&t=UFKCg2vcXrauuWsdrf9no_abwmTt54Nl63lsd31dV-w";
    console.log(profile_pic);
    return ( 
        <div className="container mb-3 shadow">
            <div className="d-flex m-0">
                <div className="d-flex p-2">
                    <div className="row">
                        {
                        <img 
                            src= {profile_pic}
                            className="rounded-circle col"
                            height="50"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                            />
                        }
                        <p className="post-user col m-auto">maarufb</p>
                    </div>
                </div>
                <span className="ms-auto">
                    <p 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        style={{
                            cursor:"pointer"
                        }}>....</p>
                        
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
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <img
                        className="post-image"
                        src={props.image}
                        alt="post by the user"
                        />
                </div>
                <div className="col-md-8 mb-3">
                    <h1 className="post-title">{postTitle}</h1>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Link to={`/post/${props.id}`}>
                            <button className="btn btn-dark btn-view bg-white text-dark border-0" style={{textDecoration:"underline"}}>View More</button>
                        </Link>
                                    {/* <Link to={`/post/update/${props.id}`}>
                                        <button className="btn btn-dark btn-update">Update</button>
                                    </Link>
                                    <Link to={`/post/delete/${props.id}`}>
                                        <button className="btn btn-danger btn-delete">Delete</button>
                                    </Link> */}
                   </div>
                </div>
                <span className="mb-3"></span>
            </div>
        </div>
        
    )
}

export default PostList;