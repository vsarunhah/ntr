const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    roleName: String,
    companyName: String,
    applicationDate: Date,
    applicationStatus: {type: String,
        enum: ['Applied', 'Interviewing', 'Offered', 'Rejected']
    },
});
