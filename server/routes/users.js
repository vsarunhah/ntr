const express = require("express");
const userRoutes = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

userRoutes.route("/users").post(async(req, res) => {
    console.log("users HERE");
    try{
        console.log("req.body: ", req.body);
        const {error} = validate(req.body);
        if (error) {
            console.log("validate error");
            return res.status(400).send(error.details[0].message);
        }
        console.log("where is the error coming: ", error);
        let user = await User.findOne({email: req.body.email});
        if (user) {
            console.log("user exists");
            return res.status(409 ).send("User already registered");
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({...req.body, password: hashedPassword}).save();
        
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex") 
        }).save();

        console.log("token: ", token);

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify your email", url);

        res.status(201).send("An Email has been sen to your account. Please verify your email");
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }});

userRoutes.get("/users/:id/verify/:token", async(req, res) => {
    console.log("verify HERE");
    try {
        let user = await User.findOne({_id: req.params.id});
        if (!user) {
            return res.status(404).send("Invalid link");
        }
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });
        if (!token) {
            return res.status(400).send("Invalid link");
        }

        user = await User.updateOne({_id: user._id}, {verified: true});
        console.log("user verified");
        console.log("verified user:", user);
        await token.remove();

        res.status(200).send("Email Verified Successfully"); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = userRoutes;
