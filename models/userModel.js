//requiring Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//Defining userSchema
const userSchema = new Schema({
    name: {type:String, required: [true, 'name field is required']},
    password: {type:String, required: [true, 'password field is required']},
    age:{type:Number, required:[true, 'age is required']}

});

const User = mongoose.model('user', userSchema);

//Exporting User to use in Server.js
module.exports = User;