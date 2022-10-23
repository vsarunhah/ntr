const express = require("express");
 
const reviewRoutes = express.Router();
const {User} = require("../models/user");

// reviewRoutes.route("/reviews").get(function (req, res) {
//     let db_connect = dbo.getDb("employees");
//     db_connect
//       .collection("reviews")
//       .find({})
//       .toArray(function (err, result) {
//         if (err) throw err;
//         res.json(result);
//       });
//    });

reviewRoutes.route("/reviews").get(async function (req, res) {
  console.log("reviews HERE");
  console.log(req.body);
  try {
    let reviews = await User.find({ reviews: { $ne: [] } }).select("reviews");
    // console.log("fetched reviews:", reviews);
    var reviewsArray = [];
    for (let i = 0; i < reviews.length; i++) {
      for (let j = 0; j < reviews[i].reviews.length; j++) {
        reviewsArray.push(reviews[i].reviews[j]);
      }
    }
    // console.log("reviewsArray: ", reviewsArray);
    //res.status(200).send({data: reviewsArray, message: "Reviews retrieved"});
    res.json(reviewsArray);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
 });

// reviewRoutes.route("/review/add").post(function (req, response) {
//     let db_connect = dbo.getDb();
//     let myobj = {
//       companyName: req.body.companyName,
//       description: req.body.description,
//     };
//     db_connect.collection("reviews").insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       response.json(res);
//     });
//    });

reviewRoutes.route("/review/add").post(async function (req, response) {
  console.log("reviews add HERE");
  // console.log(req.body);
  let myobj = {
    id: req.body.newReview.id,
    companyName: req.body.newReview.companyName,
    description: req.body.newReview.description,
    rating: req.body.newReview.rating,
    tags: req.body.newReview.tags
  };
  let user = await User.findOneAndUpdate({_id: req.body.user_id}, {$push: {reviews: myobj}});
  // console.log("user:", user);
  response.status(200).send({data: user, message: "Review added"});
 });

// reviewRoutes.route("/reviews/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect
//     .collection("reviews")
//     .findOne(myquery, function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     });
//  });

 reviewRoutes.route("/reviews/get").post(async function (req, res) {
  console.log("reviews get HERE");
  // console.log(req.body);
  let review = await User.findOne({_id: req.body.user_id, "reviews.id": req.body.reviewId}).select("reviews");
  // console.log("review:", review);
  // res.status(200).send({data: review.reviews[0], message: "Review added"});
  res.json(review.reviews[0]);
 });

// reviewRoutes.route("/reviews/:id").delete((req, response) => {
//   console.log("backend is reached");
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   db_connect.collection("reviews").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     response.json(obj);
//   });
//  });

reviewRoutes.route("/reviews/delete").post(async (req, response) => {
  console.log("reviewd delete HERE");
  // console.log(req.body);
  let arr = await User.findOne({_id: req.body.user_id}).select("reviews");
  // console.log("old reviews:", arr.reviews);
  for (var i = arr.reviews.length - 1; i >= 0; i--) {
    if (arr.reviews[i].id === req.body.reviewId) {
      arr.reviews.splice(i, 1);
    }
  }
  // console.log("new reviews:", arr.reviews);
  let user = await User.findOneAndUpdate({_id: req.body.user_id}, {$set: {reviews: arr.reviews}});
  // console.log("user:", user);
  response.status(200).send({data: user, message: "Review deleted"});
 });

//  reviewRoutes.route("/review/update/:id").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: ObjectId(req.params.id) };
//   let newvalues = {
//     $set: {
//       companyName: req.body.companyName,
//       description: req.body.description,
//     },
//   };
//   db_connect
//     .collection("reviews")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       response.json(res);
//     });
//  });

reviewRoutes.route("/review/update/").post(async function (req, response) {
  console.log("review update HERE");
  // console.log(req.body);
  let update_query = {
    $set: {
      'reviews.$.companyName': req.body.companyName,
      'reviews.$.description': req.body.description,
    },
  };
  user = await User.updateOne({_id: req.body.user_id, "reviews.id": req.body.reviewId}, update_query);
  // console.log("user:", user);
  response.status(200).send({message: "review edited"});
 });

module.exports = reviewRoutes;