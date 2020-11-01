const mongoose = require('mongoose');


//USER SCHEMA
const userSchema = mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
})


//USER MODEL
const User = mongoose.model('User', userSchema);

module.exports = User;