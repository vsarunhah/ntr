const express = require("express");
 
// reviewRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const reviewRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the reviews.
reviewRoutes.route("/reviews").get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    db_connect
      .collection("reviews")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

// This section will help you create a new review.
reviewRoutes.route("/review/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      companyName: req.body.companyName,
      description: req.body.description,
    };
    db_connect.collection("reviews").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

// This section will help you get a single record by id
reviewRoutes.route("/reviews/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("reviews")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// This section will help you delete a review
reviewRoutes.route("/reviews/:id").delete((req, response) => {
  console.log("backend is reached");
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("reviews").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    response.json(obj);
  });
 });

 //Updating a review
 reviewRoutes.route("/review/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      companyName: req.body.companyName,
      description: req.body.description,
    },
  };
  db_connect
    .collection("reviews")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });



module.exports = reviewRoutes;