import React, { useContext, useEffect, useState } from "react";
import "./feedstyle.css";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import Featured from "../featured/Featured";
import { UserContext } from "../userContext/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { setFeatured, setForYou, setRecent } from "../store/dataSlice";

export default function Feeds():any {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useContext<any>(UserContext);
const dispatch = useDispatch()
  const recent = useSelector((state:any)=>state.data.recent)
  const forYou = useSelector((state:any)=>state.data.forYou)
  const featured = useSelector((state:any)=>state.data.featured)



// const handleRecent=()=>{
//   if(forYou !== ''||featured!==''){
//     setForYou('')
//     setFeatured('')
    
//   }
//   setRecent('recent-indicator')
// }

// const handleForYou=()=>{
//   if(recent !== ''||featured!==''){
    
//     setFeatured('')
//     setRecent('')
   
//   }
//    setForYou('for-you-indicator')
// }
// const handleFeature=()=>{
//   if(recent !== ''||forYou!==''){
//     setForYou('')
    
//     setRecent('')
//   }
//   setFeatured('featured-indicator')
// }
  const handleCreateDraft = async ():Promise<any>=> {
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
      readtime:0,
      status: "draft",
      category:"",
      tags:[],
      
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

            <div
             
              className="post-btn"
              onClick={() => {
                handleCreateDraft();
              }}
            >
              Post a content
            </div>
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
                  dispatch(setForYou())
                  
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
                dispatch(setFeatured())
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
                  dispatch(setRecent())
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

      <section className="feed-post-cx">
        <Outlet />
      </section>
    </main>
  );
}
