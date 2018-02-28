var FBUser = require('../models/user').FBUser
var fbConfig = require('../config/fbConfig')
var FacebookStrategy = require('passport-facebook')

module.exports = function (passport) {
    passport.use(new FacebookStrategy({
        clientID: fbConfig.clientID,
        clientSecret: fbConfig.clientSecret,
        callbackURL: fbConfig.callbackURL,
        profileFields: fbConfig.profileFields
    }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
            FBUser.findOne({fb_id: profile.id},function(err, user){
                if(err) done(err)
                if(!user){
                    fbuser = new FBUser({
                        fb_id : profile._json.id,
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
