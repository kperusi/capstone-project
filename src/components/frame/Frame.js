import React from 'react'
import './framestyle.css'
function Frame(props) {
  return (
    <main className='frame-main'>
        <img src={props.icon} alt="icon" className='frame-icon'/>
        <h3 className='frame-title'>{props.title}</h3>
        <p className='frame-p'>{props.para}</p>
        
    </main>
  )
}

export default Frame