import React, { useContext, useEffect, useState } from "react";
// import { NavLink } from "react-router-dom"; pub_250986d3f23b2a4cbf57a857729d29aac5a64
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import "./personalpost.css";
import { deleteObject, ref } from "firebase/storage";
import MyDropdown from "../option/MyDropdown";

export default function PersonalPost() {
  const [blogs, setBlogs] = useState<any>([]);
  const user = useContext(UserContext);
  const param = useParams();
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();

  const removeSpace = (name: any) => {
    if (name) return name.replace(/\s/g, "");
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

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
    }
    const blogRef = collection(db, "Blogs");
    const q = query(
      blogRef,
      where("createdBy", "==", userName),
      orderBy("createdAt", "desc"),
      where("status", "==", "published")
    );
    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogs);
    });
  }, [user, userName]);

  // if(user){
  //   console.log(user.displayName)
  // }

  // if (user)
    return (
      <main className="person-post-main">
        <section className="person-post-cx">
          {blogs.map((blog: any) => (
            <section key={blog.id} className="person-post-rw-1">
              {/* <section className="post-rw-1">
              <img src={blog.imageUrl} alt="" className="profile-pic" />
              <div>
                <h2>{props.displayname}</h2>
                <p>{props.prof} {props.date}</p>
              </div>
            </section> */}

              <section className="person-post-rw-2">
                <h1>{blog.title}</h1>
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
                  <p>{blog.readtime} min . read time</p>
                </div>
              </section>

              <section className="person-post-rw-3">
               {blog.imgeUrl &&
               
               <img src={blog.imageUrl} alt="postpicture" />
               } 
               
                <div
                  dangerouslySetInnerHTML={{ __html: blog.main }}
                  className="person-post-content"
                ></div>
              </section>

              <section className="person-post-rw-4">
                <div className="person-post-comment">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9531 6.08601C18.8258 4.53913 17.2508 3.50554 15.5234 3.03913V3.04148C15.1226 2.59617 14.6703 2.18601 14.1641 1.82038C10.3273 -0.968678 4.9414 -0.117897 2.14062 3.71882C-0.116414 6.83601 -0.02032 11.029 2.28124 14.0079L2.29999 17.1157C2.29999 17.1907 2.31171 17.2657 2.33515 17.336C2.45937 17.7321 2.88124 17.9501 3.27499 17.8259L6.24218 16.8907C7.02734 17.1696 7.83827 17.329 8.64452 17.3735L8.6328 17.3829C10.7211 18.904 13.4586 19.361 15.9687 18.5313L18.9476 19.5016C19.0226 19.5251 19.1 19.5391 19.1797 19.5391C19.5945 19.5391 19.9297 19.204 19.9297 18.7891V15.6485C21.9945 12.8454 22.0484 8.97117 19.9531 6.08601ZM6.5703 15.2266L6.28905 15.1094L3.96874 15.836L3.9453 13.3985L3.7578 13.1876C1.77499 10.7688 1.64374 7.28367 3.49999 4.72663C5.75937 1.6282 10.0906 0.943822 13.1797 3.17976C16.2781 5.4321 16.9648 9.75632 14.7266 12.836C12.8492 15.4118 9.48827 16.3634 6.5703 15.2266ZM18.4062 14.8282L18.2187 15.0626L18.2422 17.5001L15.9453 16.7266L15.6641 16.8438C14.3516 17.3313 12.9523 17.3712 11.6562 17.0079L11.6516 17.0055C13.3836 16.4735 14.9539 15.3954 16.0859 13.8438C17.8766 11.3759 18.1672 8.27507 17.1266 5.63132L17.1406 5.6407C17.6797 6.02742 18.1742 6.51023 18.5937 7.09382C20.2953 9.4282 20.1992 12.6063 18.4062 14.8282Z"
                      fill="black"
                    />
                  </svg>

                  <p>{blog.comments?.length}</p>
                </div>
                <div className="person-post-likes">
                  <svg
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18.9999L8.55 17.6999C6.86667 16.1832 5.475 14.8749 4.375 13.7749C3.275 12.6749 2.4 11.6872 1.75 10.8119C1.1 9.93724 0.646 9.13323 0.388 8.3999C0.13 7.66657 0.000666667 6.91657 0 6.1499C0 4.58324 0.525 3.2749 1.575 2.2249C2.625 1.1749 3.93333 0.649902 5.5 0.649902C6.36667 0.649902 7.19167 0.833236 7.975 1.1999C8.75833 1.56657 9.43333 2.08324 10 2.7499C10.5667 2.08324 11.2417 1.56657 12.025 1.1999C12.8083 0.833236 13.6333 0.649902 14.5 0.649902C16.0667 0.649902 17.375 1.1749 18.425 2.2249C19.475 3.2749 20 4.58324 20 6.1499C20 6.91657 19.8707 7.66657 19.612 8.3999C19.3533 9.13323 18.8993 9.93724 18.25 10.8119C17.6 11.6872 16.725 12.6749 15.625 13.7749C14.525 14.8749 13.1333 16.1832 11.45 17.6999L10 18.9999ZM10 16.2999C11.6 14.8666 12.9167 13.6372 13.95 12.6119C14.9833 11.5866 15.8 10.6952 16.4 9.9379C17 9.17924 17.4167 8.5039 17.65 7.9119C17.8833 7.3199 18 6.73257 18 6.1499C18 5.1499 17.6667 4.31657 17 3.6499C16.3333 2.98324 15.5 2.6499 14.5 2.6499C13.7167 2.6499 12.9917 2.87057 12.325 3.3119C11.6583 3.75324 11.2 4.3159 10.95 4.9999H9.05C8.8 4.31657 8.34167 3.7539 7.675 3.3119C7.00833 2.8699 6.28333 2.64924 5.5 2.6499C4.5 2.6499 3.66667 2.98324 3 3.6499C2.33333 4.31657 2 5.1499 2 6.1499C2 6.73324 2.11667 7.3209 2.35 7.9129C2.58333 8.5049 3 9.1799 3.6 9.9379C4.2 10.6959 5.01667 11.5876 6.05 12.6129C7.08333 13.6382 8.4 14.8672 10 16.2999Z"
                      fill="black"
                    />
                  </svg>
                  <p>{blog.numberOfLikes}</p>
                </div>
                <div className="person-post-views">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="26"
                  >
                    <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
                  </svg>

                  <p>{blog.views}</p>
                 
                </div>

                <div className="person-post-menu rounded-xl shadow border">
                  <MyDropdown />
                </div>
              </section>
            </section>
          ))}
        </section>
      </main>
    );
}
