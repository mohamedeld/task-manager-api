const Task = require("../models/taskModel");

const createTask = async (req,res)=>{
  try {const newTask = await Tast?.create(req?.body);
  res.status(201).json({
    message:"Task created sucessfully",
    task:newTask
  })
}catch(error){
  res.status(500).json({
    message:error?.message
  })
}
}
const getAllTask = async (req,res)=>{
  try{const tasks = await Task.find({})
  res.status(200).json({
    tasks
  })
}catch(error){
  res.status(500).json({
    message:error?.message
  })
}
}
const getTask = async (req,res)=>{
  try{const id = req?.params?.id;
  const task = await Task.findById(id)
  res.status(200).json({
    task
  })
}catch(error){
  res.status(500).json({
    message:error?.message
  })
}
}
const updateTask = async (req,res)=>{
  try{const id = req?.params?.id;
  const task = await Task.findById(id);
  if(!task){
    throw new Error("Task is not round");
  }
  const updatedTask = await Task.findByIdAndUpdate(id,req?.body,{new:true});
  res.status(200).json({
    updatedTask
  })
}catch(error){
  res.status(500).json({
    message:error?.message
  })
}
}
const deleteTask = async (req,res)=>{
  try{
    const id = req?.params?.id;
  const task = await Task.findById(id);
  if(!task){
    throw new Error("Task is not round");
  }
  const updatedTask = await Task.findByIdAndDelete(id);
  res.status(200).json({
    message:"task deleted successfully"
  })
  }catch(error){
    res.status(500).json({
      message:error?.message
    })
  }
}

module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask
}