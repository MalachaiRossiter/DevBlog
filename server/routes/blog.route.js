const BlogController = require('../controllers/blog.controller');
const { authenticate } = require('../config/jwt.config');


module.exports = (app) => {

    //general blog crud, has authentication to check for cookie before processing
    app.get('/api/blog', BlogController.getAllBlogs);
    app.get('/api/blog/:id', BlogController.getBlog);
    app.put('/api/blog/:id', authenticate, BlogController.updateBlog);
    app.post('/api/blog', authenticate, BlogController.createBlog);
    app.post('/api/blog/creator', authenticate, BlogController.getBlogByCreator);
    app.delete('/api/blog/:id', authenticate, BlogController.deleteBlog);
}