const express = require("express");
const crypto = require('crypto');
const {User} = require("../models/user");
const { application } = require("express");

const statuses = {
  Applied: 0,
  Interview: 1,
  Offer: 2,
  Rejected: 3,
  Accepted: 4,
};
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const applicationRoutes = express.Router();

// This section will help you create a new application.
applicationRoutes.route("/application/create").post(async function (req, res) {
  let myobj = {
    id: crypto.randomUUID(),
    companyName: req.body.companyName,
    roleName: req.body.roleName,
    applicationStatus: Number(req.body.applicationStatus),
    applicationDate: req.body.applicationDate,
    location: req.body.location,
    application_id: -1,
  };
  let user;
  if (req.body.companyName != null && req.body.companyName != '') {
    user = await User.findOneAndUpdate({_id: req.body.user_id}, {$push: {applications: myobj}});
  }
  res.status(200).send({data: user, message: "Application added"});
});

applicationRoutes.route("/applications").post(async function (req, res) {
    try {
      if (req.body["status"] === 'All' || req.body["company_name"] === 'All' || req.body["title"] === 'All' || req.body["date_applied"] === 'All') {
        let user = await User.findOne({_id: req.body.user_id}).select('applications');
        for (let i = 0; i < user.applications.length; i++) {
          user.applications[i].application_id = i;
        }
        res.status(200).send({data: user.applications, message: "Applications retrieved"});
      } else {
        let filt = { _id: req.body.user_id};
        let user = await User.findOne(filt).select('applications last_modified');
        for (let i = 0; i < user.applications.length; i++) {
          user.applications[i].application_id = i;
        }
        let applications = user.applications;
        if (req.body["status"] !== undefined) {
          applications = user.applications.filter(application => application.applicationStatus == statuses[req.body["status"]]);
        } else if (req.body["company_name"] !== undefined) {
          applications = user.applications.filter(application => application.companyName == req.body["company_name"]);
        } else if (req.body["title"] !== undefined) {
          applications = user.applications.filter(application => application.roleName == req.body["title"]);
        } else if (req.body["date_applied"] !== undefined) {
          if (req.body["date_applied"].includes("curr")) {
            currVersion = user.last_modified.toString().split("T")[0];
            applications = user.applications.filter(application => application.applicationDate === currVersion);
          } else if (req.body["date_applied"].includes("old")) {
            currVersion = user.last_modified.toString().split("T")[0];
            applications = user.applications.filter(application => application.applicationDate !== currVersion);
          } else {
            req.body["date_applied"] = req.body["date_applied"].split("-").reverse().join("-");
            console.log(req.body["date_applied"]);
            applications = user.applications.filter(application => application.applicationDate.split("T")[0] == req.body["date_applied"]);
          }
        }
        if (applications.length > 0) {
          res.status(200).send({data: applications, message: "Applications found"});
        } else {
          res.status(200).send({data: [], message: "No applications found"});
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
});

applicationRoutes.route("/application/delete").post(async function (req, res) {
  try {
    let arr = await User.findOne({ _id: req.body.user_id }).select("applications");
    
    for (var i = arr.applications.length - 1; i >= 0; i--) {
      if (arr.applications[i].id === req.body.application_id) {
        arr.applications.splice(i, 1);
      }
    }

    let user = await User.findOneAndUpdate(
      { _id: req.body.user_id },
      { $set: { applications: arr.applications } }
    );

    res.status(200).send({ data: user, message: "Application deleted" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

applicationRoutes.route("/application/update").post(async function (req, res) {
  let update_query = {
    $set: {
      "applications.$.applicationStatus": req.body.status,
    },
  };
  try {
    user = await User.updateOne(
      { _id: req.body.user_id, "applications.id": req.body.application_id },
      update_query
    );

    res.status(200).send({ message: "Application updated" });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = applicationRoutes;
