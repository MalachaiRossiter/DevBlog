const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/DevBlog", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log("Failed to connect to mongoDB", err));