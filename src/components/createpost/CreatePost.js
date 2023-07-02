import React, { useContext, useState } from "react";
import "./createpost.css";
import { NavLink } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  const [progress, setProgress] = useState();
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    main: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [title,setTitle]=useState('')
  const [main,setMain]=useState('')


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

  const handleMainChange=(main)=>{
    setBlogData({...blogData,main:main})
  }


  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    
    if (!blogData.title || !blogData.main) {
      alert("please title and post field cannot be empty");
      return;
    }

    const storageRef = ref(
      storage,
      `images/${Date.now()}${blogData.image.name}`
    );
    const uploadedImage = uploadBytesResumable(storageRef, blogData.image);
    uploadedImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setBlogData({
          title: "",
          main: "",
          image: "",
        });
        getDownloadURL(uploadedImage.snapshot.ref).then((url) => {
          const blogRef = collection(db, "Blogs");
          addDoc(blogRef, {
            title: blogData.title,
            main: blogData.main,
            imageUrl: url,
            userImageUrl: user.photoURL,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName,
            userId: user.uid,
            likes: [],
            numberOfLikes: 0,
            comments: [],
            views: 0,
            viewers: [],
          })
            .then(() => {
              console.log("Blog added successfully");
              setProgress(0);
              navigate(`/feeds/${user.displayName}`);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    );
  };

  console.log(blogData.main);
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
          to="/feeds/post"
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
              id="inputfile2"
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

            {/* <textarea
              className="desc-input"
              name="main"
              id="post-textarea"
              cols="30"
              rows="10"
              placeholder="Write a post..."
              value={blogData.main}
              onChange={(e) => handleChange(e)}
            ></textarea> */}

            <ReactQuill modules={modules} 
            onChange={handleMainChange}
            value={blogData.main}
            // name='main'
            // name="main"
            id="post-textarea"
            className="desc-input"
            placeholder="Write a post..."
            theme="snow" />
          </div>
        </div>
      </section>
    </main>
  );
}
