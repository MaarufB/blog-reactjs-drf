import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function LoginForm(){
    let { loginUser } = useContext(AuthContext);
    return(
        <div className="container mt-3 p-4">
            <h2 className="text-center">Login Form</h2>
            <div className="row justify-content-center">
                <div className="col-md-7 border-radius">
                    <form className="form-group p-2 m-2 border shadow" onSubmit={loginUser}>
                        <div className="m-2">
                            <label className="form-label">username</label>

                            <input
                                className="form-control"
                                name="username"
                                id="username"
                                // onChange={handleChange}
                                // value={post?.post_title}
                                placeholder="username" />
                        </div>

                        <div className="m-2">
                            <label className="form-label">password</label>
                            <input
                                className="form-control"
                                name="password"
                                id="password"
                                // onChange={handleChange}
                                // value={post?.body}
                                type="password"
                                placeholder="password" />
                        </div>

                        <div className="d-flex justify-content-between m-2 p-2">
                            {/* {handleAction()} */}
                            {/* <Link to={"/"}> */}
                                <button type="submit" className="btn btn-dark">Login</button>
                            {/* </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
        // <div className="text-center mt-3">
        //     <h2>Login Form</h2>
        //     <Link to="/"><button>Login</button></Link>
        // </div>
    )
}