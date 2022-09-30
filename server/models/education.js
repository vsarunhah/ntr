const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    university: String,
    degreeType: String,
    majors: [String],
    minors: [String],
    startDate: Date,
    endDate: Date,
    gpa: Number,
    otherInfo: {
        type: Map,
        of: String,
        to: String,
      }
});