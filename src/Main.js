import React from 'react'
import Feeds from './components/feeds/Feeds'
import Home from './components/home/Home'
import FeedView from './components/mainfeed/FeedView'

export default function Main() {
    const user = JSON.parse(localStorage.getItem('user'))
  return (
    <main>

        {user? <FeedView/>:<Home/>}


    </main>
   
  )
}
