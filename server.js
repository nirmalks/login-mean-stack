const express = require('express');
const bodyParser = require('body-parser');
const api = require('./server/routes/auth');
/*mongoose config*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./server/config/config');
const jwt    = require('jsonwebtoken');
const cors = require('cors');
mongoose.connect(process.env.MONGOLAB_URI || config.database);
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const winston = require('winston');
const passport = require('passport');

const userController = require('./server/controllers/userController');

const app = express();
const authRoutes = require('./server/routes/auth');
const userRoutes = require('./server/routes/user');
const secret = require('./server/config/config');

const noAuthRoutes = require('./server/routes/test');
const googleAuthRoutes = require('./server/routes/google-auth');

/*express middleware */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// create a write stream (in append mode)
const logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('combined.log', {
  interval: '1d', // rotate daily
  path: logDirectory
});

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'log/combined.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.set('superSecret', config.secret);
app.use(cors());

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
var session = require('express-session');
app.use(session({secret: "nirmal-session"}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth',authRoutes);
app.use('/',noAuthRoutes);
app.use('/',googleAuthRoutes);
app.use('/user',userRoutes);
app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});
