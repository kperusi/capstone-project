import React, { useState, useEffect } from "react";
import {
  arrayUnion,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./toptrendingstyles/toptrending.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function TopTrending() {
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<any>([]);
  const [error, setError] = useState<any>("");

  const [tags, setTags] = useState([
    "",
    // "Programming",
    // "Data Science",
    // "Technology",
    // "Machine Learning",
    // "politics",
  ]);

  useEffect(() => {
    onSnapshot(collection(db, "Blogs"), (snapshot) => {
      let tag = [
        "Programming",
        "Data Science",
        "Technology",
        "Machine Learning",
        "Politics",
      ];
      snapshot.docs.forEach((doc) => {
        tag.push(...doc.get("tags"));
      });
      const uniqueTags = [...new Set(tag)];
      const t = uniqueTags.filter((value) => value !== "");
      setTags(t);
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    try {
      const blogRef = collection(db, "Blogs");
      const q = query(
        blogRef,
        orderBy(`views`, "desc"),
        where("views", ">", 5),
        limit(5)

        // orderBy("createdAt", "desc"),
      );
      onSnapshot(q, (snapshot) => {
        const blogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogs(blogs);
        setLoading(false);
      });
    } catch (error) {
      setError(error);
    }
  }, []);

  let projectPerPage = 7;
  let NumberOfPages = Math.ceil(tags.length / projectPerPage);
  let lastIndex = currentPage * projectPerPage;
  let startIndex = lastIndex - projectPerPage;

  // console.log(">>", NumberOfPages);
  // console.log(currentPage);

  return (
    <main className="top-trending">
      <aside style={{display:'flex'}}>

    
      <section>
      <div className="more-btn-cx">
          <button
            className="top-trending-btn prev"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </section>
      
      <section className="trending-tag">
       
        <div className="trending-tag-wrap">
          {tags.slice(startIndex, lastIndex).map((tag) => (
            <div key={tag} className="trending-tags">
              {tag}
            </div>
          ))}
        </div>

        
      </section>


      <section className="next-cx">
      <div className="">
          <button
            className=" top-trending-btn nxt"
            disabled={currentPage === NumberOfPages}
            onClick={() => {
              setCurrentPage(currentPage + 1);
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </section>
      </aside>

      <section className="trending-blog">
        {loading && <div>loading...</div>}
        {blogs.map((blog: any) => (
          <div className="trending-blog-cx">
            <img
              src={blog.imageUrl}
              alt="a"
              style={{ width: "100%", height: "85px" }}
            />

            <h1 className="trending-blog-title"> {blog.title}</h1>
          </div>
        ))}
      </section>
    </main>
  );
}
