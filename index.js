const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

//middleware
app.use(express.json());
app.use(cors());

//password; 4JDBGzDJhTiinMlJ


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.coxxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let jobsCollection;

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create DB 
    const db = client.db("mernJobPortal");
    jobsCollection = db.collection("jobs");
    console.log("Connected to MongoDB!");

  }  catch(err){
    console.error(err);
    
  }
  }
run()

//post a job
app.post('/post-a-job', async(req,res) => {
  const body = req.body;
  body.createAt = new Date();
  // console.log(body);
  const result = await jobsCollection.insertOne(body);
  if(result.insertedId) {
    return res.status(200).send(result);
  } else {
    return res.status(404).send({
      message: 'Cannot insert. Try again later!',
      status: false
    })
  }
  
})

//get all jobs
app.get("/all-jobs", async(req, res) => {
  const jobs = await jobsCollection.find().toArray();
  res.send(jobs);
})

//get jobs by email
app.get("/myJobs/:email", async(req,res) => {
  // console.log(req.params.email);
  
  const jobs = await jobsCollection.find({postedBy: req.params.email}).toArray();
  res.send(jobs);
})

//delete-job
app.delete("/job/:id", async(req, res) => {
  const id = req.params.id;
  const filter =  {_id: new ObjectId(id)}
  const result = await jobsCollection.deleteOne(filter);
  res.send(result);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})