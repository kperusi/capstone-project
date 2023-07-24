import React, { useContext, useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import "./emailsignupstyle.css";
import { auth, googleProvider } from "../firebase/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
// import md5 from 'md5-hash'
export default function EmailSignUp() {
  // const [user] = useContext(UserContext)
  const [currentUser, setCurrentUser] = useState<any>();
  const [name, setName] = useState<any>("");
  const [firstName, setFirstName] = useState<any>("");
  const [lastName, setLastName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState<any>("");
  const [validconPass, setValidConPass] = useState<any>(false);
  const navigate = useNavigate();
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(false);
  // const provider = new auth.GoogleAuthProvider()




  useEffect(() => {
    setCurrentUser(auth.currentUser);
  }, [currentUser]);


  const signInWithGoogle = async () => {
    try {
    await signInWithPopup(auth,googleProvider).then((res)=>{
      console.log(res)
      navigate("/chatter");

    });
    } catch (err){
      console.error(err);
    }
  };

  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setError("");
    if (password !== conPassword) {
      setValidConPass(true);
      return;
    }
    setLoading(true);
    setConPassword(false);

    try {
      setName(firstName + lastName);
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userDetails) => {
          await updateProfile(userDetails.user, {
            displayName: firstName + " " + lastName,
            //  photoURL:`https://gravatar.com/avatar${md5(userDetails.user.email)}?d=identicon`
          }); 
       
        }
       
      );

      localStorage.setItem("user", JSON.stringify(auth.currentUser));
      navigate("/chatter");
      setLoading(false);
    } catch (error) {
      // console.log(error.message);
      setError(error);
      setLoading(false);
    }
  };
  // console.log(conPassword);


  const responseMessage = (response:any) => {
    console.log(response);
};
const errorMessage = (error:any) => {
    console.log(error);
};

  return (
    <main className="create-account-main">
      {error && <div className="error">{error.message}</div>}
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
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>

          <div className="create-account-form-confirm-password create-account-form-div">
            <label htmlFor="label-full-confirm-password">
              Confirm Password
            </label>

            <input
              className="other-form-inputs"
              type="text"
              onInput={(e: any) => setConPassword(e.target.value)}
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
          {loading && (
            <div className="login-loading">
              <span></span>
            </div>
          )}
        </form>
        <div className="or-div">
          <span className="or-span"></span>
          <h5 className="or">OR</h5>
          <span className="or-span"></span>
        </div>

        <div className="signup-btn-cx" onClick={()=>{signInWithGoogle()}}>
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
