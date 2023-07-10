import React, { useState } from "react";
import logo1 from "../../Assets/images/linkedin-sales-solutions-0QvTyp0gH3A-unsplash.jpg";
import googleicon from "../../Assets/images/vecteezy_google-search-icon-google-product-illustration_12871371_811.png";
import linkedinicon from "../../Assets/images/linkedinicon.png";
import "./signupstyle/signupstyle.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState("");

  const handleToggleChange = (option) => {
    setToggle(option);
  };
  // console.log(toggle);
  return (
    <main className="signup-main">
      <section className="signup-logo-cx" aria-label="image-container">
        <img src={logo1} alt="" className="signup-logo" />
      </section>

      <section className="signup-content">
        <div className="signup-header-wrap">
          <div className="signup-header">
            <NavLink
              to="register"
              className="signup-navlink"
              onClick={() => {
                handleToggleChange("register");
              }}
            >
              REGISTER
            </NavLink>
            <NavLink
              to="login"
              className="signup-navlink"
              onClick={() => {
                handleToggleChange("login");
              }}
            >
              LOG IN
            </NavLink>
          </div>
          <div className="signup-indicator">
            <span className={`"signup-motion-indicator" ${toggle}`}></span>
          </div>
        </div>

        <Outlet className="outlet" />
      </section>
    </main>
  );
}
