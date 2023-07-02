import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  // Timestamp,
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  // serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import "./singlepoststyle/singlepoststyle.css";
import { UserContext } from "../userContext/UserContext";

// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { setShowComment } from "../store/dataSlice";

export default function Singlepost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const user = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [width,setWidth]=useState('zero')
  const showComment = useSelector((state) => state.data.showComment);

  const dispatch = useDispatch();
  console.log(showComment);

  const handleWidth = ()=>{
    if(width==='zero'){
      setWidth('nonzero')
    }
    else setWidth('zero')
  }

  useEffect(() => {
    const docRef = doc(db, "Blogs", id);
    onSnapshot(docRef, (snapShot) => {
      setPost({ ...snapShot.data(), id: snapShot.id });
      setComments(snapShot.data().comments);
    });
  }, [id]);

  const likeRef = doc(db, "Blogs", id);
  const numberOfLikesRef = doc(db, "Blogs", id);
  const commentRef = doc(db, "Blogs", id);

  const handleLikes = () => {
    updateDoc(likeRef, {
      likes: arrayUnion(user.uid),
    })
      .then(() => {
        console.log("liked");
      })
      .catch((e) => {
        console.log(e);
      });

    updateDoc(numberOfLikesRef, { numberOfLikes: increment(1) });
  };

  const handleChangeComment = (e) => {
    e.preventDefault();

    updateDoc(commentRef, {
      comments: arrayUnion({
        commentById: user.uid,
        commentBy: user.displayName,
        comment: comment,
        createdAt: new Date(),
        commentId: uuidv4(),
        commentByImageUrl:user.photoURL
      }),
    })
      .then(() => {
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentClose = () => {};
  console.log(showComment);
  console.log(width)
  return (
    <main className="single-post-main">
      {post && (
        <main className="single-post-main-2">
          <header className="single-post-header">
            <section className="single-post-owner-rw">
              <img
                src={post.userImageUrl}
                alt=""
                className="single-post-image"
              />
              <h2>{post.createdBy}</h2>
            </section>
            <section className="single-post-rw-1">
              <div className="single-post-comment">
                <svg
                  onClick={() => {
                    dispatch(setShowComment());
                    handleWidth();
                  }}
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

                <p>{post.comments.length}</p>
              </div>

              <div
                className="single-post-likes"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleLikes();
                }}
              >
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
                {post.numberOfLikes}
              </div>
              <div className="single-post-views">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="26"
                >
                  <path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z" />
                </svg>
                <p>{post.views}</p>
              </div>
            </section>
            <section className="single-post-rw-2">
              <h1 className="single-post-title">{post.title}</h1>

              <div className="post-image-wrap">
                <img src={post.imageUrl} alt="" />
              </div>
              <p>{post.main}</p>
            </section>
          </header>
          {/* ----------------------------------------------------------------------------------------- */}

          <div className={`single-post-comment-cx ${showComment}`}>
            <span
              className="cancel-cx"
              onClick={() => {
                dispatch(setShowComment());
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-1 h-1 cancel"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div className="single-post-menu" >
              <h3 className={`${width}`} >Add your commits</h3>
              <form className={`${width}`} >
                <input
                  className={`${width}`}
                  type="text"
                  value={comment}
                  // onKeyUp={(e)=>{handleChangeComment(e)}}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  placeholder="what do you think?"
                  
                />
                <button
                
                  className={``}
                  onClick={(e) => {
                    handleChangeComment(e);
                  }}
                >
                  Comment
                </button>
              </form>
            </div>
            <div className={`comments-view ${showComment}`}>
              {post.comments.map((each) => (
                <div className="comments-view-main">
                <div className="comments-view-col-1">
                  <img src={each.commentByImageUrl} alt="profileImage" className="comment-image" />
                  <div className="comment-rw-1" >
                    <div className="comment-rw-2" >
                      <h3 className="comment-by">{each.commentBy}</h3>
                      <p className="comment-time" >{each.createdAt.toDate().toDateString()}</p>
                    </div>

            
                  </div>
                  
                </div>
                <p className="comments">{each.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/*--------------------------------------------------------------------------------- */}
        </main>
      )}
    </main>
  );
}
