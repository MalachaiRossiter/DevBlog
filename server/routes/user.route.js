const UserController = require('../controllers/user.controller');


module.exports = (app) => {
    app.get('/api/user', UserController.getAllUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.put('/api/user/:id', UserController.updateUser);
    app.post('/api/user', UserController.createUser);
    app.delete('/api/user/:id', UserController.deleteUser);
}