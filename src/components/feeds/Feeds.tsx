import React, { useContext, useEffect, useState } from "react";
import "./feedstyle.css";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Outlet, useNavigate } from "react-router-dom";
import Featured from "../featured/Featured";
import { UserContext } from "../userContext/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { setFeatured, setForYou, setRecent } from "../store/dataSlice";
import TopTrending from "../toptrending/TopTrending";

export default function Feeds(): any {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useContext<any>(UserContext);
  const dispatch = useDispatch();
  const recent = useSelector((state: any) => state.data.recent);
  const forYou = useSelector((state: any) => state.data.forYou);
  const featured = useSelector((state: any) => state.data.featured);

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
  const handleCreateDraft = async (): Promise<any> => {
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
      bookmarks: [],
      bookmarker: "",
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
      <div className="content-wrap">
            <h1 style={{fontWeight:900 ,fontSize:'1.2em'}}>FEED</h1>
            <p style={{marginTop:'-10px',marginBottom:'10px'}}> Explore different content you'd love</p>
          </div>
        <div className="feed-top-trending">
          <TopTrending />
        </div>
        <div className="content-btn-wrap">
         
        </div>

        <header className="feed-header">
          <div className="feed-header-content">
            <div
              className="content-col-1"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h3
                className="recent"
                onClick={() => {
                  navigate("for-you");
                  dispatch(setForYou());
                }}
              >
                For you
              </h3>
              <div className="feed-indicator-cx">
                <span className={`${forYou} header-indicator`}></span>
              </div>
            </div>
            <div
              className="content-col-1"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h3
                className="recent"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("featured");
                  dispatch(setFeatured());
                }}
              >
                Featured
              </h3>

              <div className="feed-indicator-cx">
                <span className={`${featured} header-indicator`}></span>
              </div>
            </div>

            <div
              className="content-col-1"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h3
                className="recent"
                onClick={(e) => {
                  navigate("recent");
                  dispatch(setRecent());
                  e.preventDefault();
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
