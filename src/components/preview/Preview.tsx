import React from 'react'
import { useParams } from 'react-router-dom'

export default function Preview(props:any) {
    const {id}= useParams()
  return (
    <main className='preview'>
      preview
      
    {id}
    </main>
  )
}
