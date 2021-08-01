// Required
require("dotenv").config();
const User = require("../models/user")
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

// SignUp
exports.signup = (req,res)=>{
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.message });
    }

    // Saving User
    user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            console.log(user,"ouho",User,req.body);
            return res.status(402).json({
                err : "Not able to save in DB"
            })
        }
        res.json({
            name : user.name,
            email: user.email,
            _id: user._id
        });
    })
}

// Login
exports.login = (req,res)=>{
    //Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Loging In
    const {email,password} =req.body;
    User.findOne({email: email},(err,user)=>{
        if(err || !user){
            console.log("Email is not registered");
            return res.status(400).json({ errors: "Email is not registered" });
        }

        if(!user.autheticate(password)){
            console.log("Password is not correct");
            return res.status(401).json({ errors: "Email and Password does not match" });
        }

        //Token
        var token = jwt.sign({_id : user._id}, process.env.SECRET);
        //Putting token in cookie
        res.cookie("token",token,{expire: new Date() + 9999})

        //send response to front end
        const { _id, name, email} = user;
        return res.json({ token, user: { _id, name, email } });

    })
}

// Logout
exports.logout = (req,res)=>{
    res.clearCookie("token");
    res.json({"msg":"Signed Out Success"})
}
