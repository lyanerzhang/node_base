var express = require('express');
var router = express.Router();
var url = require('url');

/* GET home page. */
router.get('/login', function(req, res, next) {
    console.log(req.url);
    console.log(url.parse(req.url, true));
    let info = url.parse(req.url, true);
    console.log(info.query.username);
  // res.render('index', { title: 'Ex啛啛喳喳press' });
});

module.exports = router;
