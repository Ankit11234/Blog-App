import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from './Blog';

const UserBlogs = () => {
  const id = localStorage.getItem("userId");

  const [user,setUser]=useState();

  const sendRequest = async()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`).catch((err)=>console.log(err));
    const data = await res.data;
    console.log("data is",data);
    return data;
  }
  useEffect(() => {
    
    sendRequest().then((data)=>setUser(data));
  }, [])
  
  console.log(user);
  return (
    <div>
      {user  && user.blogs.blogs.map((blog,index)=>(          
        <Blog 
        isUser={true}
        id={blog._id}
        key={index} 
        title={blog.title} 
        description={blog.description}
         imageURL={blog.image}
          userName={user.blogs.name}/>
      ))}
    </div>
  )
}

export default UserBlogs