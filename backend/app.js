import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blogRoutes";
import userRouter from "./routes/userRoutes";
import cors from 'cors';
const app = express();
app.use(cors());  
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/blog",blogRouter);



mongoose
  .connect(
    "mongodb+srv://srinivas:yAShSSqcegjIo1ko@cluster0.fkfyfzu.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5001))
  .then(() =>
    console.log("connected to database and listening to localhost 5001")
  )
  .catch((err) => console.log(err));

  //yAShSSqcegjIo1ko
