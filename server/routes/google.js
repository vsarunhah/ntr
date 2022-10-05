const express = require("express");
const googleRouter = express.Router();
const Token = require("../models/token");
const {User} = require("../models/user");
const crypto = require("crypto"); 

googleRouter.route("/google").post(async(req, res) => {
    console.log("req: ", req.body);
    console.log("google HERE");
    var token;
    try {
        var user = await User.findOne({email: req.body.email});
        console.log("existing google user:", user);
        if (!user) {
            user = await new User({...req.body, verified: true}).save();
            console.log("new google user:", user);
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex") 
            }).save();
        } else {
            token = user.generateAuthToken();
        }
        console.log("token: ", token);
        res.status(200).send({data: token, message: "Google User signed in successfully", uid: user._id});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = googleRouter;