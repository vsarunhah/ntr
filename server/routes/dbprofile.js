const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const dbprofileRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

dbprofileRoutes.route("/dbprofile").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("profiles")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
  
 
// This section will help you get a single record by id
dbprofileRoutes.route("/dbprofile/:id").get(function (req, res) {
 let db_connect = dbo.getDb("employees");
 console.log("params : "+params); console.log("id : "+params._id)
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("profiles")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
dbprofileRoutes.route("/dbprofile/add").post(function (req, response) {
 let db_connect = dbo.getDb("employees");
 let myobj = {
   first_name: req.body.first_name,
   last_name: req.body.last_name,
   email: req.body.email,
   phone: req.body.phone,
   address: req.body.address,
 };
 db_connect.collection("profiles").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
// This section will help you update a record by id.
dbprofileRoutes.route("/profileUpdate/:id").post(function (req, response) {
 let db_connect = dbo.getDb("employees");
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
   },
 };
 db_connect
   .collection("profiles")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;  ``
     console.log("1 document updated");
     response.json(res);
   });
});

module.exports = dbprofileRoutes;