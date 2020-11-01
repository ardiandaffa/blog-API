const Post = require('../models/Post');


module.exports.find_all_posts = (req,res) => {
    Post.find({})
        .then((posts) => {
            res.status(200).json(posts)
        })
};


module.exports.create_post = async (req,res) => {
    const newPost = new Post({
        postTitle: req.body.title,
        postContent: req.body.content,
        dateCreated: new Date(),
        image: req.body.image? req.body.image : ""
    })

    await newPost.save();
    res.status(200).json(newPost);
};


module.exports.post_detail = async (req,res) => {
    const selectedPost = await Post.findById(req.params.id);
    res.status(200).json(selectedPost);
};

module.exports.update_post = (req,res) => {
    Post.findOneAndUpdate({_id: req.params.id},
        {
            postTitle: req.body.title,
            postContent: req.body.content,
            dateCreated: new Date(),
            image: req.body.image? req.body.image : ""
        },
        { runValidators: true }, () => res.sendStatus(200))
};

module.exports.delete_post = (req,res) => {
    Post.findOneAndDelete(req.params.id, () => res.sendStatus(200))
};