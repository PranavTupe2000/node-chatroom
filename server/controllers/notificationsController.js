const User = require("../models/user")

// getNotifications
exports.getNotifications = (req, res) =>{
    User.findOne({email:req.body.email},(err,user)=>{
        console.log(user.notifications);
        return res.json(user.notifications);
    })
}

// acceptPersonRequest
exports.acceptPersonRequest = (req, res) =>{
    User.findOne({email:req.body.email},(err,user)=>{
        user.persons.push(req.body.accepted);

        const index = user.persons.indexOf(req.body.accepted);
        if (index > -1) {
            user.persons.splice(index, 1);
        }

        console.log(user)
    })
}