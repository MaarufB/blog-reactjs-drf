import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const PostView = (props) => {
    const baseURL = "http://127.0.0.1:8000/api";

    const {id} = useParams();
    const navigate = useNavigate();
    
    const [post, setPost] = useState(null);
   
    useEffect(() => {
        fetchPostById(id);
    }, []);

    const fetchPostById = async () => {
        await axios.get(`${baseURL}/blog/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error =>{
                console.log(error);
            })
    }

    return (
        <div className="container mt-3 p-3">
            <div className="container p-4">
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="container">
                            <div className="mb-3">
                                <p className="fw-lighter m-0">June 12,2021</p>
                                <p className="fw-bold m-0">Ma-aruf Burad</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12 mt-2">
                                    <h2 className="fw-bold mb-4">{post?.post_title}</h2>
                                    <p>
                                        he talks about the side hustles and strange ways to have a healthy and constant income. The website talks about how the wife from the couple escaped her 9 to 5 job and how they have a stable income source without having a full-time job.
                                    </p>
                                </div>
                                <div className="col-12 p-3">
                                    <div className="d-flex justify-content-center">
                                        <img className="img-fluid" 
                                            src={post?.image} 
                                            alt="post"
                                            height="100"
                                            width="720" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-8">
                        <form action="" method="#" class="p-3">
                            <textarea class="form-control" placeholder="Type your comment here..." rows="2"></textarea>
                            <button class="btn btn-primary mt-2">Post</button>
                        </form>
                        <hr />
                    </div>
                </div>
    
                <div class="container p-4">
                    <div class="row m-3 justify-content-center">
                        <h2 class="text-center mb-3">Comments</h2>
                        <div class="col-8 p-2 mb-2">
                            <div class="">
                                {/* <p class="m-0" style="font-weight: bold;">MA-ARUF BURAD SAYS</p> */}
                                {/* <p style="font-style: italic;">June 18, 2022</p> */}
                            </div>
                            <div>
                                <p>he talks about the side hustles and strange ways to have a healthy and constant income. The website talks about how the wife from the couple escaped her 9 to 5 job and how they have a stable income source without having a full-time job. </p>
                            </div>
                            <a href="#">Reply</a>
                            <hr />
                        </div>
                        <div class="col-8 p-2 mb-2">
                            <div class="">
                                {/* <p class="m-0" style="font-weight: bold;">MA-ARUF BURAD SAYS</p> */}
                                <p style={{fontStyle: "italic"}}>June 18, 2022</p>
                            </div>
                            <div>
                                <p>he talks about the side hustles and strange ways to have a healthy and constant income. The website talks about how the wife from the couple escaped her 9 to 5 job and how they have a stable income source without having a full-time job. </p>
                            </div>
                            <a href="#">Reply</a>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostView;

