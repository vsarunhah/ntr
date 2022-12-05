const express = require("express");
const { Interview } = require("../models/Interview");
const Interviewrouter = express.Router();

Interviewrouter.route("/interview/add").post(async function (req, res) {
    try {
        let user = await new Interview({...req.body, verified: true}).save();
        res.status(200).send({message: "interview tip added successfully"});
        console.log("interview tip added successfully");
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

Interviewrouter.route("/interviews").post(async function (req, res) {
    try {
        console.log("in interviews");
        let interview_tips = await Interview.find({});
        console.log("got the interview tips");
        res.json(interview_tips);
        console.log(interview_tips);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = Interviewrouter;