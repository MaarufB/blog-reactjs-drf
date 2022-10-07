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

const initialData = {
    email: "maarufb@gmail.com",
    first_name: "Ma-aruf",
    id: 1,
    last_name: "Burad",
    profile_pic: "/media/profile/michael-jordan-looks_bk8dpeS.jpg",
    test_data: "d",
    user_id: 1,
    username: "maarufb"
}

const ProfileForm = (props) => {

    const [profile, setProfile] = useState({
        profile_pic: ""
    });
    const [imageProfile, setImageProfile] = useState(null);
    const baseURL = "/api";
    const params = useParams();
    const {authTokens} = useContext(AuthContext);
    const {access, refresh} = authTokens;

    // path('user-profile/', profile_view.ProfilePostAPIView.as_view()),
    // path('user-profile/<int:pk>/', profile_view.ProfileAPIView.as_view(), name='user-profile'),

    useEffect(() => {
        if(params.id) fetchProfile();
    },[])

    const fetchProfile = async () => {
        await axios.get(`${baseURL}/user-profile/${params.id}`, {
            headers: {
                'Authorization': `Bearer ${access}`
            }
        })
        .then(response => {
            setProfile(response.data);
            console.log(response.data)
        })
        .catch(error => {
            console.log(error);
        })
    }

    
    const updateProfile = async () => {
        if (imageProfile!=null){
            const formData = new FormData();
            formData.append('profile_pic', imageProfile);
            console.log('update clicked')
            await axios.put(`${baseURL}/user-profile/${params.id}/`, formData,{
                headers:{
                'Authorization': `Bearer ${access}`,
                'Content-Type': "multipart/form-data"
            }
            })
            .then(({data}) => {
                console.log(`Success ${data}`)
            })
            .catch(({response}) => {
                console.log(response);
            }) 
        }
    }

    const handleChange = (event) => {
        const eventData = {...profile, [event.target.name]:event.target.value};
        setProfile(eventData);
        if (event.target.name === "profile-image") {
            setImageProfile(event.target.files[0]);
        }
        console.log(eventData);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (imageProfile){
            updateProfile();
        }
    }

    return(
        <>
            <div className="container py-3 justif-content-center">
                <h2>Update Profile</h2>
                <p>{profile.first_name}</p>
                <p>{profile.last_name}</p>
                <p>{profile.username}</p>
                <p>{profile.profile_pic}</p>

                <h2>Form</h2>
                <div className="row justify-content-center">
                    <div className="col-md-7 border-radius border border-danger">
                        <form className="form-group p-2">
                            <div>
                                <label>Profile Picture</label>
                                <input 
                                    className="form-control input-field"
                                    name="profile-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button 
                                    className="btn btn-primary"
                                    onClick={
                                        (event)=>{
                                            event.preventDefault();
                                            updateProfile();
                                        } 
                                    }
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