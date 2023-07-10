import React from "react";
import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./profilstyle/profilestyle.css";
import userImage from "../../Assets/images/man.png";
import { useContext } from "react";
import { UserContext } from "../userContext/UserContext";

export default function Profile({ close }) {
  const navigate = useNavigate();

  const removeSpace = (name) => {
    if(name)
    return name.replace(/\s/g, "");
  };

  // const handleClose = () => {
  //   if (showProfile === "show") {
  //     setShowProfile("hide");
  //   } else setShowProfile("show");
  // };
  // const user = JSON.parse(localStorage.getItem("user"));
  const user = useContext(UserContext);
  if (user)
    return (
      <main className={`profile-main`}>
        <section className="profile-rw-1">
          <div className="profile-rw-3">
            <img
              src={user.photoURL || userImage}
              alt=""
              height={50}
              width={50}
              style={{ borderRadius: "50%" }}
            />
            <p>{user.displayName}</p>
          </div>

          <hr />
          <div className="profile-rw-2">
            <div className="profile-rw-3">
              <NavLink
              className='profile-link'
                to={`chatter/${user.displayName}`}
                onClick={() => {
                  close()
                }}
              >
                My Blogs
              </NavLink>
            </div>
            <div
              className="profile-rw-3"
              onClick={() => {
                // handleClose();
                close()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-1 h-1"
                width="22px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>

              <NavLink 
              className='profile-link'
              to={`/${user.displayName}-settings`}>
                Account Settings
              </NavLink>
            </div>
          </div>

          <button
            className="profile-logout-btn"
            onClick={() => {
              signOut(auth);
              localStorage.removeItem("user");
              navigate("/");
              close()
            }}
          >
            LogOut
          </button>
          <p>{user.email}</p>
        </section>
      </main>
    );
}
