import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import Posts from "../posts/Posts";
import './recentpoststyle/recentpoststyle.css'

export default function Draft() {
  const user = useContext(UserContext);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const draftBlogRef = collection(db, "Blogs");
    const q = query(
      draftBlogRef,
      // orderBy("createdAt", "desc"),
      where("status", "==", "published"),
      where("viewers", "array-contains", `${user?.uid}`)
    );
    onSnapshot(q, (snapshot) => {
      const draftBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrafts(draftBlogs);
    });
  }, [user?.uid]);

  const firstLetter = (blog) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };

  // console.log(user?.uid)
  console.log(drafts)
  if(drafts.length===0){
    return <>
    <section>
      You do not have any recent activity 
    </section>
    </>
  }

  return (
    <main className="recent-post">
      {drafts.map((draft) => (
        <section key={draft.id} className="recent-post-rw-1">
          <Posts
            status={draft.status}
            firstLetter={firstLetter(draft)}
            profilePic={draft.userImageUrl}
            displayname={draft.createdBy}
            prof="Product designer"
            date="May 25th, 2023"
            title={draft.title}
            readtime="10 mins read"
            post={draft.main}
            postImage={draft.imageUrl}
            comments="200"
            likes={draft.numberOfLikes}
            views={draft.views}
            tags={draft.tags}
          />
        </section>
      ))}
    </main>
  );
}
