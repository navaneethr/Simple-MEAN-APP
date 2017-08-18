var express = require('express');

var app = express();

//Middleware used to define DB models and schemas
var mongoose = require('mongoose');

//Used to parse through REST API body content
var bodyParser = require('body-parser');

//connecting to mLab
mongoose.connect('mongodb://admin:admin@ds149613.mlab.com:49613/mydb');
mongoose.Promise = global.Promise;

//requiring it from userModel.js
var User = require('./models/userModel');

//Serving static files from __dirname/public
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//when a GET request is sent by client/frontend

app.get('/users', function (req, res) {

    //it finds all the data from collections and sends it as JSON data
    User.find({}).then(function (data) {
        res.json(data);
    });
});

//Receiving a POST request from client
app.post('/users', function (req, res) {
    console.log(req.body);

    //create a new user instance with the structure of the collection
    var user = new User(req.body);
    //Saving the data
    user.save().then(function (response) {
        //successful save
        res.json(response);
    });
});

//Receiving a DELETE request from client
app.delete('/userlist/:id', function (req, res) {
    //getting the id param which has been passed in the url
    var id = req.params.id;
   console.log(id);
   //Removing from the MongoDB
   User.findByIdAndRemove({_id:id}).then(function (response) {
        //successful Removal
        res.json(response);
   });
});

//Serving on 127.0.0.1/4000
app.listen(process.env.PORT || 4000, function () {
    console.log('Server Running on port 4000');
});

