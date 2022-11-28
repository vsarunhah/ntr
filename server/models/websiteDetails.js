const mongoose = require('mongoose');
const experienceSchema = require('./experience.js');
const educationSchema = require('./education.js');
const projectSchema = require('./project.js');
const linksSchema = require('./links.js');
const skillsSchema = require('./skills.js');
const websiteDetailsSchema = new mongoose.Schema({
    links: [linksSchema],
    skills: [skillsSchema],
    experiences: [experienceSchema],
    projects: [projectSchema],
    educations: [educationSchema],
});
