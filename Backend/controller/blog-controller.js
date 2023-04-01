const { json } = require("express");
const { default: mongoose } = require("mongoose");
const Blog = require("../model/Blog");
const User = require("../model/User");

const getAllBlogs = async(req,res,next)=>{


        let blogs;
      
        try {
          blogs = await Blog.find().populate('user');
          
        } catch (error) {
          console.log(error);
        }
      
        if(!blogs){
          return res.status(400).json({message:"no blog found"});
        }

       return res.status(200).json({user:blogs});
}

const addBlogs=async(req,res,next)=>{

   const {description,title,image,user}=req.body;

   let existinguser;
   try {
    existinguser = await User.findById(user);
    
   } catch (error) {
    console.log(error);
   }
   if(!existinguser){
    return res.status(400).json({message:"no id found"});
   }

   const blog = new Blog({
       title,
       description,
       image,
       user,
   })
  
    try {
        const session = await mongoose.startSession();
         session.startTransaction();
        await blog.save({session});
        existinguser.blogs.push(blog);
        await existinguser.save({session});
        await session.commitTransaction();
      
    } catch (error) {
      console.log(error);
      return res.status(500),json({message:error});
    }
  

   return res.status(200).json({blog});
}


const updateBlog = async(req,res,next)=>{
    const {description,title,image,user}=req.body;
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(id,{
            title,
            description,
            image,
            
        })
        blog.save();
        
      } catch (error) {
        console.log(error);
      }

      if(!blog){
        return res.status(500).json({message:"unable to update blog"});
      }
      return res.status(200).json({message:"successfully updted blogs"});
}
const deleteBlog = async(req,res,next)=>{
    // const {description,title,image,user}=req.body;
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
       await  blog.user.save();
        
      } catch (error) {
        console.log(error);
      }

      if(!blog){
        return res.status(500).json({message:"unable to delete blog"});
      }
      return res.status(200).json({message:"successfully deleted blog"});
}

const getById= async(req,res,next)=>{

    let blogs;
    const id = req.params.id;

      
        try {
          blogs = await Blog.findById(id);
         await  blogs.save();
        } catch (error) {
          console.log(error);
        }
      
        if(!blogs){
          return res.status(400).json({message:"no blog found"});
        }

       return res.status(200).json({blogs});
}

const getByuserId = async(req,res,next)=>{
    const id = req.params.id;
    let userblog;
    console.log("id is ",id);
    try {
        userblog = await User.findById(id).populate('blogs');
        // .populate("blogs");
        // userblog.save();
        
    } catch (error) {
        return console.log(error);
    }
    if(!userblog){
        return res.status(400).json({message:"No Blog Found"});
    }

     return res.status(200).json({blogs:userblog});
}


module.exports={
    getAllBlogs,
    addBlogs,
    updateBlog,
    deleteBlog,
    getById,
    getByuserId
}