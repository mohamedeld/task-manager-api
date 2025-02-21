const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const User = require("../models/userModel");
const login = async (req,res)=>{
  const {username,password} = req.body;
  if(!username || !password){
    throw new Error("Please provide email or password")
  }
  const user = await User.findOne({username});
  if(!user){
    throw new Error("user not found")
  }
  const isPasswordCorrect = await bcrypt.compare(password,user.password);
  if(!isPasswordCorrect){
    throw new Error("password is not correct")
  }
  const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:'30d'})
  const hashedPassword = await bcrypt.hash(password,10);
  const newUser = await User.create({username,password:hashedPassword});
  res.status(201).json({
    message:"user logined successfully"
  })
}


const protect = async(req,res)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader?.startsWith('Bearer ')){
    throw new Error("you are not authorized")
  }
  const token = authHeader.split(' ')[1];
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const currentUser = await User.findOne({username:decoded?.username});
    if(!currentUser){
      throw new Error(
        "the user that belong to this token does no longer exist"
      );
    }
    request.user = currentUser;
    next();
  }catch(error){
    res.status(401).json({
      message:"you are not authorized"
    })
    return;
  }
}