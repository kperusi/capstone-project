import React, { useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useContext } from "react";
import { UserContext } from "../userContext/UserContext";
import { useDispatch } from "react-redux";
import { setPhoto_Url } from "../store/dataSlice";

export default function Settings() {
  const user = useContext(UserContext);
  const [imageAsFile, setImageAsFile] = useState<any>("");
  const [imageAsUrl, setImageAsUrl] = useState<any>("");
  const [progress, setProgress] = useState<any>("");
  const [filteredBlogs, setFilteredBlogs] = useState<any>([]);
  const [inputName, setInputName] = useState<any>("");
  const [userName, setUserName] = useState<any>("");
  const [updatedName, setUpdatedName] = useState<any>("");
  const dispatch = useDispatch();

  const handleImageAsFile = async (e:any) => {
    const image = e.target.files[0];
    setImageAsFile(image);
    setImageAsUrl(URL.createObjectURL(image));
    localStorage.setItem("photo", image);

    console.log("start of upload....");
  };

  const handleInputName = (e:any) => {
    setUpdatedName(e.target.value);
  };

  // console.log(updatedName)

  const handleSaveChanges = async () => {
    const storageRef = ref(
      storage,
      `images/${Date.now()}${user.uid}${user.displayName}${imageAsFile.name}`
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
          if (updatedName === "") {
            // updating users blog
            filteredBlogs.forEach(async (element:any) => {
              await updateDoc(doc(db, "Blogs", element.id), {
                userImageUrl: url,
              });
              setImageAsUrl(url);
            });

            // updating user
const cUser:any = auth.currentUser
            updateProfile(cUser, {
              photoURL: `${url}`,
            }).then(() => {
              dispatch(setPhoto_Url(cUser.photoURL));
            });
          } else {
            // updating users blog
            filteredBlogs.forEach(async (element:any) => {
              await updateDoc(doc(db, "Blogs", element.id), {
                userImageUrl: url,
                createdBy: updatedName,
              });
              setImageAsUrl(url);
            });

            // updating user
            const cUser:any = auth.currentUser
            updateProfile(cUser, {
              photoURL: `${url}`,
              displayName: updatedName,
            }).then(() => {
              dispatch(setPhoto_Url(cUser.photoURL));
            });
          }
        });
      }
    );
  };

  const handleImageDelete = async (imageUrl:any) => {
    try {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
      console.log("image deleted successfully");


      if (updatedName === "") {
        // updating users blog
        filteredBlogs.forEach(async (element:any) => {
          await updateDoc(doc(db, "Blogs", element.id), {
            userImageUrl: '',
          });
          setImageAsUrl('');
        });

        // updating user
        const cUser:any = auth.currentUser

        updateProfile(cUser, {
          photoURL: `${''}`,
        }).then(() => {
          dispatch(setPhoto_Url(cUser.photoURL));
        });
      } else {
        // updating users blog
        filteredBlogs.forEach(async (element:any) => {
          await updateDoc(doc(db, "Blogs", element.id), {
            userImageUrl: '',
            createdBy: updatedName,
          });
          setImageAsUrl('');
        });

        // updating user
        const cUser:any = auth.currentUser
        updateProfile(cUser, {
          photoURL: `${''}`,
          displayName: updatedName,
        }).then(() => {
          dispatch(setPhoto_Url(cUser.photoURL));
        });
      }

    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (user) {
      setUserName(user.displayName);
      setImageAsUrl(user.photoURL);
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
  }, [user, userName]);

 

  return (
    <main className="settings-main">
      <section className="settings-head">
        <h1 style={{ fontSize: "1.8em" }}>Users Settings</h1>
        <p style={{ color: "grey" }}>
          {" "}
          <i>Make Changes to suit your style...</i>{" "}
        </p>
      </section>
      <section className="settings-rw-main">
        <form className="settings-form">
          <label htmlFor="" style={{ marginBottom: "-20px" }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder={user ? user.displayName : ""}
            className="settings-input"
            value={updatedName}
            onChange={(e) => handleInputName(e)}
          />
          <label htmlFor="" style={{ marginBottom: "-20px" }}>
            Profile Tag
          </label>
          <input
            type="text"
            placeholder={user ? user.displayName : ""}
            className="settings-input"
            // value={updatedName}
            // onChange={(e) => handleInputName(e)}
          />
          <div>
            <label htmlFor="image-input">
              <h3>Profile Image</h3>
              <img
                src={imageAsUrl}
                alt={imageAsFile.name}
                className="settings-img"
              />
            </label>
            <div
              className="settings-cancel"
              onClick={() => {
                handleImageDelete(user.photoURL);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 image-delete"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
            <div>
              <ProgressBar  completed={progress}/>
              
              </div>
            <input
              id="image-input"
              type="file"
              onChange={handleImageAsFile}
              style={{ display: "none" }}
            />
          </div>
        </form>

        <button
          className="settings-btn"
          onClick={() => {
            handleSaveChanges();
          }}
        >
          Save Changes
        </button>
      </section>
    </main>
  );
}
