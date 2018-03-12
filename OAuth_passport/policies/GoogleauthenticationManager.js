var GoogleUser = require('../models/user').GoogleUser
var googleConfig = require('../config/SocialConfig')
var GoogleStrategy = require('passport-google-oauth20')

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: googleConfig.google_config.clientID,
        clientSecret: googleConfig.google_config.clientSecret,
        callbackURL: googleConfig.google_config.callbackURL,
    }, function (accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                GoogleUser.findOne({social_id: profile.id},function(err, user){
                if(err) done(err)
                if(!user){
                    googleuser = new GoogleUser({
                        social_id : profile._json.id,
                        token : accessToken,
                        username: profile._json.displayName,
                        provider : profile.provider,
                        gender : profile._json.gender
                    })
                    googleuser.save(function (err, user) {
                        console.log('create ', user)
                        return done(err, user)
                    })
                }
                else{
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
