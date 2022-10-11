import React from "react";
import axios from "axios";
// import { useContext, useState, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import avatar from "../assets/images/avatar.jpg";
import { useNavigate, Link } from "react-router-dom";
import {Utils} from "./Utils.js";


const Profile = () => {

    // const [userProfile, setUserProfile] = useState('');
    const {user, userProfile, authTokens: {access}} = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(() =>
        user ? userProfile : null
    );
    
    const navigate = useNavigate();

    const [profile, setProile] = useState("");

    const baseURL = `/api`;

    const fetchProfile = () => {
         axios.get(`${baseURL}/user-profile/${user.user_id}`,{
            headers:{
                'Authorization': `Bearer ${access}`
            }
        })
        .then(response => {
            console.log(response.data)
            if (response.status == 200) setProile(response.data); 
            // console.log(response.data);
        })
        .catch(error=> {
            if(error.response.status == 401) navigate("/login")
            console.log(error);
        })
    }

    useEffect(() => {
        fetchProfile()
    },[])


    return (
        <>
            <div className="container justify-content-center my-4 shadow p-4 container-min">
                <div className="row justify-content-center">
                    <div className="col-6 p-2">
                        <div className="container header">
                            <h2>Hi, I am {profile?.first_name}</h2>
                            <p className="">loresasfdfd</p>
                        </div>
                        <div className="container p-3">
                            <h5>General Info</h5>
                            <div className="row m-0">
                                <p className="col-3 my-0">username:</p>
                                <p className="col my-0">{profile?.username}</p>
                            </div>
                            <div className="row m-0">
                                <p className="col-3 my-0">email:</p>
                                <p className="col my-0">{profile?.email}</p>
                            </div>
                            <div className="row m-0">
                                <p className="col my-0">Pagadian City, Zamboanga</p>
                            </div>
                                <p className="col-3 my-0">address:</p>
                        </div>
                        <Link to={`/profile/update/${user.user_id}`}>
                            <button className="btn btn-dark btn-sm">Update</button>
                        </Link>
                    </div>
                    <div className="col-4 p-2">
                        <img 
                            className="img-fluid"
                            src={profile?.profile_pic || avatar}
                        />
                    </div>
                </div>
                <hr />
                <div className="row">
                    <h2>Number of posts!</h2>  
                </div>
            </div>
            <hr />
        </>
    )
}

export default Profile;