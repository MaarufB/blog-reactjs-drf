import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";



const PostList = (props) => {
    const postTitle = props.title;
    // const {user} = useContext(AuthContext);

    // const baseURL = "http://127.0.0.1:8000/api";

    // const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     fetchPost();
    // }, []);

    // const fetchPost = async () => {
    //     await axios.get(`${baseURL}/blog`)
    //         .then(response => {
    //             console.log(response.data);
    //             setPosts(response.data);
    //         })
    //         .catch(error => {
    //             console.log(`errors\n${error}`);
    //         })
    // }

    // <div className="container mt-3 border shadow">
    //     {posts.map(item => (
    //         <PostList
    //             key={item.id}
    //             id={item.id}
    //             title={item.post_title}
    //             image={item.image}
    //             titleDescription={item.body}
    //         />
    //     ))}

    return (
        <div className="row justify-content-center m-4 border shadow">
    <div className="col-lg-7 col-sm-7 col-md-7 col-7 my-2">
        <div className="container mt-3 mb-3 p-1">
            <div className="mb-3">
                <p className="fw-lighter m-0">June 12,2021</p>
                <p className="fw-bold m-0">Ma-aruf Burad</p>
            </div>
            <div className="">
                <h3>{postTitle}</h3>
            </div>
            <div className="container">
                <img className="img-fluid" src={props.image} />
                <p>{props.image}</p>
            </div>
            <div className="d-flex justify-content-between">
                <Link to={`/post/${props.id}`}>
                    <button className="btn btn-primary">View</button>
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





// <>
//     {posts.map((post) => (
//         <div className="row justify-content-center m-4 border border-danger">
//             <div className="col-lg-7 col-sm-7 col-md-7 col-7 my-2">
//                 <div className="container mt-3 mb-3 p-1">
//                     <div className="mb-3">
//                         <p className="fw-lighter m-0">June 12,2021</p>
//                         <p className="fw-bold m-0">Ma-aruf Burad</p>
//                     </div>
//                     <div className="">
//                         <h3>{post.post_title}</h3>
//                     </div>
//                     <div className="container">
//                         <img className="img-fluid" src={post.image} />
//                         {/* <p>{props.image}</p> */}
//                     </div>
//                     <div className="d-flex justify-content-between">
//                         <Link to={`/post/${post.id}`}>
//                             <button className="btn btn-primary">View</button>
//                         </Link>
//                         <Link to={`/post/update/${post.id}`}>
//                             <button className="btn btn-primary">Update</button>
//                         </Link>
//                         <Link to={`/post/delete/${post.id}`}>
//                             <button className="btn btn-primary">Delete</button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     ))}
// </>