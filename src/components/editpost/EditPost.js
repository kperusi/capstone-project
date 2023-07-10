import React, { useContext, useEffect, useState } from "react";
import "../createpost/createpost.css";
import { NavLink, useParams } from "react-router-dom";
import {
  Timestamp,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ProgressBar from "@ramonak/react-progress-bar";

export default function EditPost() {
  const [progress, setProgress] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [blogData, setBlogData] = useState({
    title: "",
    main: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const handleTitleChange = (e) => {
    setBlogData({ ...blogData, title: e.target.value });
  };
  const handleMainChange = (main) => {
    setBlogData({ ...blogData, main: main });
  };
  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  useEffect(() => {
    const editDocRef = doc(db, "Blogs", id);
    onSnapshot(editDocRef, (snapshot) => {
      console.log(snapshot.data());
      setBlogData({
        ...blogData,
        main: snapshot.data().main,
        title: snapshot.data().title,
      });
    });
  }, []);

  const handlePublish = async () => {
    console.log("clicked");
    if (blogData.main === "") {
      console.log("main cant be  empty");
      return;
    }
    if (blogData.title === "") {
      console.log("title cant be empty");
      return;
    }

    await updateDoc(doc(db, "Blogs", id), {
      main: blogData.main,
      title: blogData.title,
    }).then(() => {
      console.log("blog updated");
      navigate(`/chatter/${user.displayName}`)
    });
  };

  console.log(id);
  return (
    <main className="create-post-main">
      <section className="create-post-rw-1">
        <button
          className="create-post-btn"
          onClick={() => {
            handlePublish();
          }}
        >
          Publish
        </button>
        <NavLink
           to={`/chatter/${user.displayName}`}
          style={{
            width: "30px",
            marginTop: "-40px",
            marginLeft: "30px",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </NavLink>
      </section>
      {progress > 0 && (
        <section>
          <ProgressBar
            completed={progress}
            className="wrapper"
            barContainerClassName="container"
            labelClassName="label"
            bgColor="blue"
            height="10px"
            borderRadius="4px"
          />
        </section>
      )}
      <section className="create-post-rw-2">
        <div className="col-2">
          <div className="title-cx">
            <label htmlFor="inputfile">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0528 13.6214H13.5791V23.3511H10.4212V13.6214H0.94751V10.3782H10.4212V0.648438H13.5791V10.3782H23.0528V13.6214Z"
                  fill="rgb(188, 186, 186)"
                />
              </svg>
            </label>

            <input
              type="file"
              id="inputfile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleImageChange(e)}
            />

            <input
              className="title-input"
              type="text"
              placeholder="Title"
              name="title"
              value={blogData.title}
              onChange={(e) => handleTitleChange(e)}
            />
          </div>

          <div className="desc-cx">
            <label htmlFor="post-textarea">Blog</label>
            <ReactQuill
              modules={modules}
              value={blogData.main}
              onChange={handleMainChange}
              id="post-textarea"
              className="desc-input"
              placeholder="Write a post..."
              theme="bubble"
              style={{
                height: "400px",
                border: "0.3px solid grey",
                fontSize: "2.3em",
              }}
            />
            {/* <QuillEditor/> */}
          </div>
        </div>
      </section>
    </main>
  );
}
