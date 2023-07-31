import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate, useParams } from "react-router-dom";
import Posts from "../posts/Posts";
import "./singletagstyle/singletagstyle.css";

export default function SingleTags() {
  const { tag } = useParams();
  const [singletag, setSingleTag] = useState([]);
  const navigate=useNavigate()
  const firstLetter = (blog) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };

  useEffect(() => {
    const tagsBlogsRef = collection(db, "Blogs");
    const q = query(
      tagsBlogsRef,
      // orderBy("createdAt", "desc"),
      where("status", "==", "published"),
      where("tags", "array-contains", `${tag}`)
    );
    onSnapshot(q, (snapshot) => {
      const tagBlogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSingleTag(tagBlogs);
    });
  }, [tag]);
  console.log(singletag);
  return (
    <main className="single-tag">
      <section>{tag}</section>

      <section className="single-tag-rw-2" >
        {singletag.map((tag) => (
          <section className="single-tag-card" 
          onClick={()=>{navigate(`/post/${tag.id}`);}}
          >
            <Posts
              status={tag.status}
              firstLetter={firstLetter(tag)}
              profilePic={tag.userImageUrl}
              displayname={tag.createdBy}
              prof="Product designer"
              date={tag.createdAt.toDate().toDateString()}
              title={tag.title}
              readtime={tag.readtime}
              post={tag.main}
              postImage={tag.imageUrl}
              comments={tag.comments.length}
              likes={tag.numberOfLikes}
              views={tag.views}
              tags={tag.tags}
            />
          </section>
        ))}
      </section>
    </main>
  );
}
