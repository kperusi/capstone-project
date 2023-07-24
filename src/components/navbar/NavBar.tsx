import React, { useContext, useEffect } from "react";
import "./navStyle.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";
import { useState } from "react";
import userImage from "../../Assets/images/man.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NavMenu from "../nav-menu/AccountMenu";
import Preview from "../preview/Preview";
import Hambuger from "./Hambuger";
import { setMobi_Menu } from "../store/dataSlice";


function NavBar() {
  const [show, setShow] = useState("");
  const [back, setBack] = useState("close");
  const dispatch = useDispatch()

  const showHandler = () => {
  dispatch(setMobi_Menu())
  };
  
const mobi_menu= useSelector((state:any)=>state.data.mobi_menu)
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const number = useSelector((state: any) => state.data.number);
  const photo_Url = useSelector((state: any) => state.data.photo_Url);
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
      <section className={`nav-bar-hambuger`}>
        <Hambuger showHandler={showHandler} mobi_menu={mobi_menu}/>
     


      </section>
      <section className="nav-rw-1 nav-links">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="aboutus" className="link">
          About us
        </NavLink>
        <NavLink to="/contact" className="link">
          Contact
        </NavLink>
        <NavLink to="" className="link">
          Blogs
        </NavLink>
      </section>
      <section className="nav-rw-2 nav-button">
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

      <section className="user-profile">
        {user && (
            <NavMenu imgUrl={user?.photoURL || userImage} />
        
        )}

        {/* <div className={`${showProfile}`}></div> */}
      </section>
    </nav>
  );
}

export default NavBar;
