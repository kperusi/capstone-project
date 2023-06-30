import React, { useContext } from "react";
import "./navStyle.css";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../userContext/UserContext";
import Profile from "../profile/Profile";
import { useState } from "react";
import userImage from "../../Assets/images/man.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";

function NavBar() {
  const navigate = useNavigate();
  const [user]= useAuthState(auth)
  const [showProfile, setShowProfile] = useState("hide");
  const handleProfleShow = () => {
    if (showProfile === "hide") {
      setShowProfile("show");
    } else setShowProfile("hide");
  };
if(user){
  // console.log(user.photoURL)
}

 
  
  return (
    <nav className="nav-main">
      <section>
        <h1 className="nav-logo">CHATTER</h1>
      </section>
      <section className="nav-links">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="aboutus" className="link">
          About us
        </NavLink>
        <NavLink to="/contact" className="link">
          Contact
        </NavLink>
        <NavLink className="link">Blogs</NavLink>
      </section>
      <section className="nav-button">
        <button
          className={`${user ? "log-hide" : "log-show"} login-btn`}
          onClick={() => {
            navigate("signup/login");
          }}
        >
          Log in
        </button>
        <button
          className={`${user ? "log-hide" : "log-show"} signin-btn`}
          onClick={() => {
            navigate("signup");
          }}
        >
          Sign up
        </button>
      </section>
      <section></section>

      <section className="user-profile">
        {user && (
          <div>
            <div className="nav-user-profile-image-cx"
              onClick={() => {
                handleProfleShow();
              }}
            >
              <img src={user.photoURL||userImage} alt="" className="nav-user-image"/>
            </div>
          </div>
        )}
        <div className={`${showProfile}`}>
          <Profile showProfile={showProfile} setShowProfile={setShowProfile} />
        </div>
      </section>
    </nav>
  );
}

export default NavBar;
