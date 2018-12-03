var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FBUserSchema = new Schema({
    social_id: { type: String, unique: true, required: true, lowercase:true},
    email: {type:String},
    token: { type: String, required: true },
    username : {type: String},
    provider: {type:String}
})
var GoogleserSchema = new Schema({
    social_id: { type: String, unique: true, required: true, lowercase:true},
    token: { type: String, required: true },
    username : {type: String},
    gender : {type:String},
    provider : {type:String},
})
var FBUser = mongoose.model('FBUser', FBUserSchema)
var GoogleUser = mongoose.model('GoogleUser', GoogleserSchema)

module.exports = {
    FBUser : FBUser,
    GoogleUser : GoogleUser
}
