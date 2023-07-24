import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Search from "../search/Search";
import './feedhomestyle/feedhomestyle.css'
import MobileSideBar from "../mobilesidebar/MobileSideBar";
import { useDispatch, useSelector } from "react-redux";

export default function FeedHome() {
  const sidebarShow = useSelector((state: any) => state.data.sideShow);
  const arrowDown = useSelector((state: any) => state.data.arrowDown);
  return (
    <main className="feedhome">
      <section className="search-cx">
      <MobileSideBar/>
        <Search />
      </section>
      <section className={`mobile-sidebar-menu-cx ${sidebarShow}`}>
        <Sidebar/>
      </section>
      <section className="sidebar-cx">
         <Sidebar />
      </section>
     
      <section className={`outlet-cx ${arrowDown}`}>
        <Outlet />
      </section>
      
    </main>
  );
}
