const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    res.json("API root url success");
});

module.exports = router;