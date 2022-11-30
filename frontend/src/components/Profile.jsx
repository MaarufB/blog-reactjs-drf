import React from "react";
import axios from "axios";
// import { useContext, useState, useEffect } from "react";

import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import avatar from "../assets/images/avatar.jpg";
import { useNavigate, Link } from "react-router-dom";
import {Utils} from "./Utils.jsx";


const Profile = () => {

    // const [userProfile, setUserProfile] = useState('');
    const {user, authTokens: {access}} = useContext(AuthContext);
    const [profilePic, setProfilePic] = useState("");
    
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);

    const baseURL = `/api`;




    useEffect(() => {
        fetchProfile()
    },[]);
    
    const fetchProfile = () => {
        axios.get(`${baseURL}/user-profile/${user.user_id}`,{
           headers:{
               'Authorization': `Bearer ${access}`
           }
       })
       .then(response => {
           console.log(response.data)
           if (response.status == 200) {
            setUserProfile(response.data);
            const {user_profile} = response.data
            setProfilePic(user_profile?.profile_pic || avatar);
            // console.log(response.data)
        } 
       })
       .catch(error=> {
           if(error.response.status == 401) navigate("/login")
           console.log(error);
       })
   }


   
//    return <>
//     <h1>Hello</h1>
//    </>
    return (
        <>
            <div className="container justify-content-center my-4 shadow p-4 container-min">
                <div className="row justify-content-center">
                    <div className="col-6 p-2">
                        <div className="container header">
                            <h2>Hi, I am {userProfile?.first_name || ""}</h2>
                            <p className=""></p>
                        </div>
                        <div className="container p-3">
                            <h5>General Info</h5>
                            <div className="row m-0">
                                <p className="col-3 my-0">username: </p>
                                <p className="col my-0">{userProfile?.username || ""}</p>
                            </div>
                            <div className="row m-0">
                                <p className="col-3 my-0">email:</p>
                                <p className="col my-0">{userProfile?.email || ""}</p>
                            </div>
                            <div className="row m-0">
                                <p className="col-3 my-0">address:</p>
                                <p className="col my-0">Pagadian City, Zamboanga</p>
                            </div>
                        </div>
                        <Link to={`/profile/update/${userProfile?.id}`}>
                            <button className="btn btn-dark btn-sm">Update</button>
                        </Link>
                    </div>
                    <div className="col-4 p-2">
                        <img 
                            className="img-fluid"
                            src={userProfile ?.profile_pic || avatar}
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