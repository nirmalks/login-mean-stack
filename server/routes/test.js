const express = require('express');
const router = express.Router();

let cache = (duration) => {
  console.log("inside cache");
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}


router.get('/', cache(100), function (req, res) {
  res.json("API root url success");
});

module.exports = router;
