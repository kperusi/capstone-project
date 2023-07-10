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
import PersonalPost from "../personalpost/PersonalPost";
import Singlepost from "../singlepost/Singlepost";
import Settings from "../settings/Settings";
import Draft from "../draft/Draft";
import EditPost from "../editpost/EditPost";
import Recent from "../recent/Recent";
import FeedHome from "../feedhome/FeedHome";
// import Main from "../main/Main";
export const MyRoutes = () => {
  // const user =  JSON.parse(localStorage.getItem('user'))
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chatter" element={<FeedHome />}>
          <Route index element={<Feeds />} />
          <Route path="feed" element={<Feeds />}>
            <Route index element={<FeedView />} />
            <Route path="for-you" element={<FeedView />} />
            <Route path="recent" element={<Recent />} />
            <Route path="featured" element={<Featured/>}/>
          </Route>
          <Route path="draft" element={<Draft />} />
          <Route path=":name" element={<PersonalPost />} />
        </Route>

        <Route path="createpost" element={<CreatePost />} />
        <Route path="post/:id" element={<Singlepost />} />
        <Route path="/:name" element={<Settings />} />
        <Route path="edit/:id" element={<CreatePost />} />
        <Route path="editing/:id" element={<EditPost />} />
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
