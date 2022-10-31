import React from "react";
import avatar from "../assets/images/avatar.jpg";

export default function Comments(props){

    return (
        <div className="row justify-content-center mb-3 shadow">
            <div className="col-10 p-2">
                <div className="container">
                    <div className="d-flex p-2">
                        <div className="row">
                            <img
                                // src="https://media-exp1.licdn.com/dms/image/C4D03AQEv-vwlqnX7Zw/profile-displayphoto-shrink_200_200/0/1622088978783?e=1668038400&v=beta&t=UFKCg2vcXrauuWsdrf9no_abwmTt54Nl63lsd31dV-w"
                                src={props.user?.user_profile?.profile_pic || avatar}
                                className="rounded-circle col"
                                height="50"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                                />
                            <p className="post-user col m-auto">{props?.user?.username || "Anonymous"}</p>
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
                    <div className="container">
                        <p>{props.commentText}</p>
                        <a href="#" style={{textDecoration:"underline"}}>Reply</a>
                    </div>
                </div>
            </div>
        </div>
    );
};