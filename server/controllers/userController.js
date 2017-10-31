const express = require('express');
const jwt    = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
var bcrypt = require('bcryptjs');
let userController = {};
const secret = require('../config/config');
userController.signup = (req,res,next) => {
    let userParams = req.body;

	const user = new User(); 
    user.username =  userParams.username;
    user.email =  userParams.email;
 
    bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(userParams.password, salt, function(err, hash) {
       user.password = hash;
        user.save().then((user) => {
            res.json({success:true, message: "Added successfully."});
        } , (e) => {
            res.json({success: false, message: `Failed to create a new list. Error: ${e}`});
        });
    });
    });
};


userController.login = (req, res, next) => {
    let userParams = req.body;
    let email = userParams.email;
    
    User.findOne({'email': email} , function (err, user) {
        if(err) {
              res.json({success: false, message: "Invalid username / password"}); 
        }
        if(user != null) {
            bcrypt.compare(userParams.password, user.password).then((resp) => {
                console.log(resp);
                if(resp === true) {
                     user.token = jwt.sign(user, secret.secret, {
                        expiresIn: 1440 // expires in 24 hours
                    });
                    res.status(200).send(user);
                } else {
                    res.status(401).send({success: false, message: "Invalid username / password"}); 
                }
            });       
        } else {
            res.status(401).send({success: false, message: "Invalid username / password"}); 
        }
        
    });
};

userController.update = (req, res , next) => {
    let userParams = req.body;
    User.findOne({'email': userParams.email} , function (err, user) {
        if(err) {
              res.json({success: false, message: "Invalid username / password"}); 
        }
        if(user != null) {
            bcrypt.compare(userParams.password, user.password).then((resp) => {
                console.log(resp);
                if(resp === true) {
                        user.update({phone: userParams.phone , city: userParams.city , password: userParams.password } , function(err, success){
                            if(err){
                                res.status(403).send({success: false, message: "Update Failed"}); 
                            }
                            if(success) {
                                User.findOne({email : userParams.email }, function(err, updatedUser){
                                    if(updatedUser !== null) {
                                       res.status(200).send(updatedUser); 
                                    }
                                })          
                            }
                        });
                   
                } else {
                    res.status(403).send({success: false, message: "Update Failed"}); 
                }
            });       
        } else {
            res.status(401).send({success: false, message: "Invalid username / password"}); 
        }
        
    });

};
module.exports = userController;
