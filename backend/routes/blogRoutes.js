import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getBlog, getByUserId, updateBlog } from "../controllers/blogContoller";
const blogRouter = express.Router();


blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getBlog);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get('/user/:id',getByUserId)


export default blogRouter;