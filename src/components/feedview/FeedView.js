import React, { useContext, useEffect, useState } from "react";
import Posts from "../posts/Posts";
import { UserContext } from "../userContext/UserContext";
import {
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./feedviewstyle.css";
import { useNavigate } from "react-router-dom";

export default function FeedView() {
  const user = useContext(UserContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const blogRef = collection(db, "Blogs");
    const q = query(blogRef, orderBy("createdAt", "desc"),where('status' ,'==', 'published'));
    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    let url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4b1d039407d64742acf1d0fe9f95d1bd";

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.articles);
        setNews(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNavigate = (blog) => {
    const viewRef = doc(db, "Blogs", blog.id);
    const viewerRef = doc(db, "Blogs", blog.id);
    navigate(`/post/${blog.id}`);
    updateDoc(viewRef, {
      views: increment(1),
    });

    updateDoc(viewerRef, {
      viewers: arrayUnion(user.uid),
    })
      .then(() => {
        console.log("liked");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const firstLetter = (blog) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };
  // console.log(user);

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
    // console.log(blogRef.id);
    setLoading(false);
    navigate(`/edit/${blogRef.id}`);
  };
  // console.log(">>", loading);

  useEffect(() => {
    return () => {
      // console.log("“This is unmounted.”");
    };
  }, []);
  return (
    <main>
      <section className="feedview-post-cx">
        <div className="feed-post-wrap">
          {/* <div className="content-btn-wrap">
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
              <h3>For you</h3>
              <h3>Featured</h3>
              <h3 className="recent" onClick={()=>{navigate('/feeds/recent')}}>Recent</h3>
            </div>
            <span className="header-indicator"></span>
          </header> */}
          <div>
            <div className="feed-posts">
              {blogs.map((blog) => (
                <div
                  onClick={() => handleNavigate(blog)}
                  key={blog.id}
                  style={{
                    marginBottom: "40px",
                    borderBottom: "1px solid grey",
                  }}
                >
                  <Posts
                    status={blog.status}
                    firstLetter={firstLetter(blog)}
                    profilePic={blog.userImageUrl}
                    displayname={blog.createdBy}
                    prof="Product designer"
                    date="May 25th, 2023"
                    title={blog.title}
                    readtime="10 mins read"
                    post={blog.main}
                    postImage={blog.imageUrl}
                    comments={blog.comments.length}
                    likes={blog.numberOfLikes}
                    views={blog.views}
                  />
                </div>
              ))}
            </div>
            <div>
              <h1>News for you</h1>
              {news.map((newsArticle, id) => (
                <main key={id}>
                  <h2>{newsArticle.author}</h2>
                  <p>{newsArticle.content}</p>
                </main>
              ))}
            </div>
          </div>
        </div> 
      </section>
     
    </main>
  );
}
