const { Schema,model,models } =require("mongoose");

const taskSchema = new Schema({
  name:{
    type:String,
    required:[true,"name is required"]
  },
  completed:{
    type:Boolean,
    default:false
  }
},{timestamps:true})


const Task = models.Task || model("Task",taskSchema);

module.exports = Task;