const Blog = require("../models/blog.model");

module.exports.createBlog = (req, res) => {
    Blog.create(req.body)
    .then(blog => res.json(blog))
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
        console.log(blogs)
        res.json(blogs);
    })
    .catch(err => res.status(400).json(err));
}

module.exports.updateBlog = (req,res) => {
    Blog.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, reValidators: true})
    .then(updatedBlog => res.json(updatedBlog))
    .catch(err => res.status(400).json(err));
}

module.exports.deleteBlog = (req,res) => {
    Blog.deleteOne({_id: req.params.id})
    .then(deletedBlog => res.json(deletedBlog))
    .catch(err => res.status(400).json(err));
}