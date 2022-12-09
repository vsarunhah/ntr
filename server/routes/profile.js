const express = require("express");
const router = express.Router();
const {User} = require("../models/user");

router.route("/profile/add").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id});
        let update_query = {
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                profileEmail: req.body.profileEmail,
                phoneNumber: req.body.phoneNumber,
                links: req.body.links,
                skills: req.body.skills,
                address_line: req.body.address_line,
                city: req.body.city,
                state: req.body.state,
                postal_code: req.body.postal_code,
                experiences: req.body.experiences,
                educations: req.body.educations,
                projects: req.body.projects,
                personalWebsite: req.body.personalWebsite,
                last_modified: req.body.last_modified,
                websiteDetails: req.body.websiteDetails,
                hasWebsite: req.body.hasWebsite,
            },
          };
        user = await User.updateOne({_id: req.body.user_id}, update_query);
        // console.log("user:", user);

        res.status(200).send({message: "User profile created"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.route("/profile/get_profile").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id});
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.route("/profile/get_experiences").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("experiences");
        res.json(user.experiences);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.route("/profile/get_websiteDetails").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("websiteDetails");
        res.json(user.websiteDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.route("/profile/get_user").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id});
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    } 
});

router.route("/profile/get").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id});
        res.status(200).send({data: user, message: "User retrieved"});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    } 
});

router.route("/profile/get_educations").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("educations");
        res.json(user.educations);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.route("/profile/get_projects").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("projects");
        res.json(user.projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

router.route("/profile/get_personalWebsite").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("personalWebsite");
        //console.log("user:", user);
        res.json(user.personalWebsite);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});
router.route("/profile/hasWebsite").post(async function (req, res) {
    try {
        let user = await User.findOne({_id: req.body.user_id}).select("hasWebsite");
        res.json(user.hasWebsite);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;