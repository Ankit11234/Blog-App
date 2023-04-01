import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useNavigate, useParams } from 'react-router-dom'



const labelstyle = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const BlogDetail = () => {
  const id= useParams().id;
  console.log("id is",id)
  const navigate= useNavigate();
  const [blog,setBlog]=useState();
  const [inputs,setInputs]=useState({
    title:"",
    description:"",
    imageurl:"",
  })


  const handleChange=(e)=>{
    setInputs((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  // const sendRequest=async()=>{
  //   const res = await axios.post('http://localhost:5000/api/blog/add',{
  //     title: inputs.title,
  //     description: inputs.description,
  //     image: inputs.imageurl,
  //     user: localStorage.getItem("userId")
  //   }).catch((err)=>console.log(err));
  //   const data = await res.data;
  //   return data;
  // }

  const details = async()=>{
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=>console.log(err));
    const data = await res.data;
    console.log("data is",data)
    return data;
  }

  useEffect(()=>{
    details().then((data)=>{
      setBlog(data.blogs.blogs);
      setInputs({
        title: data.blogs.title,
        description: data.blogs.description,
        imageurl: data.blogs.image,
      })
    });
    console.log(inputs);
  },[id])

  const sendRequest=async()=>{
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
    }).catch((err)=>console.log(err));

    const data = await res.data;
    return data;
  }


  const handlesubmit=(e)=>{
    e.preventDefault();
    sendRequest().then((data)=>console.log(data)).then(()=>navigate('/myBlogs'));

  }

  // console.log(blog)
  return (
    <div>
      {inputs && 
       <form onSubmit={handlesubmit}>
        <Box border={3} borderColor="green" borderRadius={10} boxShadow="10px 10px 20px #ccc"
        padding={3}  display="flex"  margin={"auto"} marginTop={3}
        flexDirection={'column'} width={"80%"}>
          <Typography fontWeight={'bold'} padding={3} color="grey" variant='h2' textAlign={'center'}>
            Post Your Blog
          </Typography>
          <InputLabel sx={labelstyle}>Title
          </InputLabel>
          <TextField name="title" value={inputs.title} onChange={handleChange}   margin='auto' variant='outlined'/>
          <InputLabel sx={labelstyle}>Description
          </InputLabel>
          <TextField  name="description" value={inputs.description} onChange={handleChange} margin='auto' variant='outlined'/>
          {/* <InputLabel sx={labelstyle}>ImageUrl
          </InputLabel>
          <TextField  name="imageurl" value={inputs.imageurl} onChange={handleChange} margin='auto' variant='outlined'/> */}
          <Button sx={{mt:2,borderRadius:4}}  variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
      }
    </div>
  )
}

export default BlogDetail