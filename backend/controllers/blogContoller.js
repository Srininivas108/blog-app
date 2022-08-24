import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "NO Blogs Found" });
  }

  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  let existingUser;
  try {
     existingUser =await User.findById(user);
  } catch (error) {
    return console.log(error);
}
 if(!existingUser) {
    return res.status(400).json({message: "Unable to Find User by This Id"})
 }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
      const session  = await  mongoose.startSession();  
      session.startTransaction();
      await blog.save({session});
      existingUser.blogs.push(blog);
      await existingUser.save({session});
      await session.commitTransaction();
  } catch (error) {
    return res.status(500).json({message: error})
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to update blog" });
  }

  return res.status(200).json({ blog });
};
export const getBlog = async (req, res, next) => {
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(blogId);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "no blog found!!" });
  }

  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
      blog = await Blog.findByIdAndRemove(id).populate('user');
      await blog.user.blogs.pull(blog);
      await blog.user.save();

    } catch (error) {
      return console.log(error);
    }
    if (!blog) {
      return res.status(500).json({ message: "unable to delete Blog" });
    }
  
    return res.status(200).json({ message: " Successfully  Deleted" });
  };

export const getByUserId = async (req,res,next) =>{
        const userId  = req.params.id;
       let userBlogs;
       try {
           userBlogs =await User.findById(userId).populate("blogs")
       } catch (error) {
        return console.log(error);
       }
   if(!userBlogs){
    return  res.status(404).json({ message: "no Blog found" });
   }

   return res.status(200).json({user:userBlogs})


}
  