const User = require("../models/user.model");

module.exports.createUser = (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}

module.exports.getUser = (req, res) => {
    User.findOne({_id:req.params.id})
    .then(user => res.json(user))
    .catch(err => res.status(400).json(err));
}

module.exports.getAllUsers = (req, res) => {
    User.find({})
    .then( users => {
        console.log(users)
        res.json(users);
    })
    .catch(err => res.status(400).json(err));
}

module.exports.updateUser = (req,res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, reValidators: true})
    .then(updateduser => res.json(updateduser))
    .catch(err => res.status(400).json(err));
}

module.exports.deleteUser = (req,res) => {
    User.deleteOne({_id: req.params.id})
    .then(deleteduser => res.json(deleteduser))
    .catch(err => res.status(400).json(err));
}