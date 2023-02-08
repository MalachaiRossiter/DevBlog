const BlogController = require('../controllers/blog.controller');


module.exports = (app) => {
    app.get('/api/blog', BlogController.getAllBlogs);
    app.get('/api/blog/:id', BlogController.getBlog);
    app.put('/api/blog/:id', BlogController.updateBlog);
    app.post('/api/blog', BlogController.createBlog);
    app.delete('/api/blog/:id', BlogController.deleteBlog);
}