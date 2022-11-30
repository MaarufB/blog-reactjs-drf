import React from "react";
import axios from "axios";
import { 
    useState, 
    useEffect, 
    useContext 
} from "react"
import { 
    useNavigate, 
    Link, 
    useParams 
} from "react-router-dom";

import AuthContext from "../context/AuthContext";

const ProfileForm = (props) => {
    

    const params = useParams();
    const navigate = useNavigate();
    const initialData = {
        // user_id: params.id,
        first_name: "",
        last_name: "",
        address: ""
    }
    const [profile, setProfile] = useState(initialData);


    const [imageProfile, setImageProfile] = useState(null);
    const baseURL = "/api";

    const {authTokens} = useContext(AuthContext);
    const {access, refresh} = authTokens;

    // path('user-profile/', profile_view.ProfilePostAPIView.as_view()),
    // path('user-profile/<int:pk>/', profile_view.ProfileAPIView.as_view(), name='user-profile'),

    useEffect(() => {
        if(params.id) fetchProfile();
    },[])

    const fetchProfile = async () => {
        await axios.get(`${baseURL}/user-profile/${params?.id}`, {
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
        .then(response => {
            const {user_profile} = response.data;
            console.log(response.data)
            if(user_profile){
                setProfile(user_profile);
            }
            else{
                setProfile(initialData);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    // console.log(`user profile: ${profile.profile_pic}`)
    
    const updateProfile = () => {
        const formData = new FormData();
        // formData.append('profile_pic', imageProfile);
        if (imageProfile){
            // navigate("/profile")
            formData.append('profile_pic', imageProfile);
            // return
        } 

        formData.append("first_name", profile.first_name);
        formData.append("last_name", profile.last_name);
        formData.append("user_id", params.id);
        // formData.append('profile_id', profile.user_profile.id);
        formData.append("address", profile.address);

        axios.put(`${baseURL}/user-profile/${params.id}/`, formData,{
            headers:{
            'Authorization': `Bearer ${access}`,
            'Content-Type': "multipart/form-data"
        }
        })
        .then((response) => {
            // if(response.status == 200) navigate("/profile")
        })
        .catch((error) => {
            console.log(error);
        }) 
    }

    const handleChange = (event) => {
        const eventData = {...profile, [event.target.name]:event.target.value};
        
        if (event.target.name === "profile_pic") {
            setImageProfile(event.target.files[0]);
        }
        setProfile(eventData);
        
        console.log(eventData);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProfile();

    }

    return(
        <>
            <div className="container my-4 justif-content-center container-min">
                <h2 className="text-center py-3">Update Profile</h2>
                <div className="row justify-content-center">
                    <div className="col-md-7 border-radius shadow">
                        <form className="form-group p-2">
                            <div className="mb-2">
                                <label>First Name</label>
                                <input 
                                    className="form-control input-field"
                                    name="first_name"
                                    type="text"
                                    id="first_name"
                                    placeholder="First Name"
                                    value={profile?.first_name}
                                    onChange={handleChange}
                                    >
                                
                                </input>
                            </div>
                            <div className="mb-2">
                                <label>Last Name</label>
                                <input 
                                    className="form-control input-field"
                                    name="last_name"
                                    type="text"
                                    id="last_name"
                                    placeholder="Last Name"
                                    value={profile?.last_name}
                                    onChange={handleChange}
                                    
                                    >
                                
                                </input>
                            </div>
                            <div className="mb-2">
                                <label>address</label>
                                <input 
                                    className="form-control input-field"
                                    name="address"
                                    type="text"
                                    id="address"
                                    placeholder="address"
                                    value={profile?.address}
                                    onChange={handleChange} 
                                    
                                    >
                                </input>
                            </div>
                            <div className="mb-2">
                                <label>Profile Picture</label>
                                <input 
                                    className="form-control input-field"
                                    name="profile_pic"
                                    type="file"
                                    id="profile_pic"
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-2">
                                <button 
                                    className="btn btn-primary"
                                    onClick={ handleSubmit}
                                    >Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileForm;