import React, { useContext } from "react";

import { UserContext } from "../userContext/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import "./personalpost.css";

export default function PersonalPost() {
  const user = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <main className="person-post">
      <section className="person-post-nav">
        <div
          className="person-all"
          onClick={() => {
            navigate("all");
          }}
        >
          <h4>All</h4>
        </div>
        <div
          className="person-draft"
          onClick={() => {
            navigate("drafts");
          }}
        >
          <h4>Drafts</h4>
        </div>
        <div
          className="person-publish"
          onClick={() => {
            navigate(`published`);
          }}
        >
          <h4>Published</h4>
        </div>
      </section>

      <section className="person-post-outlet">
        <Outlet />
      </section>
    </main>
  );
}

// const removeSpace = (name) => {
//   if (name) return name.replace(/\s/g, "");
// };

// const handleDelete = async (id, imageUrl) => {
//   try {
//     await deleteDoc(doc(db, "Blogs", id));
//     const storageRef = ref(storage, imageUrl);
//     deleteObject(storageRef);
//   } catch (error) {
//     console.log(error.code);
//   }
// };
// const handleEdit = async (id, imageUrl) => {
//   navigate(`/editing/${id}`);
// };

// useEffect(() => {
//   if (user) {
//     setUserName(user.displayName);
//   }
//   const blogRef = collection(db, "Blogs");
//   const q = query(blogRef, where("createdBy", "==", userName));
//   onSnapshot(q, (snapshot) => {
//     const blogs = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setBlogs(blogs);
//   });
// }, [user, userName]);

// if(user){
//   console.log(user.displayName)
// }
