const mongoose = require('mongoose');


//USER SCHEMA
const postSchema = mongoose.Schema({
    postTitle: {type: String, required: true},
    postContent: {type: String, required: true},
    dateCreated: {type: Date, required: true},
    image: String
});


//USER MODEL
const Post = mongoose.model('Post', postSchema);

module.exports = Post;