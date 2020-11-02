var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

//HANDLE USER
router.post('/', userController.create_user);
router.patch('/:id',postController.update_post);
router.delete('/:id',postController.delete_post);
router.post('/', postController.create_post);


module.exports = router;
