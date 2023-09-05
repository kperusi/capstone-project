import React, { useState } from "react";
import "./loginstyle/loginstyle.css";
import { NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setForYou } from "../store/dataSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  const navigate = useNavigate();
  const popup = (message:any) => toast(`${message} try again`);

  const [error, setError] = useState<any>(false);
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [loading, setLoading] = useState<any>("");
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setForYou());
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        localStorage.setItem("user", JSON.stringify(auth.currentUser));
        navigate("/chatter/feed/for-you");
        setLoading(false);
      }).catch((e)=>{
        setError("can't login. Check your network");
        console.log(e.message);
        setLoading(false);
        popup(e.code)
      });
    }  catch (error) {
     
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
              onInput={(e: any) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="login-form-password login-form-div">
            <label htmlFor="label-full-name">Password</label>

            <input
              type="password"
              className="login-form-input"
              onInput={(e: any) => {
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
            <NavLink to="">Forgot Password?</NavLink>
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
      <ToastContainer/>
    </main>
  );
}
