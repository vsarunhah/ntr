const mongoose = require('mongoose');

const personalWebsiteSchema = new mongoose.Schema({
   showProfile: Boolean,
   showEducation: Boolean,
   showExperiences: Boolean,
   showProjects: Boolean,
   showSkills: Boolean,
   showLinks: Boolean,
   theme: String,
});