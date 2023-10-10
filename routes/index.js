var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let user = (req.user)?req.user:false ;
  res.render('home',{user:user, pub: true} );
});


router.get('/contact', function(req, res, next) {
  let user = (req.user)?req.user:false ;
  res.render('contact',{user:user, pub: true} );
});

module.exports = router;
