import React, { useEffect } from "react";
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
import "./settingstyle/settingstyle.css";
import { useState } from "react";
import { auth, storage, db } from "../firebase/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../userContext/UserContext";

export default function Settings() {
  const user = useContext(UserContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState("");
  const [progress, setProgress] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [userPhotoUrl, setUserPhotoUrl] = useState("");
  const [userName, setUserName] = useState("");

  const handleImageAsFile = async (e) => {
    const image = e.target.files[0];
    setImageAsFile(image);
    setImageAsUrl(user?.photoURL||URL.createObjectURL(image) );

    console.log("start of upload....");
    if (imageAsFile === "") {
      console.log(`no image the image file is ${typeof imageAsFile}`);
      return;
    }
  };

  const handleSaveChanges = async () => {
    const storageRef = ref(
      storage,
      `images/${Date.now()}${user.uid}${imageAsFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imageAsFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // console.log(snapshot);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.log(err);
      },

      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          filteredBlogs.forEach(async (element) => {
           await updateDoc(doc(db,"Blogs",element.id),{
              userImageUrl:url
            })
            console.log(element)
            setImageAsUrl(url)
          });
          try {
            updateProfile(auth.currentUser, { photoURL: `${url}` });
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
      setImageAsUrl(user.photoURL)
    }
    const blogRef = collection(db, "Blogs");
    const q = query(blogRef, where("createdBy", "==", userName));
    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFilteredBlogs(blogs);
    });
  }, [user,userName]);

  // if (user) {
  //   console.log(user);
  // }
  // console.log(user.displayName);
  return (
    <main className="settings-main">
      Settings
      <section className="settings-rw-main">
        <form>
          <input
            type="text"
            placeholder={user ? user.displayName : ""}
            className="settings-input"
          />
          <div>
            <input type="file" onChange={handleImageAsFile} />
          </div>
        </form>

        <img src={imageAsUrl} alt={imageAsFile.name} className="settings-img" />
        <button
          onClick={() => {
            handleSaveChanges();
          }}
        >
          Save Changes
        </button>
        <p>{progress}</p>
        {/* <img src={userPhotoUrl} alt="userphotos" /> */}
      </section>
    </main>
  );
}


 
