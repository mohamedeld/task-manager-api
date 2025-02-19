const asyncWrapper = require("../config/asyncWrapper");
const { createCustomError } = require("../config/custom-errors");
const Task = require("../models/taskModel");

const createTask = asyncWrapper(async (req, res) => {
  
  const newTask = await Tast?.create(req?.body);
  res.status(201).json({
    message: "Task created sucessfully",
    task: newTask
  })
})

const getAllTask = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({
      tasks
    })
  
})
const getTask = asyncWrapper(async (req, res) => {

    const id = req?.params?.id;
    const task = await Task.findById(id)
    if (!task) {
      return next(createCustomError("Task is not found",404))

    }
    res.status(200).json({
      task
    })
})
const updateTask = asyncWrapper(async (req, res) => {
    const id = req?.params?.id;
    const task = await Task.findById(id);
    if (!task) {
      return next(createCustomError("Task is not found",404))

    }
    const updatedTask = await Task.findByIdAndUpdate(id, req?.body, { new: true });
    res.status(200).json({
      updatedTask
    })
})
const deleteTask = asyncWrapper(async (req, res,next) => {
    const id = req?.params?.id;
    const task = await Task.findById(id);
    if (!task) {
      return next(createCustomError("Task is not found",404))
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({
      message: "task deleted successfully"
    })
})

module.exports = {
  createTask,
  getAllTask,
  getTask,
  updateTask,
  deleteTask
}