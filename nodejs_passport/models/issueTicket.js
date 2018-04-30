var mongoose = require('mongoose')
var Schema = mongoose.Schema

var issueTicketSchema = new Schema({
    FB_ID: { type: String, required: true},  //facebook number id
    Ticket_ID: {type:String, unique: true, required: true}, //ticket id : task id(unique)
    URL: { type: String, required: true }, //capture URL
    Issue_time : {type: Date, required: true}, // issue_time : required time
    bCleared: {type:Boolean, required: true, default:false}, // bCleared : Initial value false 
    Clear_time: {type: Date} // Clear_time : clear time saved , Initial value equal issue_time
})

var issueTicket = mongoose.model('issueTicket', issueTicketSchema)

module.exports = {
    issueTicket : issueTicket
}
