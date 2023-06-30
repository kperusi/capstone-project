import React from "react";
import Sidebar from "../sidebar/Sidebar";
import "./feedstyle.css";
// import { UserContext } from "../userContext/UserContext";
import {  Outlet } from "react-router-dom";
import Featured from "../featured/Featured";

export default function Feeds() {
 
  return (
    <main className="feed-main">
      <section className="feed-search">
        <div className="search-wrap">
          <svg
            width="21"
            height="22"
            viewBox="0 0 21 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              d="M16.031 15.46L20.314 19.742L18.899 21.157L14.617 16.874C13.0237 18.1512 11.042 18.8459 9 18.843C4.032 18.843 0 14.811 0 9.84302C0 4.87502 4.032 0.843018 9 0.843018C13.968 0.843018 18 4.87502 18 9.84302C18.0029 11.885 17.3082 13.8668 16.031 15.46ZM14.025 14.718C15.2941 13.4129 16.0029 11.6634 16 9.84302C16 5.97602 12.867 2.84302 9 2.84302C5.133 2.84302 2 5.97602 2 9.84302C2 13.71 5.133 16.843 9 16.843C10.8204 16.8459 12.5699 16.1371 13.875 14.868L14.025 14.718Z"
              fill="black"
            />
          </svg>
          <input type="text" placeholder="search chatter" />
        </div>
      </section>

      <section className="feed-sidebar">
        <Sidebar />
        {/* <Featured/> */}
      </section>

      <section className="feed-post-cx">
        <Outlet/>

      </section>
      
    </main>
  );
}
