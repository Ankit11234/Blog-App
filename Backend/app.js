const express = require('express');
const app=express();
const mongoose = require("mongoose");
const router= require("./routes/user-route");
const routers= require("./routes/blog-route");
const cors = require("cors");

const uri="mongodb+srv://admin:ankit@cluster0.dkkbsvn.mongodb.net/Blog?retryWrites=true&w=majority"
app.use(express.json());
mongoose.set('strictQuery', false);
app.use(cors());
const connectDB =()=>{
  try {
    mongoose.connect(
      uri,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        
      }
      );
      console.log('MongoDB is Connected...');
   
    } catch (err) {
       console.error(err.message);
       process.exit(1);
     }
 }

connectDB();

app.get('/',(req,res)=>{
  res.send("hello world")
})

const PORT=5000;
app.listen(PORT,()=>{
  console.log("Server is running on",PORT)
})
app.use("/api/user",router);
app.use("/api/blog",routers);