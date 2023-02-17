const Blog = require("../models/blog.model"); // blog moddel
const jwt = require('jsonwebtoken'); //token used for storing cookie and authentication
const FIRST_SECRET_KEY = "banana"; //secret key for checking credentials

//creates blog after verifying the user
module.exports.createBlog = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    console.log(user);
    Blog.create({creator: user.username, ...req.body})
    .then(blog => {
        res.status(200).json({msg: blog})
    })
    .catch(err => res.status(400).json(err));
}

//retreaves a blog from database
module.exports.getBlog = (req, res) => {
    Blog.findOne({_id:req.params.id})
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json(err));
}

//retreaves all blogs from database
module.exports.getAllBlogs = (req, res) => {
    Blog.find({})
    .then( blogs => {
        res.json(blogs);
    })
    .catch(err => res.status(400).json(err));
}

//retreaves all blogs based on the username provided after checking the cookie to verify user
module.exports.getBlogByCreator = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    console.log(user.username);
    Blog.find({creator: user.username})
    .then( blogs => {
        res.json(blogs);
    })
    .catch(err => res.status(400).json(err));
}

//verifies the user and then checks that the blog is created by the verified user.
//if they are, it then updates the blog with the new form information
module.exports.updateBlog = (req,res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    Blog.findById({_id: req.params.id})
    .then(blog => {
        if (blog.creator == user.username){
            Blog.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
            .then(updatedBlog => res.json(updatedBlog))
            .catch(err => res.status(400).json(err));
        }
        else res.status(400).json({msg: "blog and user do not match"})
    })
    .catch(err => res.status(400).json(err))
}

module.exports.deleteBlog = (req,res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    Blog.findById({_id: req.params.id})
    .then(blog => {
        if (blog.creator == user.username){
            Blog.deleteOne({_id: req.params.id})
            .then(deletedBlog => res.json(deletedBlog))
            .catch(err => res.status(400).json(err));
        }
        else res.status(400).json({msg: "blog and user do not match"})
    })
    .catch(err => res.status(400).json(err))
}