const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    minPrice: {
        type: String,
        required: true
    },
    maxPrice: {
        type: String,
        required: true
    },
    salaryType: {
        type: String,
        required: true,
        enum: ['Yearly', 'Monthly', 'Hourly']
    },
    jobLocation: {
        type: String,
        required: true
    },
    postingDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Internship', 'Any experience', 'Work remotely','NoExperience']
    },
    companyLogo: {
        type: String
    },
    employmentType: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Temporary']
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: String,
        required: true
    },
    skills: {
        type: [Object]
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

const Job = mongoose.model('jobs', jobSchema);

module.exports = Job;