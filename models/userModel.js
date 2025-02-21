const {Schema,model,models} = require("mongoose")


const userSchema = new Schema({
  username:{
    type:String,
    required:[true,"provide email"]
  },
  password:{
    type:String,
    required:[true,"provide password"]
  }
},{timestamps:true})

const User = models?.User || model("User",userSchema);

module.exports = User;