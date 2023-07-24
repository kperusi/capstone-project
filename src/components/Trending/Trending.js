import { collection, limit, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";

import "./trendingstyle/trendingstyle.css";
import { useNavigate } from "react-router-dom";

function Trending() {
  const navigate = useNavigate();

  const [tags, setTags] = useState([
    "Programming",
    "Data Science",
    "Technology",
    "Machine Learning",
    "politics",
  ]);

  // useEffect(()=>{
  //   onSnapshot(collection(db,'Blogs'),limit(1),
  //   (snapshot)=>{
  //     let tag =['Programming','Data Science','Technology','Machine Learning','Politics']
  //     snapshot.docs.forEach((doc)=>{
  //       tag.push(...doc.get('tags'))

  //     })
  //        const uniqueTags = [...new Set(tag)];
  //       const t= uniqueTags.filter(value=>value !=='')
  //        setTags(t)

  //   })
  // },[])

  return (
    <main className="trending">
      <ul>
        {tags.map((tag) => (
          <li
            key={tag}
            onClick={() => {
              navigate(`tags/${tag}`);
            }}
            className="tag-link"
          >
            {tag}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Trending;
