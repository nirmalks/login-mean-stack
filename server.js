const express = require('express');
const bodyParser = require('body-parser');
const api = require('./server/routes/index');
/*mongoose config*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const config = require('./server/config/database');
mongoose.connect(config.database);


const userController = require('./server/controllers/userController');

const app = express();
const routes = require('./server/routes/index');
/*express middleware */
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/user',api);
app.use('/', api);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});