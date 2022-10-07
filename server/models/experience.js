const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    title: String,
    companyName: String,
    startDate: Date,
    endDate: Date,
    currentJob: Boolean,
    description: String,
    location: String,
});
