import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from "react-router-dom";
import axios from 'axios';




const Blog=({title,description,imageURL,userName,isUser,id})=>{
//  console.log(title,isUser);
 const navigate = useNavigate();
 console.log("id of blog is ",id)


 const handleEdit=()=>{
   navigate(`/myBlogs/${id}`);
 }

 const del=async()=>{
  const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((err)=>console.log(err));
  const data = await res.data;
  return data;
 }
 const handleDelete=()=>{
   
     del()
     .then(()=>navigate('/blogs'))
    //  .then(()=>navigate('/myBlogs'))
    //  .then(()=>navigate('/myBlogs'))
 }
  return (
    <div>
      <Card sx={{ maxWidth: "40%", margin:'auto',mt:2,padding:2,
      boxShadow:"5px 5px 10px #ccc",
      ":hover":{
        boxShadow:"10px 10px 20px #ccc"
      } }}>
        {isUser && (
          <Box display='flex'>
            <IconButton onClick={handleEdit} sx={{marginLeft:"auto"}}><EditIcon/></IconButton>
            <IconButton onClick={handleDelete} ><DeleteIcon/></IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName} 
            </Avatar>
          }
        
          title={title}
          // subheader={new Date()}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           <b>{userName}</b>{":"} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Blog;