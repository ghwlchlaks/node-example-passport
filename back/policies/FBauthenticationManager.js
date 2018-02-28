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
        FBUser.findOne({fb_id: profile.id},function(err, user){
            if(err) throw err
            else if(!user){
                fbuser = new FBUser({
                    fb_id : profile._json.id,
                    email : profile._json.email,
                    token : accessToken,
                    username: profile._json.name,
                    provider : profile.provider
                })
                fbuser.save(function (err, user) {
                    return done(err, user)
                })
            }
            else{
                return done(user)
            }
        })
    }))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}
