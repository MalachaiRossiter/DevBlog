const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

module.exports.createUser = (req, res) => {
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.process.env.FIRST_SECRET_KEY);

        res.cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!", user: user});
    })
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

module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email});
    if(user === null) {
        return res.sendStatus(400);
    }

    const correctPassword = await bcrypt.compair(req.body.password, user.password);

    if(!correctPassword){
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);

    res.cookie("usertoken", userToken, {
        httpOnly: true
    })
    .json({ msg: "cookie obtained!"});
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}