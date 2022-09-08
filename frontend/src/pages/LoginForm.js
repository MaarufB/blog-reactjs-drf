import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function LoginForm(){
    const [loginCredential, setLoginCredential] = useState({
        username:"",
        password:""
    })

    let { loginUser } = useContext(AuthContext);
    let handleChange = (event) => {
        const inputs = {...loginCredential, [event.target.name]:event.target.value}
        setLoginCredential(inputs);
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        loginUser(loginCredential.username, loginCredential.password);
    }
    
    return(
        <div className="container mt-3 p-4">
            <h2 className="text-center">Login Form</h2>
            <div className="row justify-content-center">
                <div className="col-md-7 border-radius">
                    <form className="form-group p-2 m-2 border shadow">
                        <div className="m-2">
                            <label className="form-label">username</label>

                            <input
                                className="form-control"
                                name="username"
                                id="username"
                                onChange={handleChange}
                                value={loginCredential?.username}
                                placeholder="username" />
                        </div>

                        <div className="m-2">
                            <label className="form-label">password</label>
                            <input
                                className="form-control"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                value={loginCredential?.password}
                                type="password"
                                placeholder="password" />
                        </div>

                        <div className="d-flex justify-content-between m-2 p-2">
                            <button onClick={handleSubmit} type="submit" className="btn btn-dark">Login</button>
                            <Link to="/register">
                                <p className="text-primary" style={{ cursor:"pointer", textDecoration:"underline"}}>
                                        Register
                                </p>
                            </Link>
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