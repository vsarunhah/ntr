const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

router.route("/auth").post(async function (req, res) {
    console.log("auth HERE");
    try {
        const {error} = validate(req.body);
        if (error) {
            console.log("validate error");
            return res.status(400).send(error.details[0].message);
        }
        const user = await User.findOne({email: req.body.email});
        // console.log("user:", user);
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!validPassword) {
            return res.status(400).send("Invalid email or password");
        }

        console.log("auth before verified");

        if (!user.verified) {
            let token = await Token.findOne({userId: user._id});
            if (!token) {
                token = await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex") 
                }).save();
            }
            console.log("auth user not verified");
            return res.status(400).send("An Email has been sen to your account. Please verify your email");
        }

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "User logged in successfully", user_id: user._id});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

const validate = (data) => {
    console.log(data);
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(5).required().label("Password"),
    });
    return schema.validate(data);
}

router.get("/auth/logout", (req, res) => {
    console.log("logout HERE");
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});


module.exports = router;