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
import { TagsInput } from "react-tag-input-component";
import { AnyMxRecord } from "dns";

export default function EditPost() {
  const [progress, setProgress] = useState<any>("");
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [blogData, setBlogData] = useState<any>({
    title: "",
    main: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });
  const [number_words, setNumber_Words] = useState(0);
  const [saving, setSaving] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [_saving, _setSaving] = useState(false);
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
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];
  const [selected, setSelected] = useState<any>([]);

  const handleTitleChange = (e: any) => {
    setSaving('Saving...')
    setBlogData({ ...blogData, title: e.target.value });
  };
  const handleMainChange = (main: any) => {
    setSaving('Saving...')
    setBlogData({ ...blogData, main: main });
  };
  const handleImageChange = (e: any) => {
    setSaving('Saving...')
    setBlogData({ ...blogData, image: e.target.files[0] });
  };
const handleTagChanged=(e:any)=>{

}
  useEffect(() => {
    const editDocRef = doc(db, "Blogs", id);
    onSnapshot(editDocRef, (snapshot: any) => {
      // console.log(snapshot.data());
      setBlogData({
        ...blogData,
        main: snapshot.data().main,
        title: snapshot.data().title,
        image:snapshot.data().image
      });
    });
  }, []);

  useEffect(():any=> {
    setSaving("");
    if (blogData.main) {
      const wpm = 225;
      setNumber_Words(blogData.main.split(" ").filter((word:any) => {
        return word !== "";
      }).length)
     
      setSaving("Saving...");
      // console.log(number_words)
      const time = Math.ceil(number_words / wpm);
      updateDoc(doc(db, "Blogs", id), {
        main: blogData.main,
        title: blogData.title,
        readtime: time,
      }).then(() => {
        _setSaving(false);
        setSaving("Saved");
       
      });
    }
  }, [blogData.main, id, blogData.title,number_words]);

useEffect(() => {
  setSaving('saving...')
    updateDoc(doc(db, "Blogs", id), {
      tags: selected,
    }).then(() => {
      _setSaving(false);
      setSaving("Saved");
    });
  }, [selected, id]);

  const handlePublish = async () => {
    setSaving("Publishing");
    await updateDoc(doc(db, "Blogs", id), {
      status: "published",
    }).then(() => {
      console.log("blog updated");
      navigate(`/chatter/mystories/all`);
    });
  };



  // const handlePublish = async () => {
  //   console.log("clicked");
  //   setSaving('Publishing...')
  //   if (blogData.main === "") {
  //     console.log("main cant be  empty");
  //     return;
  //   }
  //   if (blogData.title === "") {
  //     console.log("title cant be empty");
  //     return;
  //   }

  //   await updateDoc(doc(db, "Blogs", id), {
  //     main: blogData.main,
  //     title: blogData.title,
  //   }).then(() => {
  //     console.log("blog updated");
  //     setSaving('Published')
  //     navigate(`/chatter/mystories/published`);
  //   });
  // };

  // console.log(id);
  return (
    <main className="create-post-main">
      <section className="create-post-rw-1">
        <p>Your post <b>.</b>  {saving}</p>
        <p style={{marginLeft:'30px'}}>Number of Words . {number_words}</p>
        <button
          className="create-post-btn"
          onClick={() => {
            handlePublish();
          }}
        >
          Publish
        </button>
        <NavLink
          to={`/chatter/mystories/all`}
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
      <section className="create-post-col-2">
        <aside className="create-post-rw-2">
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
            <div>{titleImage && <img src={titleImage} alt={titleImage} />}</div>

            <div className="desc-cx">
      
              <ReactQuill
                modules={modules}
                formats={formats}
                value={blogData.main}
                onChange={handleMainChange}
                id="post-textarea"
                className="desc-input"
                placeholder="Write a post..."
                theme="snow"
                style={{
                  // height: "200px",
                  // border: "0.3px solid grey",
                  fontSize: "2.3em",
                  border: "none",
                }}
              />
            </div>
          </div>
        </aside>
        <aside className="tag-cx">
          <h1>Add tags to your post</h1>
          <div>
            <TagsInput
              value={selected}
              onChange={setSelected}
              placeHolder="Enter tags"
              name="tag"
            />
          </div>
          <div>
            <h1>Add Category</h1>
            <select name="" id="">
              <option value="">Select Categories</option>
            </select>
          </div>
        </aside>
      </section>
    </main>
  );
}
