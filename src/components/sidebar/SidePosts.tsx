import React, { useContext, useState } from "react";
import TrendingTopics from '../Trending/TrendingTopics'
import { UserContext } from "../userContext/UserContext";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function SidePosts() {

  const [drafts, setDrafts] = useState<any>([]);
  const navigate = useNavigate()
  const user = useContext<any>(UserContext);


  useEffect(() => {
    const draftBlogRef = collection(db, "Blogs");
    const q = query(
      draftBlogRef,
      orderBy("views", "desc"),
      // where("status", "==", "published"),
      where("viewers", "array-contains", `${user?.uid}`),
      limit(1)


    );
    onSnapshot(q, (snapshot) => {
      const draftBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrafts(draftBlogs);
    });
  }, [user?.uid]);

  
  return (
    <main className='side-post'>
      {drafts.map((draft:any)=>(<div>
        <h1>{draft.title}</h1>
      </div>))}
     

    
    </main>
  )
}
