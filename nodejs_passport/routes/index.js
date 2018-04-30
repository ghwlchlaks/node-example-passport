var express = require('express');
var router = express.Router();
var passport = require('passport')

var captureController = require('../policies/CaptureController')
/* GET home page. */

router.get('/',function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/profile',isLoggedIn,function(req, res, next){
  res.render('profile', {user : req.user, token : req.user.token})
})

// router.get('/profile/getPicture', isLoggedIn, function(req, res, next) {
//   // 디비와 token 혹은 user data를 비교해서 해당 유저에 맞는 그림을 디비에서 가져오는 메소드 작성
// })

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
    console.log('a')
    return next()
  }
  res.redirect('/')
}

router.post('/capture/putCaptureWork', captureController.putCaptureWork)
router.post('/capture/clearTicket', captureController.clearTicket)

module.exports = router;
