import React from "react";
import "./mobilesidebarstyle/mobilesidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { setSideShow } from "../store/dataSlice";
import Sidebar from "../sidebar/Sidebar";
export default function MobileSideBar() {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state: any) => state.data.sideShow);
  const arrowDown = useSelector((state: any) => state.data.arrowDown);

  console.log(sidebarShow);
  return (
    <main className="mobile-side-bar">
      <div
        onClick={() => {
          dispatch(setSideShow());
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-1 h-1 arrow-down ${sidebarShow}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`w-1 h-1 arrow-down ${arrowDown}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
     
      
    </main>
  );
}
