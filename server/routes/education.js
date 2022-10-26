const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const eduRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a single record by id
eduRoutes.route("/education").post(function (req, res) {
 let db_connect = dbo.getDb("employees");
 console.log(req.body.user_id);
 console.log(req.body);
 let myquery = { user_id: req.body.user_id};
 db_connect
   .collection("educations")
   .findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
 
// This section will help you create a new record.
eduRoutes.route("/education/add").post(function (req, response) {
 let db_connect = dbo.getDb("employees");
 let myobj = {
   university: req.body.university,
   degree: req.body.degree,
   start_date: req.body.start_date,
   end_date: req.body.end_date,
   major: req.body.major,
   minor: req.body.minor,
   gpa: req.body.gpa,
   user_id: req.body.user_id,
   other: req.body.other
 };
 db_connect.collection("educations").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});


eduRoutes.route("/educationUpdate/").post(function (req, response) {
 let db_connect = dbo.getDb("employees");
 let myquery = { user_id: req.body.user_id };
 let newvalues = {
   $set: {
    university: req.body.university,
    degree: req.body.degree,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    major: req.body.major,
    minor: req.body.minor,
    gpa: req.body.gpa,
    user_id: req.body.user_id,
    other: req.body.other
   },
 };
 db_connect
   .collection("educations")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;  
     console.log("1 document updated");
     response.json(res);
   });
});

module.exports = eduRoutes;