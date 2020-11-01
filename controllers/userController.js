const User = require('../models/User');
const bcrypt = require('bcryptjs')

module.exports.create_user = async (req,res) => {

    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });

    newUser.password = await bcrypt.hash(newUser.password,10)
    
    await newUser.save();
    res.sendStatus(200);
};