const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {

    app.get('/api/user', UserController.getAllUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.put('/api/user/:id', UserController.updateUser);
    app.post('/api/user', UserController.createUser);
    app.delete('/api/user/:id', authenticate, UserController.deleteUser);

    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', authenticate, UserController.logout);

    app.post('/api/user/loginCheck', UserController.loginCheck);
}