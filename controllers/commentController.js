const Comment = require('../models/Comment.js');

module.exports.find_all_comments = (req,res) => {
    Comment.find({_postID : req.params.id}).then(comments => {
        res.status(200).json(comments)
    })
};


module.exports.create_comment = async (req,res) => {
    const newComment = new Comment({
        name: req.body.name,
        comment: req.body.comment,
        dateCreated : new Date(),
        _postID : req.params.id
    })

    await newComment.save();
    res.status(201).setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
};

module.exports.get_comment_detail = (req,res) => {
    Comment.findById(req.params.commentid)
        .then(data => res.status(200).json(data))
};

module.exports.update_comment = (req,res) => {
    Comment.findByIdAndUpdate(req.params.commentid, {
        name: req.body.name,
        comment: req.body.comment,
        dateCreated : new Date(),
        _postID: req.params.id
    }, { runValidators: true } , () => res.sendStatus(200))
};

module.exports.delete_comment = async (req,res) => {
    await Comment.findByIdAndDelete(req.params.commentid)
        .then(res.sendStatus(200))
        .catch(err => res.sendStatus(400));
};