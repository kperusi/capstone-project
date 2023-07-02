import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "../home/Home";
import SignUp from "../signup/SignUp";
import EmailSignUp from "../emailsignup/EmailSignUp";
import Login from "../login/Login";
import Feeds from "../feeds/Feeds";
import FeedView from "../feedview/FeedView";
import CreatePost from "../createpost/CreatePost";
import Featured from "../featured/Featured";
import { useContext } from "react";
import { UserContext } from "../userContext/UserContext";
import PersonalPost from "../personalpost/PersonalPost";
import Singlepost from "../singlepost/Singlepost";
import Settings from "../settings/Settings";
// import Main from "../../Main";
export const MyRoutes = () => {
  // const user =  JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/feeds" element={<Feeds/>} >
          <Route index element={<FeedView/>}/>
          <Route path="post" element={<FeedView/>}/>
          <Route path="write" element={<CreatePost/>}/>
          <Route path="/feeds/:name" element={<PersonalPost/>}/>
          <Route path="feeds/featured" element={<Featured/>}/>
        </Route>
        <Route path="post/:id" element={<Singlepost/>}/>
        <Route path = '/:name' element={<Settings/>}/>
        <Route path="/signup" element={<SignUp />}>
          <Route index element={<EmailSignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<EmailSignUp />} />
        </Route>

        <Route path="/contact" element={<div>this is contact</div>} />
      </Routes>
    </div>
  );
};
