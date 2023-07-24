import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { MyRoutes } from "./components/pages/MyRoutes";
import { UserContext } from "./components/userContext/UserContext";
import { auth } from "./components/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import Profile from "./components/profile/Profile";

function App() {
  const [user] = useAuthState(auth);
  // const [localUser, setLocalUser]=useState()

  useEffect(() => {
    // const users = JSON.parse(localStorage.getItem('user'))
    // setLocalUser(users)
  }, []);

  const mobi_menu = useSelector((state: any) => state.data.mobi_menu);
  // console.log(mobi_menu);
  //  console.log(localUser)
  return (
    <div className="app">
      <UserContext.Provider value={user}>

       
        <section className="app-nav">
          <NavBar />
        </section>

        <section className="app-main">
           {/* <Profile /> */}
          <MyRoutes />
          
        </section>
      </UserContext.Provider>
    </div>
  );
}

export default App;
