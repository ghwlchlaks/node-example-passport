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

router.get('/login/google',passport.authenticate('google',{scope:['profile']}))
router.get('/login/google/callback',passport.authenticate('google',{ successRedirect: '/profile',failureRedirect: '/'}))

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/')
})
function isLoggedIn(req, res, next) {
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect('/')
}

module.exports = router;
