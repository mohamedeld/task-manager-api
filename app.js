const express = require("express");
const app= express();
const dotenv = require("dotenv");
const taskRoutes = require("./routes/tast");
const connectToDB = require("./db");
const errorHandlerMiddleware = require("./config/middleware");
dotenv.config();

app.use(express.json())

app.use("/api/v1/task",taskRoutes);

app.use((req,res,next)=>{
  res.status(404).json({
    message:"Not found"
  })
})

app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000;

const start = async ()=>{
  try{
    await connectToDB();
  }catch(error){
    console.log(error);
  }
}
// Start the server
const startServer = () => {
  app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
  });
};

// Connect to the database and then start the server
start().then(startServer);