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
import { useDispatch, useSelector } from "react-redux";
import { setMobi_Menu, setSideShow } from "../store/dataSlice";
import { timeStamp } from "console";

export default function FeedView() {
  const user = useContext(UserContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>("");
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state: any) => state.data.sideShow);
  const arrowDown = useSelector((state: any) => state.data.arrowDown);
  const mobi_menu = useSelector((state: any) => state.data.mobi_menu);

  useEffect(() => {
    try {
      const blogRef = collection(db, "Blogs");
      const q = query(
        blogRef,
        orderBy("createdAt", "desc"),
        where("status", "==", "published")
      );
      onSnapshot(q, (snapshot) => {
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false);
        setBlogs(blogs);
      });
    } catch (error) {
      setError(error);
    }
  }, []);


  

  const handleNavigate = (blog: any) => {
    const blogRef = doc(db, "Blogs", blog.id);
    const viewerRef = doc(db, "Blogs", blog.id);
    
    navigate(`/post/${blog.id}`);

    updateDoc(blogRef,{
      lastViewed:Timestamp.now().toDate(),
    })

    updateDoc(blogRef, {
      views: increment(1),
    });
    if (user) {
      updateDoc(viewerRef, {
        viewers: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(viewerRef, {
        viewers: arrayUnion("Anonymous"),
      })
        .then(() => {
          console.log("anonymous");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const firstLetter = (blog: any) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };
 


  useEffect(() => {
    return () => {
      // console.log("“This is unmounted.”");
    };
  }, []);

  if (loading) {
    return <section className="loader"></section>;
  }

  return (
    <main>
      <section className="feedview-post-cx">
        <div className="feed-posts">
          {blogs.map((blog: any) => (
            <div
          
              onClick={() => {
                // handleNavigate(blog);
                dispatch(setMobi_Menu());
              }}
              key={blog.id}
              style={{
                borderRadius: "8px",
                border: "1px solid grey",
              }}
            >
              <Posts
                status={blog.status}
                firstLetter={firstLetter(blog)}
                profilePic={blog.userImageUrl}
                displayname={blog.createdBy}
                prof="Product designer"
                date={blog.createdAt.toDate().toDateString()}
                title={blog.title}
                readtime={blog.readtime}
                post={blog.main}
                postImage={blog.imageUrl}
                comments={blog.comments.length}
                likes={blog.numberOfLikes}
                views={blog.views}
                tags={blog.tags}
                blog={blog}
                handleNavigate={handleNavigate}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
