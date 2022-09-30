const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const passwordComplexity = require('joi-password-complexity');

const experienceSchema = require('./experience.js');
const educationSchema = require('./education.js');
const applicationSchema = require('./application.js');



const userSchema = mongoose.Schema({
    name: String,
    address: String,
    email: {type: String, required: true, unique: true},
    verified: {type: Boolean, default: false},
    password: String,
    phoneNumber: Number,
    links: [String],
    skills: [String],
    experiences: [experienceSchema],
    education: [educationSchema],
    applications: [applicationSchema],
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.jwtPrivateKey);
    return token;
}

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    console.log("user.js validate", data);
    const schema = Joi.object({
        email: Joi.string().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });
    console.log("user.js validate", schema.validate(data));
    return schema.validate(data);
};

module.exports = {User, validate};