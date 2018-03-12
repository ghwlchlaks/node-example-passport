var express = require('express');
var router = express.Router();

// reference files
//authentication
const SocialAuthenticationManager = require('../policies/SocialAuthenticationManager')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 소셜 로그인 라우팅
router.post('/auth/:provider', SocialAuthenticationManager.checkedValidation)

module.exports = router;
