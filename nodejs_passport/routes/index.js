var express = require('express');
var router = express.Router();
var passport = require('passport')

var captureController = require('../policies/CaptureController')
// var redis = require('redis')
// var subscriber = redis.createClient()
// var publisher = redis.createClient()

/* GET home page. */
router.get('/',function(req, res, next) {
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

router.post('/capture/require', captureController.captureRequire)
router.post('/capture/clearTicket', captureController.clearTicket)

// subscriber.on('message', function(channel, message) { //get으로 받은 값을 처리하는 부분
//   if(channel === 'DoCapture') {

//   }
//   console.log('message ' + message + 'on channel + ' + channel + ' arrived!')
// })
// subscriber.subscribe('test1') //get으로 받을 부분을 설정

// router.post('/capture', function(req, res){
//   var captureUrl = req.body.url
//   publisher.publish('DoCapture', captureUrl)  //set : capture 버튼 클릭했을때 key value값을 등록 
//   res.send('success')
// })
module.exports = router;
