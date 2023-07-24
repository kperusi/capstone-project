import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext/UserContext";

export default function Hambuger(props:any) {
  const style = {
    display: "block",
    width: " 30px",
    height: " 4px",
    margin: "4px",
    transition: " all 0.3s ease-in-out",
    backgroundColor: "grey",
  };
  const [classname, setClassname] = useState("");
  const navigate = useNavigate()
const user = useContext(UserContext)

  const toggle = () => {
    if (classname === "active") {
      setClassname("");
      if(!user){
        navigate('../')
      }
      if(user){
        navigate(-1)
      }
      

    } else {
      setClassname("active");
     
       navigate('menu-nav')
    
     
    }
    props.showHandler()
  };

  useEffect(()=>{
    if(props.mobi_menu==='nav-menu-close'){
      setClassname('')
    }
  },[props.mobi_menu])
console.log(props.mobi_menu)
  return (
    <div className={`hambuger ${classname}`} onClick={() => toggle()}>
      <span className="line" style={style}></span>
      <span className="line" style={style}></span>
      <span className="line" style={style}></span>
    </div>
  );
}
