const express = require("express");
const userRoutes = express.Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const joi = require("joi");

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
        const user = await User.findOne({email: req.body.email});
        if (user) {
            console.log("user exists");
            return res.status(409 ).send("User already registered");
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashedPassword}).save();
        res.status(201).send("User created successfully");
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }});

module.exports = userRoutes;
