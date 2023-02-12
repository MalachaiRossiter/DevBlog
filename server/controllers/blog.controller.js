const Blog = require("../models/blog.model");
const jwt = require('jsonwebtoken');
const FIRST_SECRET_KEY = "banana";

module.exports.createBlog = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    console.log(user);
    Blog.create({creator: user.username, ...req.body})
    .then(blog => {
        res.status(200).json({msg: blog})
    })
    .catch(err => res.status(400).json(err));
}

module.exports.getBlog = (req, res) => {
    Blog.findOne({_id:req.params.id})
    .then(blog => res.json(blog))
    .catch(err => res.status(400).json(err));
}

module.exports.getAllBlogs = (req, res) => {
    Blog.find({})
    .then( blogs => {
        res.json(blogs);
    })
    .catch(err => res.status(400).json(err));
}

module.exports.getBlogByCreator = (req, res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    console.log(user.username);
    Blog.find({creator: user.username})
    .then( blogs => {
        res.json(blogs);
    })
    .catch(err => res.status(400).json(err));
}

module.exports.updateBlog = (req,res) => {
    const user = jwt.verify(req.cookies.usertoken, FIRST_SECRET_KEY);
    Blog.findById({_id: req.params.id})
    .then(blog => {
        if (blog.creator == user.username){
            Blog.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, reValidators: true})
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