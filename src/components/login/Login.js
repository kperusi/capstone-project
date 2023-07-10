import React, { useState } from "react";
import "./loginstyle/loginstyle.css";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
// import {useAuthState} from 'react-firebase-hooks/auth'
export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        navigate("/chatter");
        setLoading(false);
      });
    } catch (error) {
      console.log(error.code);
      setLoading(false);
    }
  };

  // console.log(email)
  return (
    <main className="login-main">
      <section className="login-content-rw">
        <h1 className="">Welcom Back</h1>

        <form className="login-form">
          <div className="login-form-email login-form-div ">
            <label htmlFor="label-full-email">Email</label>

            <input
              type="text"
              className="login-form-input"
              onInput={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="login-form-password login-form-div">
            <label htmlFor="label-full-name">Password</label>

            <input
              type="password"
              className="login-form-input"
              onInput={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="login-form-checked login-form-div">
            <div className="login-form-checked-cx">
              <input type="checkbox" />
              <label htmlFor="label-checked" className="login-form-label">
                Remember Password
              </label>
            </div>
            <NavLink>Forgot Password?</NavLink>
          </div>

          <button
            className="login-form-btn"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Log in
          </button>
        </form>
        {/*  */}
      </section>
      <section className="login-section-rw-2">
        {loading && (
          <div className="login-loading">
            <span></span>
          </div>
        )}
      </section>
    </main>
  );
}
