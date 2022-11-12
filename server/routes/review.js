const express = require("express");
const reviewRoutes = express.Router();
const { User } = require("../models/user");

reviewRoutes.route("/reviews").get(async function (req, res) {
  try {
    let reviews = await User.find({ reviews: { $ne: [] } }).select("reviews");
    var reviewsArray = [];
    for (let i = 0; i < reviews.length; i++) {
      for (let j = 0; j < reviews[i].reviews.length; j++) {
        reviews[i].reviews[j].user = reviews[i]._id;
        reviewsArray.push(reviews[i].reviews[j]);
      }
    }
    res.json(reviewsArray);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

reviewRoutes.route("/review/add").post(async function (req, response) {
  let myobj = {
    id: req.body.newReview.id,
    companyName: req.body.newReview.companyName,
    description: req.body.newReview.description,
    rating: req.body.newReview.rating,
    tags: req.body.newReview.tags,
    upvotes: [],
    downvotes: [],
    user: req.body.newReview.user,
  };
  let user = await User.findOneAndUpdate(
    { _id: req.body.user_id },
    { $push: { reviews: myobj } }
  );

  response.status(200).send({ data: user, message: "Review added" });
});

reviewRoutes.route("/reviews/get").post(async function (req, res) {
  let review = await User.findOne({
    _id: req.body.user_id,
  }).select("reviews");
  res.json(review.reviews.find((r) => r.id === req.body.reviewId));
});

reviewRoutes.route("/reviews/delete").post(async (req, response) => {
  let arr = await User.findOne({ _id: req.body.user_id }).select("reviews");

  for (var i = arr.reviews.length - 1; i >= 0; i--) {
    if (arr.reviews[i].id === req.body.reviewId) {
      arr.reviews.splice(i, 1);
    }
  }

  let user = await User.findOneAndUpdate(
    { _id: req.body.user_id },
    { $set: { reviews: arr.reviews } }
  );

  response.status(200).send({ data: user, message: "Review deleted" });
});

reviewRoutes.route("/review/update/").post(async function (req, response) {
  let update_query = {
    $set: {
      "reviews.$.companyName": req.body.companyName,
      "reviews.$.description": req.body.description,
      "reviews.$.rating": req.body.rating,
      "reviews.$.tags": req.body.tags,
    },
  };
  user = await User.findOneAndUpdate(
    { _id: req.body.user_id, "reviews.id": req.body.reviewId },
    update_query
  );

  response.status(200).send({ message: "review edited" });
});

reviewRoutes.route("/review/upvote/").post(async function (req, response) {
  let reviews = await User.find({ reviews: { $ne: [] } }).select("reviews");
  let review_user = "";
  let actual_review_list = [];
  let found = false;
  for (let i = 0; i < reviews.length; i++) {
    for (let j = 0; j < reviews[i].reviews.length; j++) {
      if (reviews[i].reviews[j].id === req.body.reviewId) {
        if (reviews[i].reviews[j].upvotes.includes(req.body.user_id)) {
          reviews[i].reviews[j].upvotes.splice(j, 1);
          review_user = reviews[i]._id;
          actual_review_list = reviews[i].reviews;
          found = true;
          break;
        } else if (reviews[i].reviews[j].downvotes.includes(req.body.user_id)) {
          reviews[i].reviews[j].downvotes.splice(j, 1);
        }
        reviews[i].reviews[j].upvotes.push(req.body.user_id);
        review_user = reviews[i]._id;
        actual_review_list = reviews[i].reviews;
        found = true;
        break;
      }
      if (found) {
        break;
      }
    }
  }
  const resp = await User.findOneAndUpdate(
    { _id: review_user },
    { $set: { reviews: actual_review_list } }
  );
  response.status(200).send({ message: "review upvoted" });
});

reviewRoutes.route("/review/downvote/").post(async function (req, response) {
  let reviews = await User.find({ reviews: { $ne: [] } }).select("reviews");
  let review_user = "";
  let actual_review_list = [];
  let found = false;
  for (let i = 0; i < reviews.length; i++) {
    for (let j = 0; j < reviews[i].reviews.length; j++) {
      if (reviews[i].reviews[j].id === req.body.reviewId) {
        if (reviews[i].reviews[j].downvotes.includes(req.body.user_id)) {
          reviews[i].reviews[j].downvotes.splice(j, 1);
          review_user = reviews[i]._id;
          actual_review_list = reviews[i].reviews;
          found = true;
          break;
        } else if (reviews[i].reviews[j].upvotes.includes(req.body.user_id)) {
          reviews[i].reviews[j].upvotes.splice(j, 1);
        }

        reviews[i].reviews[j].downvotes.push(req.body.user_id);
        review_user = reviews[i]._id;
        actual_review_list = reviews[i].reviews;
        found = true;
        break;
      }
      if (found) {
        break;
      }
    }
  }
  const resp = await User.findOneAndUpdate(
    { _id: review_user },
    { $set: { reviews: actual_review_list } }
  );
  response.status(200).send({ message: "review upvoted" });
});

module.exports = reviewRoutes;
