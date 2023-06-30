


import React, { useContext, useEffect, useState }  from 'react'
// import { NavLink } from "react-router-dom";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";

function Featured() {
  const [blogs, setBlogs] = useState([]);
 const user = useContext(UserContext)


  useEffect(() => {
    const userName = user.displayName
    const blogRef = collection(db, "Blogs");
    const q = query(blogRef, where("createdBy", '==' ,userName));
    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogs);
      // console.log(userName);
    });
  }, []);
  // console.log(blogs)
 
  return (
    <main>
      featured

        

    </main>
  )
}

export default Featured