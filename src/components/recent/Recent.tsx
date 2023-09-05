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
import { useNavigate } from "react-router-dom";

export default function Draft() {
  const user = useContext(UserContext);
  const [recents, setRecent] = useState<any>([]);
  const navigate = useNavigate()

  useEffect(() => {
    const recentBlogRef = collection(db, "Blogs");
    const q = query(
      recentBlogRef,
     orderBy("lastViewed", "desc"),
      where("status", "==", "published"),
      where("viewers", "array-contains", `${user?.uid}`),
      
    );
    onSnapshot(q, (snapshot) => {
      const recentBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecent(recentBlogs);
    });
  }, [user?.uid]);

  const firstLetter = (blog:any) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };

  // console.log(user?.uid)
  console.log(recents)
  if(recents.length===0){
    return <>
    <section>
      You do not have any recent activity 
    </section>
    </>
  }
const handleNavigate=(recent:any)=>{

  navigate(`/post/${recent.id}`)
}


  return (
    <main className="recent-post">
      {recents.map((recent:any) => (
        <section key={recent.id} className="recent-post-rw-1"
        // onClick={()=>{navigate(`/post/${draft.id}`);}}
        >
          <Posts
            status={recent.status}
            firstLetter={firstLetter(recent)}
            profilePic={recent.userImageUrl}
            displayname={recent.createdBy}
            prof="Product designer"
            date={recent.createdAt.toDate().toDateString()}
            title={recent.title}
            readtime={recent.readtime}
            post={recent.main}
            postImage={recent.imageUrl}
            comments={recent.comments.length}
            likes={recent.numberOfLikes}
            views={recent.views}
            tags={recent.tags}
            blog={recent}
            handleNavigate={handleNavigate}

          />
        </section>
      ))}
    </main>
  );
}
