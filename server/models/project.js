const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    startDate: Date,
    endDate: Date,
    description: String,
});
