import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const labelstyle = {mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const AddBlog = () => {

  const navigate = useNavigate();
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

  const sendRequest=async()=>{
    const res = await axios.post('http://localhost:5000/api/blog/add',{
      title: inputs.title,
      description: inputs.description,
      image: inputs.imageurl,
      user: localStorage.getItem("userId")
    }).catch((err)=>console.log(err));
    console.log("res is",res);
    const data = await res.data;
    return data;
  }

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>navigate('/blogs'))

  }
  return (

    <div>
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
          <InputLabel sx={labelstyle}>ImageUrl
          </InputLabel>
          <TextField  name="imageurl" value={inputs.imageurl} onChange={handleChange} margin='auto' variant='outlined'/>
          <Button sx={{mt:2,borderRadius:4}}  variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog