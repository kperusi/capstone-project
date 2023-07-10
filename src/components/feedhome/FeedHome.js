import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Search from "../search/Search";
import './feedhomestyle/feedhomestyle.css'

export default function FeedHome() {
  return (
    <main className="feedhome">
      <section className="search-cx">
        <Search />
      </section>
      <section className="sidebar-cx">
        <Sidebar />
      </section>
      <section className="outlet-cx">
        <Outlet />
      </section>
      
    </main>
  );
}
