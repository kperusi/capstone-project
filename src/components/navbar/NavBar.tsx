import React, { useContext, useEffect } from "react";
import "./navStyle.css";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";
import { useState } from "react";
import userImage from "../../Assets/images/man.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import Hambuger from "./Hambuger";
import { handleSelected, setForYou, setMobi_Menu } from "../store/dataSlice";
import Popup from "reactjs-popup";

function NavBar() {
  // const [show, setShow] = useState("");
  // const [back, setBack] = useState("close");
  const dispatch = useDispatch();
  const user = useContext(UserContext);
  const showHandler = () => {
    dispatch(setMobi_Menu());
  };
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const mobi_menu = useSelector((state: any) => state.data.mobi_menu);
  const navigate = useNavigate();
  // const [user] = useAuthState(auth);
  const number = useSelector((state: any) => state.data.number);
  const photo_Url = useSelector((state: any) => state.data.photo_Url);
  // const [showProfile, setShowProfile] = useState("hide");

  if (user) {
    // console.log(user);
  }

  return (
    <nav className="nav-main">
      <section>
        <h1 className="nav-logo">{number}</h1>
      </section>
      <section className={`nav-bar-hambuger`}>
        <Hambuger showHandler={showHandler} mobi_menu={mobi_menu} />
      </section>
      <section className="nav-rw-1 nav-links">
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="about" className="link">
          About us
        </NavLink>
        <NavLink to="/contact" className="link">
          Contact
        </NavLink>
        <NavLink
          to="chatter/feed"
          className="link"
          onClick={() => {
            dispatch(setForYou());
            dispatch(handleSelected("feed"));
          }}
        >
          Blogs
        </NavLink>
      </section>
      <section className="nav-rw-2 nav-button">
        <button
          className={`${user ? "log-hide" : "log-show"} signin-btn`}
          onClick={() => {
            navigate("signup");
          }}
        >
          Get Started
        </button>
      </section>

      <section className="user-profile">
        {user && (
          <div onClick={() => setOpen((o) => !o)}>
            <img
              style={{ borderRadius: "50%" }}
              src={user?.photoURL || userImage}
              alt=""
              height="50"
              width={50}
            />
          </div>
        )}

        <Popup
          open={open}
          closeOnDocumentClick
          onClose={closeModal}
          position="top center"
          contentStyle={{
            top: "-20px",
            marginRight: "20px",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            padding: "20px 10px",
            borderRadius: "5px",
          }}
        >
          <header className="nav-sub-profile">
            <section className="nav-profile-rw-1">
              <div className="profile-rw-3">
                <img
                  src={user?.photoURL || userImage}
                  alt=""
                  height={50}
                  width={50}
                  style={{ borderRadius: "50%" }}
                />
                <p>{user?.displayName}</p>
              </div>

              <hr />
              <div className="profile-rw-2">
                <div className="profile-rw-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path d="M480-242q-67 0-129 23.5T235-149v9h490v-9q-54-46-116-69.5T480-242Zm0-60q74 0 139.5 24.5T740-211v-609H220v609q55-42 120.5-66.5T480-302Zm2-139q-32.5 0-55.25-22.75T404-519q0-32.5 22.75-55.25T482-597q32.5 0 55.25 22.75T560-519q0 32.5-22.75 55.25T482-441ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h520q24 0 42 18t18 42v680q0 24-18 42t-42 18H220Zm262-301q58 0 98-40t40-98q0-58-40-98t-98-40q-58 0-98 40t-40 98q0 58 40 98t98 40Zm-2-138Z" />
                  </svg>
                  <NavLink
                    className="profile-link"
                    to={`/chatter/mystories`}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    My stories
                  </NavLink>
                </div>
                <div
                  className="profile-rw-3"
                  onClick={() => {
                    closeModal();
                    // handleClose();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="28"
                    viewBox="0 -960 960 960"
                    width="28"
                  >
                    <path d="M576-40q-25 0-42.5-17.5T516-100v-280q0-25 17.5-42.5T576-440h280q25 0 42.5 17.5T916-380v280q0 25-17.5 42.5T856-40H576Zm0-60h280v-32q-25-31-61-49.5T716-200q-43 0-79 18.5T576-132v32Zm140-140q25 0 42.5-17.5T776-300q0-25-17.5-42.5T716-360q-25 0-42.5 17.5T656-300q0 25 17.5 42.5T716-240ZM480-480Zm0-130q-54 0-92 38t-38 92q0 43 24 76t62 47v-68q-11-9-18.5-24.5T410-480q0-29 20.5-49.5T480-550q18 0 33 8t24 22h66q-13-39-46.5-64.5T480-610ZM388-80l-20-126q-19-7-40-19t-37-25l-118 54-93-164 108-79q-2-9-2.5-20.5T185-480q0-9 .5-20.5T188-521L80-600l93-164 118 54q16-13 37-25t40-18l20-127h184l20 126q19 7 40.5 18.5T669-710l118-54 93 164-108 80v1-1h-61q-1-7-2-13.5t-3-13.5l94-69-40-72-106 46q-23-26-52-43.5T538-708l-14-112h-88l-14 112q-34 7-63.5 24T306-642l-106-46-40 72 94 69q-4 17-6.5 33.5T245-480q0 17 2.5 33.5T254-413l-94 69 40 72 106-46q26 26 59.5 43.5T436-249v169h-48Z" />
                  </svg>

                  <NavLink
                    className="profile-link"
                    to={`/${user?.displayName}`}
                  >
                    Account Settings
                  </NavLink>
                </div>
              </div>

              <hr />
              <div style={{display:'flex', gap:'5px',marginTop:'20px'}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  viewBox="0 -960 960 960"
                  width="28"
                >
                  <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
                </svg>


                <button
                className="nav-profile-logout-btn"
                onClick={() => {
                  signOut(auth);
                  localStorage.removeItem("user");
                  navigate("/");
                  closeModal();
                }}
              >
                LogOut
              </button>
              </div>
             
              <p style={{ color: "grey" }}>{user?.email}</p>
            </section>
          </header>
        </Popup>
      </section>
    </nav>
  );
}

export default NavBar;
