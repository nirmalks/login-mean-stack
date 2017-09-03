const express = require('express');
const jwt    = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
let authController = {};
const secret = require('../config/config');

authController.authenticate = (req, res , next) => {
    User.findOne({ email: req.body.email } , function(err, user) { 
         if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user !== null) {
            bcrypt.compare(req.body.password, user.password).then((resp) => {
                console.log(resp);
                if(resp === true) {
                     var token = jwt.sign(user, secret.secret, {
                        expiresIn: 1440 
                    });
                    res.json({success: true, message: "Login successfull" , user: user , token: token});
                } else {
                    res.json({success: false, message: "Invalid username / password"}); 
                }
            });       
        }   
    });
};

module.exports = authController;