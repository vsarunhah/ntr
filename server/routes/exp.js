const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const expRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// This section will help you get a single record by id
expRoutes.route("/exp").post(function (req, res) {
 let db_connect = dbo.getDb("employees");
 console.log(req.body.user_id);
 console.log(req.body);
 let myquery = { user_id: req.body.user_id};
 db_connect
   .collection("exps")
   .find(myquery)
   .toArray(function (err, result) {
    if (err) throw err;
    // for (let i = 0; i < result.length; i++) {
    //   result[i].exp_id = i;
    // }
    res.json(result);
  });
});
 
// This section will help you create a new record.
expRoutes.route("/exp/add").post(function (req, response) {
 let db_connect = dbo.getDb("employees");
 let myobj = {
   title: req.body.title,
   company_name: req.body.company_name,
   start_date: req.body.start_date,
   end_date: req.body.end_date,
   current_job: req.body.current_job,
   description: req.body.description,
   location: req.body.location,
   user_id: req.body.user_id
 };
 db_connect.collection("exp").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});


expRoutes.route("/expUpdate/").post(function (req, response) {
 let db_connect = dbo.getDb("employees");
 let myquery = { user_id: req.body.user_id };
 let newvalues = {
   $set: {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    user_id: req.body.user_id,
    links: req.body.links,
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

module.exports = expRoutes;