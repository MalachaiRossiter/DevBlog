const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//creating the User database with validations
const UserSchema = new mongoose.Schema({
    username: {type: String, required: [true, "a username is required to make an account"], minlength: [3, "your username must be at least 3 characters long"], index: {unique: [true, "Someone already has this username"]}},
    
    //email with validations using Regex
    email: {type: mongoose.SchemaTypes.email, required: [true, "an email is required to make an account"], 
    validate: {validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
    message: "Please enter a valid email"}},

    password: {type: String, required: [true, "a password is required to make an account"]},
}, {timestamps: true});

//creats a temporary space for confirmed password
UserSchema.virtual('confirmPassword')
.get(() => this._confirmPassword)
.set(value => this._confirmPassword = value);

//checks if password and confirmedPassword match
UserSchema.pre('validate', function(next) {
    if (this.password !== this._confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

//using Bcrypt, hashes password to save in the database
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

module.exports = mongoose.model("User", UserSchema);