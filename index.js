const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const connectDB = require('./config/db');

const jobRoutes = require('./routes/jobRoutes');

//middleware
app.use(express.json());
app.use(cors());

//password; 4JDBGzDJhTiinMlJ

connectDB();




//post a job
// app.post('/post-a-job', async(req,res) => {
//   const body = req.body;
//   body.createAt = new Date();
//   // console.log(body);
//   const result = await jobsCollection.insertOne(body);
//   if(result.insertedId) {
//     return res.status(200).send(result);
//   } else {
//     return res.status(404).send({
//       message: 'Cannot insert. Try again later!',
//       status: false
//     })
//   }
  
// })

//get all jobs
// app.get("/all-jobs", async(req, res) => {
//   const jobs = await jobsCollection.find({}).toArray();
//   res.send(jobs);
// })

//get single job using id
// app.get('/all-jobs/:id', async(req,res) => {
//   const id = req.params.id;
//   const job = await jobsCollection.findOne({
//     _id: new ObjectId(id)
//   })
//   res.send(job)
// })

//get jobs by email
// app.get("/myJobs/:email", async(req,res) => {
//   // console.log(req.params.email);
  
//   const jobs = await jobsCollection.find({postedBy: req.params.email}).toArray();
//   res.send(jobs);
// })

//delete-job
// app.delete("/job/:id", async(req, res) => {
//   const id = req.params.id;
//   const filter =  {_id: new ObjectId(id)}
//   const result = await jobsCollection.deleteOne(filter);
//   res.send(result);
// })

//update a job 
// app.patch("/update-job/:id", async(req, res) => {
//   const id = req.params.id;
//   const jobData = req.body;
//   const filter = { _id: new ObjectId(id)};
//   const options = { upsert: true };
//   const updateDoc = {
//     $set: {
//       ...jobData
//     },
//   };
//   const result = await jobsCollection.updateOne(filter, updateDoc, options);
//   res.send(result)

// })

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use('/api/jobs', jobRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})