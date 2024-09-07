const mongoose = require('mongoose');
require('dotenv').config();

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.coxxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function connectDB() {
//     try {
//       await client.connect();
//     console.log("Connected to MongoDB!");
//     return client.db("mernJobPortal");
//     }  catch(err){
//       console.error(err);
//       process.exit(1);
//     }
// }

const connectDB = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.coxxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB with Mongoose");
    } catch(err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
        
    }
}

module.exports = connectDB;