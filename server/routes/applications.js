const express = require("express");
const crypto = require('crypto');
const {User} = require("../models/user");

const statuses = {
  Applied: 0,
  Interview: 1,
  Offer: 2,
  Rejected: 3,
};
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const applicationRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the applications.
applicationRoutes.route("/applications").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let user_id = ObjectId(req.body.user_id);
  let status_body = req.body["status"];
  let find_query = { user_id: user_id };
  //  console.log(status_body);
  if (Object.keys(statuses).includes(status_body)) {
    find_query["status"] = statuses[status_body];
  }
  db_connect
    .collection("applications")
    .find(find_query)
    .toArray(function (err, result) {
      if (err) throw err;
      for (let i = 0; i < result.length; i++) {
        result[i].application_id = i;
      }
      res.json(result);
      //  console.log(result);
    });
});

// This section will help you update the status of an application.
applicationRoutes.route("/application/update").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let user_id = ObjectId(req.body.user_id);
  let application_id = ObjectId(req.body.application_id);
  let update_query = {
    $set: {
      status: req.body.status,
    },
  };
  db_connect
    .collection("applications")
    .updateOne(
      { _id: application_id, user_id: user_id },
      update_query,
      function (err, result) {
        if (err) throw err;
        res.json(result);
        res.status(200).send();
      }
    );
});

// This section will help you delete an application.
applicationRoutes.route("/application/delete").post(function (req, res) {
  let db_connect = dbo.getDb("employees");
  let user_id = ObjectId(req.body.user_id);
  let application_id = ObjectId(req.body.application_id);
  db_connect
    .collection("applications")
    .deleteOne(
      { _id: application_id, user_id: user_id },
      function (err, result) {
        if (err) throw err;
        res.json(result);
        if (result.deletedCount == 1) {
          res.status(200).send();
        } else {
          res.status(500).send();
        }
      }
    );
});

// This section will help you create a new application.
applicationRoutes.route("/application/create").post(async function (req, res) {
  console.log("application create HERE");
  console.log(req.body);
  let myobj = {
    id: crypto.randomUUID(),
    companyName: req.body.companyName,
    roleName: req.body.roleName,
    applicationStatus: req.body.applicationStatus,
    applicationDate: req.body.applicationDate,
    location: req.body.location,
  };
  let user = await User.findOneAndUpdate({_id: req.body.user_id}, {$push: {applications: myobj}});
  res.status(200).send({data: user, message: "Application added"});
});
module.exports = applicationRoutes;
