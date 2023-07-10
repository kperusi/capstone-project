import React, { useContext, useEffect, useState } from "react";
import "./createpost.css";
import { NavLink, useParams } from "react-router-dom";
import {
  Timestamp,
  addDoc,
  collection,
  where,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase/firebase";
import { UserContext } from "../userContext/UserContext";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import ProgressBar from "@ramonak/react-progress-bar";

export default function CreatePost() {
  const [progress, setProgress] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    main: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [saving, setSaving] = useState("");
  const [_saving, _setSaving] = useState(false);

  const { id } = useParams();

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

  const handleTitleChange = async (e) => {
    setBlogData({ ...blogData, title: e.target.value });
    setSaving("Saving...");
    _setSaving(true)



    await updateDoc(doc(db, "Blogs", id), {
      title: blogData.title,
    }).then(() => {
      setSaving("Saved");
      _setSaving(false);
      console.log("blog updated");
    });
  };

  const handleMainChange = async (main) => {
    setBlogData({ ...blogData, main: main });
    setSaving("Saving...");
    _setSaving(true)
    await updateDoc(doc(db, "Blogs", id), {
      main: blogData.main,
      title: blogData.title,
    }).then(() => {
      console.log("blog updated");
      setSaving("Saved");
      _setSaving(false)
    });
  };

  const handleImageChange = (e) => {
    setBlogData({ ...blogData, image: e.target.files[0] });
  };

  const handlePublish = async () => {
    setSaving('Publishing')
    await updateDoc(doc(db, "Blogs", id), {
      status: "published",
    }).then(() => {
      console.log("blog updated");
      navigate(`/chatter/${user.displayName}`);
    });
  };

  const handleSaveAsDraft = async () => {
    console.log(id);
    await updateDoc(doc(db, "Blogs", id), {
      // main: blogData.main,
      title: blogData.title,
    }).then(() => {
      console.log("blog updated");
    });
  };

  useEffect(() => {
    return () => {
      console.log("“This is unmounted.”");
    };
  }, []);

  useEffect(() => {
    const storageRef = ref(
      storage,
      `images/${Date.now()}${blogData.image.name}`
    );
    console.log(blogData.image);
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
        getDownloadURL(uploadedImage.snapshot.ref)
          .then(async (url) => {
            await updateDoc(doc(db, "Blogs", id), {
              imageUrl: url,
            }).then(() => {
              console.log("image updated", url);
              setProgress(0);
            });
          })
          .finally(() => {
            console.log("Saved");
            _setSaving(false)
          });
      }
    );
  }, [blogData.image, id]);


 



  return (
    <main className="create-post-main">
      <section className="create-post-rw-1">
        <p>Your post: {saving}</p>
        <button
          className= 'create-post-btn'
          disabled={_saving}
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
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
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
              // onInput={() => handleSaveAsDraft()}
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
          </div>
        </div>
      </section>
    </main>
  );
}

// const storageRef = ref(
//     storage,
//     `images/${Date.now()}${blogData.image.name}`
//   );
//   console.log(blogData.image)
//   const uploadedImage = uploadBytesResumable(storageRef, blogData.image);
//   uploadedImage.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       setProgress(progress);
//     },
//     (err) => {
//       console.log(err);
//     },
//     () => {

//       getDownloadURL(uploadedImage.snapshot.ref).then(async(url)=>{

//         await updateDoc(doc(db, "Blogs", id), {
//           imageUrl:url
//         }).then(() => {
//           console.log("image updated", url);
//         });
//       })
//       })
