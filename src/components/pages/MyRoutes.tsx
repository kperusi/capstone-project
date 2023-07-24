import { Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
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
import PublishedPost from '../personalpost/PublishedPost'
import SingleTags from "../singletags/SingleTags";
import { UserContext } from "../userContext/UserContext";
import Profile from "../profile/Profile";
import { useSelector } from "react-redux";
import Preview from "../preview/Preview";
import All from "../personalpost/All";
// import Main from "../main/Main";
export const MyRoutes = () => {
  const mobi_menu =useSelector((state:any)=>state.data.mobi_menu)

  // const user =  useContext(UserContext)
  // const user =  JSON.parse(localStorage.getItem('user'))
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/menu-nav" element={<Profile /> }/>
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
          {/* <Route path=":name" element={<PersonalPost />} /> */}
          <Route path="mystories" element={<PersonalPost/>}>
            <Route index element={<All/>}/>
            <Route path="drafts" element={<Draft/>}/>
            <Route path="published" element={<PublishedPost/>} />
            <Route path="all" element={<All/>}/>
          </Route>
          <Route path='tags/:tag' element={<SingleTags/>}/>
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
    </>
  );
};
