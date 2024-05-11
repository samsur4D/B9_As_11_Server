const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000 ;


//middleware
app.use(cors());
app.use(express.json());

console.log(process.env.DB_PASS);
console.log(process.env.DB_USER);
// ---------------------------------------------



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wkehc2o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();---------------commentt must
// ---------------------------------------------------------------------------------------------------------------------------
// add collection
const jobCollection = client.db('jobDB').collection('job')


// input form and get the data into the cmd file 
app.post('/job' , async(req,res)=>{
    const newJob = req.body;
    console.log(newJob);
    const result = await jobCollection.insertOne(newJob);
    res.send(result);
})
// ---------------------------------------------------------------------------------------------------------------------------
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); -----------comment mmust
  }
}
run().catch(console.dir);

// ---------------------------------------------




app.get('/' , (req ,res)=>{
    res.send('B9 Assignment Server is Running')
})


app.listen(port , ()=>{
    console.log(`B9 Assignment Server is running on port , ${port}`)
})
