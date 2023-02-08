const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, "a username is required to make an account"], minlength: [3, "your username must be at least 3 characters long"], index: {unique: [true, "Someone already has this username"]}},
    email: {type: String, required: [true, "an email is required to make an account"]},
    password: {type: String, required: [true, "a password is required to make an account"]},
}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);