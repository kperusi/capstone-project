import React, { useContext, useEffect, useState } from "react";
// import "../feeds/feedstyle.css";

import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { setFeatured, setForYou, setRecent } from "../store/dataSlice";

export default function NewPost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useContext<any>(UserContext);
    // @ts-ignore
    // const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch();

  const handleCreateDraft = async (): Promise<any> => {
    if(!user){
      navigate("signup");
    }
    else{
      
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
      readtime: 0,
      status: "draft",
      category: "",
      tags: [],
      bookmarks: '',
      bookmarker: [],
      lastViewed:''
    });
    setLoading(false);
    navigate(`/edit/${blogRef.id}`);

    }
  };
  return (
    <main>
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
            stroke="blue"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>

        <div
          className="post-btn"
          onClick={() => {
            handleCreateDraft();
          }}
        >
          Post a content
        </div>
      </div>
    </main>
  );
}
