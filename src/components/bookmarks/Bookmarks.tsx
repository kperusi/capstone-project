import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import Posts from "../posts/Posts";
import { useNavigate } from "react-router-dom";
import './bookmarkstyle/bookmarkstyle.css'


export default function Bookmarks() {
  const [myBookmarks, setMyBookmarks] = useState<any>([]);
  const user = useContext(UserContext);
  const navigate=useNavigate()

  const firstLetter = (blog: any) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };

  const handleNavigate=(bookmark:any)=>{
    navigate(`/post/${bookmark.id}`)
  }
 

  useEffect(() => {
    const blogRef = collection(db, "Blogs");
    const q = query(
      blogRef,

      where("bookmarker", "array-contains", `${user?.uid}`)
      // orderBy("bookmarker", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyBookmarks(blogs);
    });
  }, [user?.uid]);

  if (!myBookmarks) {
    return <div>not bookmarks</div>;
  }
  return (
    <main className="bookmark-main">
      <section className="bookmark-header">
       <h1 style={{fontSize:'1.3em' }}> Your Bookmarks</h1>
       <p>All contents you bookmarked</p>
      </section> 
  
      {myBookmarks.map((bookmark: any, id: any) => (
        <section className="bookmark-post" key={id}>
         <Posts
                status={bookmark.status}
                firstLetter={firstLetter(bookmark)}
                profilePic={bookmark.userImageUrl}
                displayname={bookmark.createdBy}
                prof="Product designer"
                date={bookmark.createdAt.toDate().toDateString()}
                title={bookmark.title}
                readtime={bookmark.readtime}
                post={bookmark.main}
                postImage={bookmark.imageUrl}
                comments={bookmark.comments.length}
                likes={bookmark.numberOfLikes}
                views={bookmark.views}
                tags={bookmark.tags}
                blog={bookmark}
                handleNavigate={handleNavigate}
              />
        </section>
      ))}
    </main>
  );
}
