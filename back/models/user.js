var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FBUserSchema = new Schema({
    fb_id: { type: String, unique: true, required: true, lowercase:true},
    email: {type:String},
    token: { type: String, required: true },
    username : {type: String},
    provider: {type:String}
})

var FBUser = mongoose.model('FBUser', FBUserSchema)

module.exports = {
    FBUser : FBUser
}
