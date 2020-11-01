const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
    name: {type: String, required: true},
    comment: {type: String, required: true},
    dateCreated : Date,
    _postID: {type: mongoose.Schema.Types.ObjectId, required: true}
})


const Comment = mongoose.model('Comment', commentSchema);



module.exports = Comment;