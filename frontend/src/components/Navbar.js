import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import avatar from "../assets/images/avatar.jpg";

const NavBar = () =>{
    let {user, logoutUser, userProfile} = useContext(AuthContext);
    
    const profile_pic = user ? userProfile : avatar;

    return (
        user ? (
            <>
                <nav
                    className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark"
                    aria-label="Eighth navbar example">

                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07"
                            aria-controls="navbarsExample07"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse justify-content-center"
                            id="navbarsExample07">

                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" aria-current="page">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className="nav-link active" aria-current="page">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/post/create" className="nav-link active" aria-current="page">
                                        Create
                                    </Link>
                                </li>
                                <li className="nav-item" style={{ cursor: "pointer" }}>
                                    <p className="nav-link active" aria-current="page" onClick={logoutUser}>
                                        Logout
                                    </p>
                                </li>
                                        {/* <li className="nav-item">
                                    <a className="nav-link" href="#">Link</a>
                                </li> 
                                    <li className="nav-item">
                                    <a className="nav-link disabled">Disabled</a>
                                </li> 
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                </ul>
                                            </li>
                                        
                                        <form role="search">
                                    <input 
                                        className="form-control" 
                                        type="search" 
                                        placeholder="Search" 
                                        aria-label="Search" />
                                    
                            </form> 
                            */}
                            
                            </ul>
                        </div>
                        <div className="d-flex align-items-center">
      {/* <!-- Icon --> */}
      <a className="link-secondary me-3" href="#">
        <i className="fas fa-shopping-cart"></i>
      </a>

      {/* <!-- Notifications --> */}
      <div className="dropdown">
        <a  
          className="link-secondary me-3 dropdown-toggle hidden-arrow"
          href="#"
          id="navbarDropdownMenuLink"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fas fa-bell"></i>
          <span className="badge rounded-pill badge-notification bg-success">1</span>
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <li>
            <a className="dropdown-item" href="#">Some news</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Another news</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Something else here</a>
          </li>
        </ul>
      </div>
      {/* <!-- Avatar --> */}
      <div className="dropdown">
        <a
          className="dropdown-toggle d-flex align-items-center hidden-arrow"
          href="#"
          id="navbarDropdownMenuAvatar"
          role="button"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          <img
          // https://media-exp1.licdn.com/dms/image/C4D03AQEv-vwlqnX7Zw/profile-displayphoto-shrink_200_200/0/1622088978783?e=1668038400&v=beta&t=UFKCg2vcXrauuWsdrf9no_abwmTt54Nl63lsd31dV-w
            src={profile_pic}
            className="rounded-circle"
            height="25"
            alt="Black and White Portrait of a Man"
            loading="lazy"
          />
        </a>
        <ul
          aria-labelledby="navbarDropdownMenuAvatar"
          className="dropdown-menu dropdown-menu-end"
        >
          <li>
            <a className="dropdown-item" href="#">My profile</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Settings</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
                    </div>
                </nav>
            </>
        ):(
                <nav
                    className="navbar navbar-expand-lg navbar-dark bg-dark"
                    aria-label="Eighth navbar example">

                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample07"
                            aria-controls="navbarsExample07"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarsExample07">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link active" aria-current="page">
                                        Register
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link active" aria-current="page">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        )
 
    );
}

export default NavBar;