import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";
import "./post.css";
import { db } from "../firebase/firebase";
import {
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  setDoc,
  Timestamp,
  where,
  arrayRemove,
} from "firebase/firestore";

export default function Posts(props: any) {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [bookmarkers, setBookmarkers] = useState("");

  const handleBookmarks = (blog: any) => {
    const blogRef = doc(db, "Blogs", blog.id);

    if (user) {
      if (!blog.bookmarker?.includes(user?.uid)) {
        updateDoc(blogRef, {
          bookmarker: arrayUnion(user.uid),
        });
      } else {
        updateDoc(blogRef, {
          bookmarker: arrayRemove(user.uid),
        });
      }
    } else {
      navigate(`signup`);
    }
  };

  return (
    <main className="post-main">
      <section className="post-rw-1">
        <div className="post-profile-img">
          {props.profilePic ? (
            <div>
              <img
                src={props.profilePic}
                alt={props.profilePic}
                className="profile-pic"
              />
            </div>
          ) : (
            <div className="post-letter-img">
              <h1>{props.firstLetter}</h1>
            </div>
          )}
        </div>
        <div className="disp-name-cx">
          <h2 className="disp-name">{props.displayname}</h2>
          <div className="p" style={{display:'flex',flexDirection:'row'}}>
            <p>Posted</p>
            <span style={{width:'5px',height:'5px',display:'block',background:'grey',borderRadius:'50%'}}></span>
            <p>{props.date}</p>
          </div>
        </div>
      </section>

      <section className="post-rw-2">
        <div className="post-tag-cx">
          {props.tags.map((tag: any) => (
            <NavLink to={`/chatter/tags/${tag}`} key={tag} className="post-tag">
              {tag}
            </NavLink>
          ))}
        </div>
      </section>

      <section
        className="post-rw-3"
        onClick={() => props.handleNavigate(props.blog)}
       
      >
        <div className="post-content-cx">
          <h1 className="post-title">
            <b>{props.title}</b>
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: props.post }}
            className="post-content"
          ></div>
        </div>

        <div className="post-img-cx">
          {props.postImage&& <img
            src={props.postImage}
            alt={props.postImage ? "postpicture" : ""}
            className="post-img"
            
          />}
         
        </div>
      </section>

      <section className="post-rw-4">
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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              color: "grey",
            }}
          >
            <p>{props.readtime} </p>
            <p>min. read time </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            flexDirection: "row",
            // border:'solid',
            gap: "50px",
          }}
        >
          <div
            className="post-comment"
            onClick={() => props.handleNavigate(props.blog)}
          >
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

            <p>{props.comments}</p>
          </div>
          <div
            className="post-likes"
            onClick={() => props.handleNavigate(props.blog)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={props.likes ? "red" : ""}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke={props.likes ? "red" : "black"}
              className="w-1 h-1 post-heart"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={props.likes ? "red" : "none"}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <p>{props.likes}</p>
          </div>
          <div className="post-views">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="26"
            >
              <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
            </svg>

            <p>{props.views}</p>
          </div>

          <div
            onClick={() => {
              handleBookmarks(props.blog);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="28"
              viewBox="0 -960 960 960"
              width="28"
              fill={
                props.blog.bookmarker?.includes(user?.uid) ? "blue" : "black"
              }
            >
              <path d="M200-120v-665q0-24 18-42t42-18h290v60H260v574l220-93 220 93v-334h60v425L480-240 200-120Zm60-665h290-290Zm440 180v-90h-90v-60h90v-90h60v90h90v60h-90v90h-60Z" />
            </svg>
          </div>
        </div>
      </section>
    </main>
  );
}
