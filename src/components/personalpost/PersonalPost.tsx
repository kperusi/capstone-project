import React, { useContext, useState } from "react";

import { UserContext } from "../userContext/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import "./personalpost.css";
import { useDispatch, useSelector } from "react-redux";
import { handlePersonalPostSelected, setName } from "../store/dataSlice";

export default function PersonalPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  // const [name, setName] = useState("");
  const name = useSelector((state:any)=>state.data.name)

  const personalPostSelected = useSelector(
    (state: any) => state.data.selectedPersonalPost
  );

  return (
    <main className="person-post">
      <section className="person-post-nav">
        <div className="person-post-header">
          <h1> Personal Contents</h1>
          <div style={{ display: "flex",justifyContent:'center' ,alignItems:'center',flexDirection:'row'}}>
            <p>All your contents</p>
            <span
              style={{
                display: "block",
                borderRadius: "50%",
                width: "4px",
                height: "4px",
                backgroundColor: "grey",
                marginLeft:'10px',
              }}
            ></span>
            <p style={{marginLeft:'10px'}}>
              {number}{' '}
              {name}
            </p>
          </div>
        </div>

        <div
          className={`person-all`}
          onClick={() => {
            dispatch(handlePersonalPostSelected("all-border"));
            navigate("all");
            dispatch(setName('All'));
          }}
        >
          <h4>All</h4>
          <span
            className={`${personalPostSelected.all}`}
            style={{ height: "5px", color: "blue", display: "block" }}
          ></span>
        </div>
        <div
          className={`person-draft `}
          onClick={() => {
            dispatch(handlePersonalPostSelected("draft-border"));
            navigate("drafts");
            dispatch(setName("Drafts"));
          }}
        >
          <h4>Drafts</h4>
          <span
            className={`${personalPostSelected.draft}`}
            style={{ height: "5px", color: "blue", display: "block" }}
          ></span>
        </div>
        <div
          className={`person-publish`}
          onClick={(e) => {
            e.preventDefault();
            dispatch(handlePersonalPostSelected("published-border"));
            navigate(`published`);
            dispatch(setName("Published"));
          }}
        >
          <h4>Published</h4>
          <span
            className={`${personalPostSelected.published}`}
            style={{ height: "5px", color: "blue", display: "block" }}
          ></span>
        </div>
      </section>

      <section className="person-post-outlet">
        <Outlet context={[setNumber]} />
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
