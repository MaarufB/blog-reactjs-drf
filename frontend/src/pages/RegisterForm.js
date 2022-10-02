import { Link, Navigate } from "react-router-dom"
import { useState, useContext } from "react"
import AuthContext from "../context/AuthContext"

export default function RegisterForm(){
    let [userCredential, setUserCredential] =  useState({
        first_name:"",
        last_name:"",    
        username:"",
        password:"",
        password2:""
    });

    let {registerUser} = useContext(AuthContext);


    const handleChange = (event) => {
        const inputs = {...userCredential, [event.target.name]:event.target.value}
        setUserCredential(inputs);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser(
            userCredential.first_name,
            userCredential.last_name,
            userCredential.username, 
            userCredential.password, 
            userCredential.password2
            );
    }

    return(
        <div className="container mt-3 p-4">
            <h2 className="text-center">Register Form</h2>
            <div className="row justify-content-center">
                <div className="col-md-7 border-radius">
                    <form className="form-group p-2 m-2 border shadow">
                        
                    <div className="m-2">
                            <label className="form-label">first name</label>

                            <input
                                className="form-control"
                                name="first_name"
                                id="first_name"
                                onChange={handleChange}
                                value={userCredential?.first_name}
                                placeholder="first name" />
                        </div>

                        <div className="m-2">
                            <label className="form-label">last name</label>

                            <input
                                className="form-control"
                                name="last_name"
                                id="last_name"
                                onChange={handleChange}
                                value={userCredential?.last_name}
                                placeholder="last name" />
                        </div>

                        <div className="m-2">
                            <label className="form-label">username</label>

                            <input
                                className="form-control"
                                name="username"
                                id="username"
                                onChange={handleChange}
                                value={userCredential?.username}
                                placeholder="username" />
                        </div>

                        <div className="m-2">
                            <label className="form-label">password</label>
                            <input
                                className="form-control"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                value={userCredential?.password}
                                type="password"
                                placeholder="password" />
                        </div>
                        <div className="m-2">
                            <label className="form-label">Confirm Password</label>
                            <input
                                className="form-control"
                                name="password2"
                                id="password2"
                                onChange={handleChange}
                                value={userCredential?.password2}
                                type="password"
                                placeholder="Confirm Password" />
                        </div>
                        {(userCredential.password2 !== userCredential.password) ? 
                            (<p style={{color:"red"}}>Password do not match</p>):(<></>)    
                    }
                        <div className="d-flex justify-content-between m-2 p-2">
                            {/* {handleAction()} */}
                            {/* <Link to={"/"}> */}
                            <button onClick={handleSubmit} className="btn btn-dark">Register</button>
                            {/* </Link> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}