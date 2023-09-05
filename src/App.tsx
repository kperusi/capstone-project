import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { MyRoutes } from "./components/pages/MyRoutes";
import { UserContext } from "./components/userContext/UserContext";
import { auth } from "./components/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { Provider, useSelector } from "react-redux";
import Profile from "./components/profile/Profile";
import ErrorBoundary from "./components/ErrorBoundary";
import store from "./components/store/store";

function App() {
  const [user] = useAuthState(auth);
  // @ts-ignore
  // const user2 = JSON.parse(localStorage.getItem('user'))

 
  return (
    <div className="app">
      <ErrorBoundary>
        <Provider store={store}>
      <UserContext.Provider value={user}>
   
        <section className="app-nav">
          <NavBar />
        </section> 

        <section className="app-main">
         
          <MyRoutes />
          
        </section>
      </UserContext.Provider>
      </Provider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
