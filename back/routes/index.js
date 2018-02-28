var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',isLoggedIn,function(req, res, next){
  res.render('profile', {user : req.user, token : req.user.token})
})

router.get('/login/facebook',passport.authenticate('facebook',{scope:['email']}))
router.get('/login/facebook/callback',passport.authenticate('facebook',{ successRedirect: '/profile',failureRedirect: '/'}))

function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}
module.exports = router;
