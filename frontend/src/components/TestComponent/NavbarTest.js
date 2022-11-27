import React from "react";
import { Link } from "react-router-dom"
import "../../App.css";

export default function NavBarTest(){
    
    return(
        <nav
            className="navbar sticky-top navbar-expand-lg shadow test"
            aria-label="Eighth navbar example"
            // style={{
            //     backgroundColor:"#F76C6C" 
            // }}
            >
            
            <div className="container">
                        {/* <Link to="/" className="navbar-brand">Blog</Link> */}

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
                // justify-content-center
                    className="collapse navbar-collapse"
                    id="navbarsExample07">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">HOME</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">PROFILE</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/post/create" className="nav-link active" aria-current="page">CREATE</Link>
                        </li>    
                        <li className="nav-item">
                            <Link to="/post/create" className="nav-link active" aria-current="page">CREATE</Link>
                        </li>    
                        <li className="nav-item">
                            <Link to="/post/create" className="nav-link active" aria-current="page">CREATE</Link>
                        </li>        
                    </ul>
                </div>

{/* Right element */}
{/* <!-- Right elements --> */}
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
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
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
    {/* <!-- Right elements --> */}
            </div>
        </nav>
    )
}