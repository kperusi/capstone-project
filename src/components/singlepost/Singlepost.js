import React, { useContext } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
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

import { useDispatch, useSelector } from "react-redux";
import { setShowComment } from "../store/dataSlice";
import Popup from "reactjs-popup";

export default function Singlepost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const user = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [width, setWidth] = useState("zero");
  const showComment = useSelector((state) => state.data.showComment);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(showComment);

  const handleWidth = () => {
    if (width === "zero") {
      setWidth("nonzero");
    } else setWidth("zero");
  };
  const handleComment = () => {
    if (!user) {
      navigate("/signup");
    } else dispatch(setShowComment());
  };
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
    if (!user) {
      navigate("/signup");
    } else {
      updateDoc(likeRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }

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
        commentByImageUrl: user.photoURL,
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

  return (
    <main className="single-posts-main">
      {post && (
        <main className="single-post-main-2">
          <header className="single-post-header">
            <section className="single-post-owner-rw">
              <img
                src={post.userImageUrl}
                alt=""
                className="single-post-image"
              />
              <div>
              <h1 className="owner-name">{post.createdBy}</h1>
                <div style={{display:'flex',flexDirection:'row', color:'grey'}}>
               <p>Posted</p>
               <span className="dot"></span> 
               <p>{post.createdAt.toDate().toDateString()}</p>
               
               
                </div>
               
                
              </div>
            </section>
            <section className="single-post-rw-1">
              <div className="single-post-comment">
                <svg
                  onClick={() => {
                    handleComment();
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
                  xmlns="http://www.w3.org/2000/svg"
                  fill={post.numberOfLikes>0 ? "red" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke={post.numberOfLikes>0 ? "red" : "black"}
                  className="w-1 h-1 post-heart"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    // fill={post.likes ? "red" : "none"}
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
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
              {post.imageUrl && (
                <div className="post-image-wrap">
                  <img
                    src={post.imageUrl}
                    alt={post.imageUrl ? "title_image" : ""}
                  />
                </div>
              )}

              <div
                className="single-post-content"
                dangerouslySetInnerHTML={{ __html: post.main }}
              ></div>
            </section>
          </header>
          {/* ----------------------------------------------------------------------------------------- */}
          <section className={`single-post-comment-cx ${showComment}`}>
            <div
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
            </div>
            <div className={`single-post-comment-rw-1`}>
              <header className={`comments-view ${showComment}`}>
                {post.comments && (
                  <main style={{ gap: "10px" }}>
                    {post.comments.map((each) => (
                      <div className="comments-view-main">
                        <div className="comments-view-col-1">
                          <img
                            src={each.commentByImageUrl}
                            alt="profileImage"
                            className="comment-image"
                          />
                          <div className="comment-rw-1">
                            <div className="comment-rw-2">
                              <h3 className="comment-by">{each.commentBy}</h3>
                              <p className="comment-time">
                                {each.createdAt.toDate().toDateString()}
                              </p>
                            </div>
                            {user && user.displayName === each.commentBy && (
                              <div className="comment-del-cx">
                                {" "}
                                {/* <Popup
                                trigger={
                                  <span className="comment-del-cx">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                      />
                                    </svg>
                                  </span>
                                }
                                position="left centre"
                                contentStyle={{ width: "100px" }}
                              >
                                {(close) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span
                                      onClick={() => {
                                        close();
                                      }}
                                    >
                                      Edit
                                    </span>
                                    <span
                                      onClick={() => {
                                        close();
                                      }}
                                      style={{ color: "red" }}
                                    >
                                      Delete
                                    </span>
                                  </div>
                                )}
                              </Popup> */}
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="comments">{each.comment}</p>
                      </div>
                    ))}
                  </main>
                )}
              </header>
              <div className="single-post-form">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    paddingLeft: "20px",
                  }}
                >
                  <span style={{ display: "flex", flexDirection: "row" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-1 h-1 comment-svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                  </span>
                  <h3 className={`${width}`}>Add your commits</h3>
                </div>
                <form className={`${width}`}>
                  <input
                    className={``}
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
            </div>
          </section>
        </main>
      )}
    </main>
  );
}
