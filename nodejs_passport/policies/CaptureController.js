// monogoose models
var FBUser = require('../models/user').FBUser
var IssueTicket = require('../models/issueTicket').issueTicket

// social config
var fbConfig = require('../config/SocialConfig')

//redis set
var redis = require('redis');
var captureList = redis.createClient(6379, "172.17.0.3");

var inputList = function(fb_id, ticket_id, url, res){
	//input list('CaptureList', 'FB_ID', 'Ticket_ID', 'URL')
	var data = {
		"fb_id" : fb_id,
		"ticket_id" : ticket_id,
		"url" : url
	}
	captureList.lpush( 'CaptureList', data, function(err, reply){
            if(err) {res.send({state : false , message: err})}
	    else {
			captureList.publish('CaptureList', 'Data Input',function(err){
				 if(err) {res.send({state : false , message: err})}
			});
			res.send({state: true, message: reply})
		}
	});
	
}


module.exports = {
    captureRequire(req, res) {
        console.log(req.user)
        console.log(req.body)
        var user = req.user
        var getData = req.body
        var data = {
            "FB_ID" : user.social_id,
            "Ticket_ID" : "test",
            "URL" : getData.URL,
            "Issue_time" : getData.Issue_time,
            "bCleared" : false,
            "Clear_time" : getData.Issue_time
        }
        var issueTicket = new IssueTicket(data)
        issueTicket.save(function(err) {
            if(err) {res.send({state : false , message: err})}
            else {
		inputList(issueTicket.FB_ID, issueTicket.Ticket_ID, issueTicket.URL, res)
//                res.send({state: true, message: issueTicket})
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
