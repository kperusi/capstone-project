import React, { useContext, useEffect, useState } from "react";
import Posts from "../posts/Posts";
import { UserContext } from "../userContext/UserContext";
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
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./feedviewstyle.css";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setMobi_Menu, setSideShow } from "../store/dataSlice";

export default function FeedView() {
  const user = useContext(UserContext);
  // const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any>([]);
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error,setError]= useState<any>('')
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state: any) => state.data.sideShow);
  const arrowDown = useSelector((state: any) => state.data.arrowDown);
  const mobi_menu = useSelector((state:any)=>state.data.mobi_menu)

  useEffect(() => {
    try {
      const blogRef = collection(db, "Blogs");
      const q = query(
        blogRef,
        orderBy("createdAt", "desc"),
        where("status", "==", "published")
      );
      onSnapshot(q, (snapshot) => {
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLoading(false)
        setBlogs(blogs);
      })
    
     ;
      
    } catch (error) {
      setError(error)
    }
   
  }, []);

  useEffect(() => {
 onSnapshot(collection(db, "Blogs"),
     (snapshot) => {
      let tags = [];
      let list =[]
      snapshot.docs.forEach((doc) =>{
        tags.push(...doc.get("tags"));
        list.push({id:doc.id,...doc.data()})
        // console.log(tags);
      } )
     
    });
   
  }, []);

  useEffect(() => {
    let url =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=4b1d039407d64742acf1d0fe9f95d1bd";

    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res.articles);
        setNews(res.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleNavigate = (blog:any) => {
    const viewRef = doc(db, "Blogs", blog.id);
    const viewerRef = doc(db, "Blogs", blog.id);
    navigate(`/post/${blog.id}`);
  
    updateDoc(viewRef, {
      views: increment(1),
    });
if(user){
  updateDoc(viewerRef, {
    viewers: arrayUnion(user.uid),
  })
    .then(() => {
      console.log("liked");
    })
    .catch((e) => {
      console.log(e);
    });
}
else{
  updateDoc(viewerRef, {
    viewers: arrayUnion('Anonymous'),
  })
    .then(() => {
      console.log("liked");
    })
    .catch((e) => {
      console.log(e);
    });
}
   
  };
  const firstLetter = (blog:any) => {
    if (blog.createdBy) {
      return blog.createdBy.substring(0, 1);
    }
  };
  // console.log(user);

  const handleCreateDraft = async () => {
    setLoading(true);
    const blogRef = doc(collection(db, "Blogs"));
    await setDoc(blogRef, {
      title: "",
      main: "",
      imageUrl: "",
      userImageUrl: user?.photoURL,
      createdAt: Timestamp.now().toDate(),
      createdBy: user?.displayName,
      userId: user?.uid,
      likes: [],
      numberOfLikes: 0,
      comments: [],
      views: 0,
      viewers: [],
      status: "draft",
    });
    // console.log(blogRef.id);
    setLoading(false);
    navigate(`/edit/${blogRef.id}`);
  };
  // console.log(">>", loading);

  useEffect(() => {
    return () => {
      // console.log("“This is unmounted.”");
    };
  }, []);


// console.log(sidebarShow)
// console.log(arrowDown)
// console.log(mobi_menu)
  if(loading){
    return <section className='loader'></section>
  }

  return (
    <main>
      <section className="feedview-post-cx">
         
            <div className="feed-posts">
              {blogs.map((blog:any) => (
                <div
                  onClick={() => {
                    handleNavigate(blog);
                  dispatch(setMobi_Menu())}}
                  key={blog.id}
                  style={{
                    // marginBottom: "40px",
                    borderRadius:'8px',
                    border: "1px solid grey",
                  }}
                >
                  <Posts
                    status={blog.status}
                    firstLetter={firstLetter(blog)}
                    profilePic={blog.userImageUrl}
                    displayname={blog.createdBy}
                    prof="Product designer"
                    date={blog.createdAt.toDate().toDateString()}
                    title={blog.title}
                    readtime={blog.readtime}
                    post={blog.main}
                    postImage={blog.imageUrl}
                    comments={blog.comments.length}
                    likes={blog.numberOfLikes}
                    views={blog.views}
                    tags={blog.tags}
                  />
                </div>
              ))}
            </div>
            {/* <div>
              <h1>News for you</h1>
              {news.map((newsArticle, id) => (
                <main key={id}>
                  <h2>{newsArticle.author}</h2>
                  <p>{newsArticle.content}</p>
                </main>
              ))}
            </div> */}
      </section>
    </main>
  );
}
