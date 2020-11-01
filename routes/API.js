var express = require('express');
var router = express.Router();

//REQUIRE PASSPORT FOR AUTHENTICATION
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

//HANDLE BLOG POST
router.get('/', postController.find_all_posts);

router.post('/', postController.create_post);

router.get('/:id', postController.post_detail);

router.patch('/:id',postController.update_post);

router.delete('/:id',postController.delete_post);

//HANDLE COMMENT HTTP REQUEST
router.get('/:id/comment', commentController.find_all_comments);

router.post('/:id/comment', commentController.create_comment);

router.get('/:id/comment/:commentid', commentController.get_comment_detail);

router.patch('/:id/comment/:commentid', commentController.update_comment)

router.delete('/:id/comment/:commentid',commentController.delete_comment);



module.exports = router;