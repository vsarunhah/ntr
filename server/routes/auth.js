const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {User} = require("../models/user");
const bcrypt = require("bcrypt");

router.route("/auth").post(async function (req, res) {
    console.log("auth HERE");
    try {
        const {error} = validate(req.body);
        if (error) {
            console.log("validate error");
            return res.status(400).send(error.details[0].message);
        }
        const user = await User.findOne({email: req.body.email});
        console.log("user:", user);
        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!validPassword) {
            return res.status(400).send("Invalid email or password");
        }
        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "User logged in successfully"});
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

module.exports = router;