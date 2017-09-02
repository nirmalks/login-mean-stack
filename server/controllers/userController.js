const express = require('express');
const router = express.Router();
const User = require('../models/User');

let userController = {};

userController.signup = (req,res,next) => {
    let userParams = req.body;

	const user = new User({
        username: userParams.username,
        password: userParams.password,
        email: userParams.email
    });
    user.save().then((user) => {
        res.json({success:true, message: "Added successfully."});
    } , (e) => {
        res.json({success: false, message: `Failed to create a new list. Error: ${e}`});
    });
};


userController.login = (req, res, next) => {

    let userParams = req.body;
    let email = userParams.email;
    let password = userParams.password;
    console.log(email);
    console.log(password);
    User.findOne({'email': email , 'password' : password } , function (err, user) {

        if(err) {
              res.json({success: false, message: "Invalid username / password"}); 
        }
        console.log(user);
        if(user != null) {
            res.json({success: true, message: "Login successfull" , user: user });
        } else {
            res.json({success: false, message: "Invalid username / password"}); 
        }
        
    });
};
module.exports = userController;
