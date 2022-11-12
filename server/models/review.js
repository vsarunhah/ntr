const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    id: String,
    companyName: String,
    description: String,
    rating: Number,
    tags: [String],
    upvotes: [String],
    downvotes: [String]
});
