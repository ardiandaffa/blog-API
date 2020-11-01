var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

//HANDLE USER
router.post('/', userController.create_user);

module.exports = router;
