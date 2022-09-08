import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const PostList = (props) => {
    const postTitle = props.title;
    const {user} = useContext(AuthContext);

    return (
        <div className="row justify-content-center">
            <div className="col-lg-9 col-sm-9 col-md-9 col-9 my-2">
                <div className="container mt-3 mb-3 p-1">                                           
                    <div className="mb-3">
                        <p className="fw-lighter m-0">June 12,2021</p>
                        <p className="fw-bold m-0">Ma-aruf Burad</p>
                    </div>
                    <div className="">
                        <h3>{postTitle}</h3>
                    </div>
                    <div className="container">
                        <img className="img-fluid" src={props.image}/>
                        <p>{props.image}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link to={`/post/${props.id}`}>
                            <button className="btn btn-primary">View</button>
                        </Link>
                        <Link to="/post/create">
                            <button className="btn btn-primary">Add</button>
                        </Link>
                        <Link to={`/post/update/${props.id}`}>
                            <button className="btn btn-primary">Update</button>
                        </Link>
                        <Link to={`/post/delete/${props.id}`}>
                            <button className="btn btn-primary">Delete</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostList;