const express = require("express");
const router = express.Router();
const {User} = require("../models/user");

router.route("/profile/add").post(async function (req, res) {
    console.log("profile HERE");
    console.log(req.body);
    try {
        let user = await User.findOne({_id: req.body.user_id});
        let update_query = {
            $set: {
                experiences: req.body.experiences,
                educations: req.body.educations
            },
          };
        user = await User.updateOne({_id: req.body.user_id}, update_query);
        console.log("user:", user);

        res.status(200).send({message: "User profile created"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.route("/profile/get_experiences").post(async function (req, res) {
    console.log("profile/get_experiences HERE");
    console.log(req.body);
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("experiences");
        console.log("user:", user);

        res.status(200).send({data: user, message: "User retrieved"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;