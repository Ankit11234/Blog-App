const User = require("../model/User");
const bcrypt = require("bcrypt");


const getAllUsers =async(req,res,next)=>{

        let users;
      
        try {
          users = await User.find();
          
        } catch (error) {
          console.log(error);
        }
      
        if(!users){
          return res.status(400).json({message:"no useer found"});
        }
       return res.status(200).json({users});
      
};

const signup = async(req,res,next)=>{
    const {name,email,password}=req.body;

    let existinguser;
    try {
        existinguser= await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }
    if(existinguser){
        return res.status(400).json({message:"user already found"});
    }
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password,salt);
    const user = new User({
        name,
        email,
        password:hashed,
        tasks:[],
    })
    try {
        user.save();
        
    } catch (error) {
        return console.log(error);
    
    }
    return res.status(200).json({message:"successfully registered"});
}

const login = async (req,res,next)=>{
  const {email,password}=req.body;

  let existinguser;
  try {
      existinguser= await User.findOne({email});
  } catch (error) {
      return console.log(error);
  }
  if(!existinguser){
      return res.status(400).json({message:"user not found"});
  }
    let isCorrect;

    
    
    try {
      isCorrect = await bcrypt.compare(password,existinguser.password);
      
    } catch (error) {
      return console.log(error);
      
    }
    if(!isCorrect){
    return res.status(400).json({message:"incorrect password"});

  }
  return res.status(200).json({message:existinguser});
  // return res.status(200).json({message:"successfully login"});
}


module.exports={getAllUsers,signup,login};
