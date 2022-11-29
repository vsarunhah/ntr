const mongoose = require('mongoose');

const interview_tipsSchema = new mongoose.Schema({
    role: String,
    company: String,
    tip: String,
    user: String,
});
