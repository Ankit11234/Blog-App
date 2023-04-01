const express = require("express");
const router = express.Router();
const {getAllBlogs,addBlogs,updateBlog,deleteBlog,getById,getByuserId} = require("../controller/blog-controller.js");


router.get("/",getAllBlogs);
router.post("/add",addBlogs);
router.put("/update/:id",updateBlog);
router.delete("/:id",deleteBlog);
router.get("/:id",getById);
router.get("/user/:id",getByuserId);


module.exports = router;