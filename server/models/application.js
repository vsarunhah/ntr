const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    id: String,
    roleName: String,
    companyName: String,
    applicationDate: Date,
    applicationStatus: {type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected']
    },
});
