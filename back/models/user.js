var mongoose = require('mongoose')
var Schema = mongoose.Schema

var GoogleUserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase:true},
    accessToken: { type: String, required: true },
    name : {type: String},
    gender : {type:String},
    socialId : {type:String},
    provider : {type:String},
    jwtToken : {type:String}
})
var FacebookUserSchema = new Schema({
    email: { type: String, unique: true, required: true, lowercase:true},
    accessToken: { type: String, required: true },
    name : {type: String},
    gender : {type:String},
    socialId : {type:String},
    provider : {type:String},
    jwtToken : {type:String}
})
var GoogleUser = mongoose.model('GoogleUser', GoogleUserSchema)
var FacebookUser = mongoose.model('FacebookUser', FacebookUserSchema)

module.exports = {
    GoogleUser : GoogleUser,
    FacebookUser : FacebookUser
}