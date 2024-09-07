const Job = require('../models/Job');

const postJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        const result = await job.save();
        res.status(200).send(result);
    } catch(err) {
        res.status(500).send({ message: 'Failed', error: err});
    }
}

// Controller to get a job by ID
const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.status(200).send(job);
        } else {
            res.status(404).send({ message: 'Job not found' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Failed to retrieve job', error: err });
    }
};

// Function to get all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find(); 
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs' });
    }
};

//get jobs by email
const getJobsByEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const jobs = await Job.find({ postedBy: email });
        if(!jobs.length) {
            return res.status(404).send({ message: 'No jobs found for this email'});
        }
        res.status(200).send(jobs);
    } catch(error) {
        res.status(500).send({ message: 'Failed to fetch jobs', error});
    }
}

//delete a job
const deleteJob = async(req,res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new Object(id)};
        const result = await Job.deleteOne(filter);

        if(result.deletedCount === 0) {
            return res.status(404).send({ message: 'Job not found'});
        }
        res.status(200).send({ acknowledged: true, message: 'Job deleted successfully', result});
    } catch (error) {
        console.error('Error deleting job', error);
        res.status(500).send({ message: 'Failed to dete job', error});
        
    }
};


module.exports = {
    postJob,
    getJobById,
    getAllJobs,
    getJobsByEmail,
    deleteJob
}