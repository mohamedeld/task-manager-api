const express = require("express");
const app= express();
const dotenv = require("dotenv");
const taskRoutes = require("./routes/tast");
const connectToDB = require("./db")
dotenv.config();

app.use(express.json())

app.use("/api/v1/task",taskRoutes);

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