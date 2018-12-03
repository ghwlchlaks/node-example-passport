var FBUser = require('../models/user').FBUser
var fbConfig = require('../config/SocialConfig')
var FacebookStrategy = require('passport-facebook')

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: fbConfig.facebook_config.clientID,
        clientSecret: fbConfig.facebook_config.clientSecret,
        callbackURL: fbConfig.facebook_config.callbackURL,
        profileFields: fbConfig.profileFields
    }, function (accessToken, refreshToken, profile, done) {
	console.log('facebook sucess')
            process.nextTick(function() {
            FBUser.findOne({social_id: profile.id},function(err, user){
                if(err) done(err)
                if(!user){
                    fbuser = new FBUser({
                        social_id : profile._json.id,
                        email : profile._json.email,
                        token : accessToken,
                        username: profile._json.name,
                        provider : profile.provider
                    })
                    fbuser.save(function (err, user) {
                        console.log('create ', user)
                        return done(err, user)
                    })
                }
                else{
                    console.log('else ' , user)
                    return done(null,user)
                }
            })
        })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}
