import React,{useState} from 'react'


export default function Paginate(data:any,currentPage:any) {
    // const [currentPage, setCurrentPage] = useState(1);


    let projectPerPage = 5;
    let NumberOfPages = Math.ceil(data.length / projectPerPage);
    let lastIndex = currentPage * projectPerPage;
    let startIndex = lastIndex - projectPerPage;

  return (
    {NumberOfPages,lastIndex,startIndex}
  )
}
