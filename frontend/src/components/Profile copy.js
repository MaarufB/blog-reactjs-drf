import React from "react";
import axios from "axios";
// import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import avatar from "../assets/images/avatar.jpg";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {

    // const [userProfile, setUserProfile] = useState('');
    const {user, userProfile} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(() =>
        user ? userProfile : null
    );

    const profile_pic = user ? userProfile.profile_pic : avatar; 

    console.log(userProfile)

    return (
        <>
            <div className="container py-4 px-4"> 
                <div className="col-md-8 mx-auto">
                    <div className="bg-white shadow rounded overflow-hidden"> 
                        <div className="px-4 pt-0 pb-4 cover"> 
                            <div className="media align-items-end profile-head border border-danger">
                                <div className="profile mr-3">
                                    <img 
                                        src={profile_pic}
                                        alt="..." 
                                        width="130" 
                                        className="rounded mb-2 shadow-sm" 
                                    />
                                </div> 
                                <div className="media-body mb-5 text-white border border-danger"> 
                                    <h4 className="mt-0 mb-0">{userInfo.first_name} {userInfo.last_name}</h4> 
                                    <Link to={`/profile/update/${userProfile.user_id}`}>
                                        <button className="">Edit profile</button>
                                    </Link>
                                    {/* TODO ADDRESS */}
                                    {/* <p className="small mb-4"><i className="fas fa-map-marker-alt mr-2"></i>New York</p>  */}
                                </div> 
                            </div> 
                        </div> 
                        <div className="bg-light p-4 d-flex justify-content-end text-center"> 
                            <ul className="list-inline mb-0"> 
                                <li className="list-inline-item"> 
                                    <h5 className="font-weight-bold mb-0 d-block">215</h5>
                                    <small className="text-muted"><i className="fas fa-image mr-1"></i>Posts</small> 
                                </li> 
                                <li className="list-inline-item"> 
                                    <h5 className="font-weight-bold mb-0 d-block">745</h5>
                                    <small className="text-muted"><i className="fas fa-user mr-1"></i>Followers</small> 
                                </li> 
                                <li className="list-inline-item"> 
                                    <h5 className="font-weight-bold mb-0 d-block">340</h5><small className="text-muted"><i className="fas fa-user mr-1"></i>Following</small> 
                                </li> 
                            </ul> 
                        </div> 
                        <div className="px-4 py-3"> 
                            <h5 className="mb-0">About</h5> 
                            <div className="p-4 rounded shadow-sm bg-light"> 
                                <p className="font-italic mb-0">Web Developer</p> 
                                <p className="font-italic mb-0">Lives in New York</p> 
                                <p className="font-italic mb-0">Photographer</p> 
                            </div> 
                        </div> 
                        {/* <div className="py-4 px-4"> 
                            <div className="d-flex align-items-center justify-content-between mb-3"> 
                                <h5 className="mb-0">Recent photos</h5>
                                <button className="btn btn-link text-muted">Show all</button> 
                            </div> 
                            <div className="row"> 
                                <div className="col-lg-6 mb-2 pr-lg-1">
                                    <img 
                                        src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" 
                                        alt="" 
                                        className="img-fluid rounded shadow-sm" 
                                    />
                                </div> 
                                <div className="col-lg-6 mb-2 pl-lg-1">
                                    <img 
                                        src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" 
                                        alt="" 
                                        className="img-fluid rounded shadow-sm" 
                                    />
                                </div> 
                                <div className="col-lg-6 pr-lg-1 mb-2">
                                    <img 
                                        src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" 
                                        alt="" 
                                        className="img-fluid rounded shadow-sm" 
                                    />
                                </div> 
                                <div className="col-lg-6 pl-lg-1">
                                    <img 
                                        src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" 
                                        alt="" 
                                        className="img-fluid rounded shadow-sm" 
                                    />
                                </div> 
                            </div> 
                        </div>  */}
                    </div> 
                </div>
            </div>
        </>
    )
}

export default Profile;