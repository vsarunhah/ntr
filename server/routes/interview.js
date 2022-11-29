const express = require("express");
const { Interview } = require("../models/Interview");
const router = express.Router();
const {interview} = require("../models/Interview");

router.route("/interview/add").post(async function (req, res) {
    try {
        let user = await new Interview({...req.body, verified: true}).save();
        res.status(200).send({message: "interview tip added successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.route("/interviews").post(async function (req, res) {
    try {
        let interview_tips = await Interview.find({});
        res.json(interview_tips);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;