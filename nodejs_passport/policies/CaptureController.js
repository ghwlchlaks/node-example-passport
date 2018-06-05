// monogoose model
var FBUser = require('../models/user').FBUser
var IssueTicket = require('../models/issueTicket').issueTicket

//redis set
var redis = require('redis');
var captureList = redis.createClient(6379, "172.17.0.2");

//crypto
var crypto = require('crypto')

module.exports = {
    putCaptureWork(req, res) {
        var user = req.user
        var getData = req.body
        var Ticket_ID = crypto.createHash('sha256').update(user.social_id + getData.Issue_time + getData.URL).digest('hex') // hash 된 Ticket ID
        /*
        FB_ID : social account id 
        Ticket_ID : FB_ID + Issue_time + URL 을 해쉬 한 값
        URL : capture 요청한 페이지 url 
        Issue_time : capture 요청이 발생한 시간
        bCleared : clear유무 초기값 false
        Clear_time : clear된 시간 초기값은 Issue_time과 동일
        */
        var data = {
            "FB_ID" : user.social_id,
            "ticket_id" : Ticket_ID,
            "URL" : getData.URL,
            "issue_time" : getData.Issue_time,
            "bCleared" : false,
            "clear_time" : getData.Issue_time,
	    "img_path" : "",
	    "hash" : ""
        }
        var issueTicket = new IssueTicket(data)

        issueTicket.save(function(err) {
            if(err) {res.send({state : false , message: err})}
            else {
		        inputList(issueTicket.FB_ID, issueTicket.ticket_id, issueTicket.URL, res)
            }
        })
    },

	deleteImage(req, res) {
		var ticket_id = req.body.ticket_ID.split("/")[2];
//		console.log(ticket_id.split("/")[2])
//		console.log("ticket Id" + ticket_id);
		IssueTicket.remove({"ticket_id": ticket_id}, function(err, result) {
			if(err) {res.send({state:false, message: err})}
			if(!result) {res.send({state: false, message: "not match to ticket id"})}
			else {
				console.log("success delete "+ result)
				res.send({state: true, message: "success"})
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
    },

    getCaptureImage(req, res) {
        var social_id = req.user.social_id

        IssueTicket.find({"FB_ID" : social_id}, ['ticket_id'] ,function(err, result) {
            console.log(result)
            if(err) {res.send({state: false, message: err})}
            else {
                res.render('profile', {user: req.user, token: req.user.token, images: result})
            }
        })
    }
}
//input list('CaptureList', 'FB_ID', 'Ticket_ID', 'URL')
var inputList = function(fb_id, ticket_id, url, res){
    var data = JSON.stringify({"fb_id" : fb_id,"ticket_id" : ticket_id,"url" : url})
    
	captureList.lpush('CaptureList', data, function(err, reply){
        if(err) {res.send({state : false , message: err})}
	    else {
			captureList.publish('CaptureList', 'Data Input',function(err){
                if(err) {res.send({state : false , message: err})}
                else {
                    res.send({state: true, message: reply})
                }
			});
		}
	});
}
