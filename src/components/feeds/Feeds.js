import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "./feedstyle.css";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Outlet, useNavigate, NavLink, useParams, useLocation } from "react-router-dom";
import Featured from "../featured/Featured";
import { UserContext } from "../userContext/UserContext";

export default function Feeds() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useContext(UserContext);
  const [recent, setRecent] = useState("");
  const [forYou, setForYou] = useState("");
  const [featured, setFeatured] = useState("");
  const param= useParams()
  const local = useLocation()
const handleRecent=()=>{
  if(forYou !== ''||featured!==''){
    setForYou('')
    setFeatured('')
    
  }
  setRecent('recent-indicator')
}

const handleForYou=()=>{
  if(recent !== ''||featured!==''){
    
    setFeatured('')
    setRecent('')
   
  }
   setForYou('for-you-indicator')
}
const handleFeature=()=>{
  if(recent !== ''||forYou!==''){
    setForYou('')
    
    setRecent('')
  }
  setFeatured('featured-indicator')
}
  const handleCreateDraft = async () => {
    setLoading(true);
    const blogRef = doc(collection(db, "Blogs"));
    await setDoc(blogRef, {
      title: "",
      main: "",
      imageUrl: "",
      userImageUrl: user?.photoURL,
      createdAt: Timestamp.now().toDate(),
      createdBy: user?.displayName,
      userId: user?.uid,
      likes: [],
      numberOfLikes: 0,
      comments: [],
      views: 0,
      viewers: [],
      status: "draft",
    });
    setLoading(false);
    navigate(`/edit/${blogRef.id}`);
  };
  // console.log(">>", loading);

  useEffect(() => {
    return () => {
      // console.log("“This is unmounted.”");
    };
  }, []);
  // console.log(forYou);
  // console.log(recent);
  // console.log(featured);
  console.log(local.pathname)
  return (
    <main className="feed-main">
      <section className="feed-navigation-wrap">
        <div className="content-btn-wrap">
          <div className="content-wrap">
            <h1>FEED</h1>
            <p> Explore different content you'd love</p>
          </div>
          <div className="btn-wrap">
            <svg
              width="22"
              height="23"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.66211 22.2499H6.90461L22.4611 6.69343L18.2181 2.45093L2.66211 18.0074V22.2499Z"
                stroke="white"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>

            <NavLink
              // to="/feeds/write"
              // to="/createpost"
              className="post-btn"
              onClick={() => {
                handleCreateDraft();
              }}
            >
              Post a content
            </NavLink>
          </div>
        </div>
        {loading && <div className="loader"></div>}

        <header className="feed-header">
          <div className="feed-header-content">
            <div className="content-col-1" style={{ display: "flex", flexDirection: "column",}}>
              <h3
                className="recent"
                onClick={() => {
                  navigate('for-you');
                  handleForYou();
                }}
              >
                For you
              </h3>
              <div className="feed-indicator-cx">
                <span className={`${forYou} header-indicator`}></span>
              </div>
            </div>
            <div className="content-col-1"  style={{ display: "flex", flexDirection: "column" }}>
              <h3
                className="recent"
                onClick={() => {
                  navigate("featured");
                handleFeature()
                }}
              >
                Featured
              </h3>

              <div className="feed-indicator-cx">
                <span className={`${featured} header-indicator`}></span>
              </div>
            </div>

            <div className="content-col-1" style={{ display: "flex", flexDirection: "column" }}>
              <h3
                className="recent"
                onClick={() => {
                  navigate("recent");
                  handleRecent()
                }}
              >
                Recent
              </h3>
              <div className="feed-indicator-cx">
                <span className={`${recent} header-indicator`}></span>
              </div>
            </div>
          </div>
      
        </header>
      </section>

      {/* <section className="feed-sidebar">
        <Sidebar />
        <Featured/>
      </section> */}

      <section className="feed-post-cx">
        <Outlet />
      </section>
    </main>
  );
}
