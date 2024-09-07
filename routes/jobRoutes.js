const express = require('express');
const router = express.Router();
const { postJob, getJobById, getAllJobs, getJobsByEmail, deleteJob } = require('../controller/jobController');

router.post('/post-a-job', postJob);

router.get('/all-jobs/:id', getJobById);

router.get('/all-jobs', getAllJobs);

router.get('/my-jobs/:email', getJobsByEmail);

router.delete('/delete-job/:id', deleteJob);

module.exports = router;