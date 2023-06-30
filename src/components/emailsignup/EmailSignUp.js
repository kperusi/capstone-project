import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
import logo1 from "../../Assets/images/linkedin-sales-solutions-0QvTyp0gH3A-unsplash.jpg";
import "./emailsignupstyle.css";
import { app } from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function EmailSignUp() {
 
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [validconPass, setValidConPass] = useState(false);
  const navigate = useNavigate();



  const handleSignIn = async (e) => {
    e.preventDefault();
 
    try {
      setName(firstName+lastName) 
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: firstName +" "+lastName });
      navigate("/feeds");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="create-account-main">
      <section className="create-account-content-rw">
        <h1 className="">Register as a Writer/Reader</h1>

        <form action="" className="create-account-form">
          <div className="full-name-cx  ">
            <div className="first-name-cx">
              <label htmlFor="label-full-name">First name</label>
              <input
                className="name-input"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="last-name-cx">
              <label htmlFor="label-last-name">Last name</label>
              <input
                className="name-input"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="create-account-form-email create-account-form-div ">
            <label htmlFor="label-full-email">You are joining as?</label>

            <select className="other-form-inputs">
              <option value="Reader">Reader</option>
              <option value="">Writers</option>
            </select>
          </div>
          <div className="create-account-form-email create-account-form-div ">
            <label htmlFor="label-full-email">Email Address</label>

            <input
              className="other-form-inputs"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="create-account-form-password create-account-form-div">
            <label htmlFor="label-full-name">Password</label>

            <input
              className="other-form-inputs"
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="create-account-form-confirm-password create-account-form-div">
            <label htmlFor="label-full-confirm-password">
              Confirm Password
            </label>

            <input
              className="other-form-inputs"
              type="password"
              // oInput={(e) => setConPassword(e.target.value)}
              onChange={() => {
                setValidConPass(false);
              }}
            />
          </div>
          {validconPass && (
            <p
              style={{ color: "red", marginTop: "-20px", marginBottom: "20px" }}
            >
              Please confirm your password
            </p>
          )}

          <button
            className="create-account-form-btn"
            onClick={(e) => {
              handleSignIn(e);
            }}
          >
            Create Account
          </button>
        </form>
        <div className="or-div">
          <span className="or-span"></span>
          <h5 className="or">OR</h5>
          <span className="or-span"></span>
        </div>

        <div className="signup-btn-cx">
          <p>Sign up with Google</p>
        </div>
        <div className="signup-btn-cx">
          <p>Sign up with LinkedIn</p>
        </div>
        <div className="signup-btn-cx">
          <img src="" alt="" />
          <p>Sign up with Facebook</p>
        </div>
      </section>
    </main>
  );
}
