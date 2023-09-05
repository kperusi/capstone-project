import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import { useNavigate, useOutletContext } from "react-router-dom";
import "./draftstyle/draftstyle.css";
import { useDispatch, useSelector } from "react-redux";
import { handlePersonalPostSelected, setName } from "../store/dataSlice";

export default function Draft() {
  const user = useContext(UserContext);
  const [drafts, setDrafts] = useState<any>([]);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  const [setNumber]=useOutletContext<any>()
  const createPostLoading=useSelector((state:any)=>state.data.loading)
const dispatch=useDispatch()

console.log(createPostLoading)
  useEffect(() => {
   
      const draftBlogRef = collection(db, "Blogs");
      const q = query(
        draftBlogRef,
        orderBy("createdAt", "desc"),
        where("status", "==", "draft"),
        where("createdBy", "==", `${user?.displayName}`)
      );
      onSnapshot(q, (snapshot) => {
        const draftBlogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDrafts(draftBlogs);
        setNumber(draftBlogs.length)
      });
    
   dispatch(handlePersonalPostSelected('draft-border'))
   dispatch(setName('Drafts'))
  }, [user,setNumber,dispatch]);

  const firstLetter = (blog: any) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };

  const handleDelete = async (id: any, imageUrl: any) => {
    try {
      await deleteDoc(doc(db, "Blogs", id));
      const storageRef = ref(storage, imageUrl);
      deleteObject(storageRef);
    } catch (error) {
      // console.log(error.code);
    }
  };
  const handleEdit = async (id: any, imageUrl: any) => {
    navigate(`/editing/${id}`);
  };

  // console.log(drafts);

  if (drafts.length === 0) {
    return (
      <section className="empty-draft">
        <p>You do not have any draft yet </p>

      </section>
    );
  }

  if (createPostLoading===true) {
    setNumber('')
    return <section className="loader"></section>;
  }
  return (
    <main className="person-post-main">
      <section className="person-post-cx">
        {drafts.map((draft: any) => (
          <section key={draft.id} className="person-post-rw-1">
            <section className="person-post-rw-2">
              <h1>{draft.title}</h1>
              <div className="readtime">
                <svg
                  width="22"
                  height="18"
                  viewBox="0 0 22 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.75 0.773438H15.3875C14.2367 0.773438 13.1117 1.10391 12.1437 1.72734L11 2.46094L9.85625 1.72734C8.88924 1.10403 7.76299 0.772823 6.6125 0.773438H1.25C0.835156 0.773438 0.5 1.10859 0.5 1.52344V14.8359C0.5 15.2508 0.835156 15.5859 1.25 15.5859H6.6125C7.76328 15.5859 8.88828 15.9164 9.85625 16.5398L10.8969 17.2102C10.9273 17.2289 10.9625 17.2406 10.9977 17.2406C11.0328 17.2406 11.068 17.2313 11.0984 17.2102L12.1391 16.5398C13.1094 15.9164 14.2367 15.5859 15.3875 15.5859H20.75C21.1648 15.5859 21.5 15.2508 21.5 14.8359V1.52344C21.5 1.10859 21.1648 0.773438 20.75 0.773438ZM6.6125 13.8984H2.1875V2.46094H6.6125C7.44219 2.46094 8.24844 2.69766 8.94453 3.14531L10.0883 3.87891L10.25 3.98438V14.8125C9.13437 14.2125 7.8875 13.8984 6.6125 13.8984ZM19.8125 13.8984H15.3875C14.1125 13.8984 12.8656 14.2125 11.75 14.8125V3.98438L11.9117 3.87891L13.0555 3.14531C13.7516 2.69766 14.5578 2.46094 15.3875 2.46094H19.8125V13.8984ZM8.30234 5.46094H3.94766C3.85625 5.46094 3.78125 5.54063 3.78125 5.63672V6.69141C3.78125 6.7875 3.85625 6.86719 3.94766 6.86719H8.3C8.39141 6.86719 8.46641 6.7875 8.46641 6.69141V5.63672C8.46875 5.54063 8.39375 5.46094 8.30234 5.46094ZM13.5312 5.63672V6.69141C13.5312 6.7875 13.6062 6.86719 13.6977 6.86719H18.05C18.1414 6.86719 18.2164 6.7875 18.2164 6.69141V5.63672C18.2164 5.54063 18.1414 5.46094 18.05 5.46094H13.6977C13.6062 5.46094 13.5312 5.54063 13.5312 5.63672ZM8.30234 8.74219H3.94766C3.85625 8.74219 3.78125 8.82188 3.78125 8.91797V9.97266C3.78125 10.0688 3.85625 10.1484 3.94766 10.1484H8.3C8.39141 10.1484 8.46641 10.0688 8.46641 9.97266V8.91797C8.46875 8.82188 8.39375 8.74219 8.30234 8.74219ZM18.0523 8.74219H13.6977C13.6062 8.74219 13.5312 8.82188 13.5312 8.91797V9.97266C13.5312 10.0688 13.6062 10.1484 13.6977 10.1484H18.05C18.1414 10.1484 18.2164 10.0688 18.2164 9.97266V8.91797C18.2188 8.82188 18.1438 8.74219 18.0523 8.74219Z"
                    fill="black"
                  />
                </svg>
                <p>{draft.readtime} min . read time</p>
              </div>
            </section>

            <section className="person-post-rw-3">
              <img src={draft.imageUrl} alt="postpicture" />
              <div
                dangerouslySetInnerHTML={{ __html: draft.main }}
                className="person-post-content"
              ></div>
            </section>

            <section className="person-post-rw-4">
             
            </section>
          </section>
        ))}
      </section>
    </main>
  );
}
