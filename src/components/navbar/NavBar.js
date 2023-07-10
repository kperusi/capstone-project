import React, { useContext, useEffect } from "react";
import "./navStyle.css";
import { NavLink, useNavigate } from "react-router-dom";

import { UserContext } from "../userContext/UserContext";
import Profile from "../profile/Profile";
import { useState } from "react";
import userImage from "../../Assets/images/man.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";

function NavBar() {
  const navigate = useNavigate();
  const [user]= useAuthState(auth)
  const number = useSelector((state) => state.data.number);
  const photo_Url= useSelector((state)=>state.data.photo_Url)
  const [showProfile, setShowProfile] = useState("hide");
  const handleProfleShow = () => {
    if (showProfile === "hide") {
      setShowProfile("show");
    } else setShowProfile("hide");
  };

  if (user) {
    // console.log(user);
  }

  return (
    <nav className="nav-main">
      <section>
        <h1 className="nav-logo">{number}</h1>
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
            <Popup trigger={<div
              className="nav-user-profile-image-cx"
            >
              <img
                src={user.photoURL || userImage}
                alt={photo_Url||''}
                className="nav-user-image"
              />
            </div>}
            position='bottom right'
            contentStyle={{width:'310px'}}
            
            >
              {(close)=>(<section>
                <Profile close={close} />

              </section>)}
            </Popup>


            
          </div>
        )}
        
        <div className={`${showProfile}`}>
        </div>
      </section>
    </nav>
  );
}

export default NavBar;
