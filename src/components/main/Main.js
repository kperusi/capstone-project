import React, { useContext, useEffect } from 'react'
import Feeds from '../feeds/Feeds'
import Home from '../home/Home'
import { UserContext } from '../userContext/UserContext'
import FeedHome from '../feedhome/FeedHome'
import { useNavigate } from 'react-router-dom'

export default function Main() {
    // const user = JSON.parse(localStorage.getItem('user'))
    const user =  useContext(UserContext)
    // const navigate = useNavigate()

    
  return (
    <main>

        {user? <FeedHome/>:<Home/>}


    </main>
   
  )
}
