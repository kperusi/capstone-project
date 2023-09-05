import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";

export default function SidebarHambuger() {
  const style = {
    display: "flex",
    width: " 25px",
    height: " 2.5px",
    margin: "3px",
    transition: " all 0.3s ease-in-out",
    backgroundColor: "grey",

  };
  const [classname, setClassname] = useState("");
  const navigate = useNavigate()
const user = useContext(UserContext)

  const toggle = () => {
    if (classname === "active") {
      setClassname(""); 

    } else {
      setClassname("active");

     
    }
 
  };

 
  return (
    <div className={`hambuger ${classname}`} onClick={() => toggle()}>
      <span className="line" style={style}></span>
      <span className="line" style={style}></span>
      <span className="line" style={style}></span>
    </div>
  );
}
