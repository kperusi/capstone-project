import React,{ useState, useEffect } from 'react'
import { collection, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from 'react-router-dom';
export default function TrendingTopics() {
    const [currentPage, setCurrentPage]=useState(1)
    
    const navigate =useNavigate()

    const [tags, setTags] = useState([
      "Programming",
      "Data Science",
      "Technology",
      "Machine Learning",
      "politics",
    ]);

 useEffect(()=>{
    onSnapshot(collection(db,'Blogs'),
    (snapshot)=>{
      let tag =['Programming','Data Science','Technology','Machine Learning','Politics']
      snapshot.docs.forEach((doc)=>{
        tag.push(...doc.get('tags'))

      })
         const uniqueTags = [...new Set(tag)];
        const t= uniqueTags.filter(value=>value !=='')
         setTags(t)

    })
  },[])
  let projectPerPage = 2;
  let NumberOfPages = Math.ceil(tags.length / projectPerPage);
  let lastIndex = currentPage*projectPerPage;
  let startIndex = lastIndex-projectPerPage


  return (
    <main className='trending-topic'>
 {
    tags.slice(startIndex,lastIndex).map((tag)=>(<div key={tag} className='trending-topic-tag'>{tag}</div>))
 }


    </main>
  )
}
