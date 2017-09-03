const express = require('express');
const bodyParser = require('body-parser');
const api = require('./server/routes/auth');
/*mongoose config*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./server/config/config');
const jwt    = require('jsonwebtoken');
mongoose.connect(config.database);
const secret = require('./server/config/config');
const userController = require('./server/controllers/userController');

const app = express();
const noAuthRoutes = require('./server/routes/test');
/*express middleware */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('superSecret', config.secret);

app.use('/user',function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, secret.secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});
app.use('/', api);
app.use('/',noAuthRoutes);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});