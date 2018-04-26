// monogoose models
var FBUser = require('../models/user').FBUser
var IssueTicket = require('../models/issueTicket').issueTicket

// social config
var fbConfig = require('../config/SocialConfig')

module.exports = {
    captureRequire(req, res) {
        console.log(req.user)
        console.log(req.body)
        var user = req.user
        var getData = req.body
        var data = {
            "FB_ID" : user.social_id,
            "Ticket_ID" : "",
            "URL" : getData.URL,
            "Issue_time" : getData.Issue_time,
            "bCleared" : false,
            "Clear_time" : getData.Issue_time
        }
        var issueTicket = new IssueTicket(data)
        issueTicket.save(function(err) {
            if(err) {res.send({state : false , message: err})}
            else {
                res.send({state: true, message: issueTicket})
            }
        })
    },

    clearTicket(req, res) {
        var ticket_id = req.body.Ticket_ID

        IssueTicket.findOne({"Ticket_ID" : ticket_id}, function(err, result) {
            if(err) {res.send({state: false, message: err})}
            if(!result) {res.send({state: false, message: "not match to ticket id"})}
            else {
                console.log(result)
                IssueTicket.update({"Ticket_ID" : ticket_id},{$set: {"bCleared" : true, "Clear_time" : new Date().getTime()}}
                ,function(err, result){
                    if(err) {res.send({state: false, message: err})}
                    else {
                        res.send({state: true, message: result})
                    }
                })
            }
        })
        
    }
}
