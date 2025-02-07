const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT||5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//middleware are here 

app.use(cors());
app.use(express.json());

// the root structure is start here 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u05ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

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
    await client.connect();
   
  const addequipmentcollection = client.db('addequipDB').collection('addeqipment');
  const usercollection = client.db('addequipDB').collection('users');
   

   app.get('/addequipment',async(req,res)=>{
    const cursor = addequipmentcollection.find();
    const result = await cursor.toArray();
    res.send(result);
   })

    app.get('/addequipment/:id',async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await addequipmentcollection.findOne(query)
      res.send(result);
    })

   


   app.post('/addequipment',async(req,res)=>{
    const addnewquipment = req.body;
    console.log(addnewquipment);
    const result = await addequipmentcollection.insertOne(addnewquipment);
    res.send(result);
   })

   app.put('/addequipment/:id',async(req,res)=>{
    const id = req.params.id;
    const filter = {_id:new ObjectId(id)}
    const options ={upsert:true};
    const updatedequipment = req.body;
    const equipment = {
      $set:{
        coffeename:updatedequipment.coffeename,
        Suppliername:updatedequipment.Suppliername,
        tasteprofile:updatedequipment.tasteprofile,
        category:updatedequipment.category,
        Details:updatedequipment.Details,
        PhotoURL:updatedequipment.PhotoURL
      }
    }
    const result = await addequipmentcollection.updateOne(filter,equipment,options)
    res.send(result);
   })

  app.delete('/addequipment/:id',async(req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const result = await addequipmentcollection.deleteOne(query)
    res.send(result);
  })
   //  users releted apies here 
   app.post('/users',async(req,res)=>{
    const newuser = req.body;
    const result = await usercollection.insertOne(newuser);
    res.send(result);

   })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('The equipment server is running')
})
app.listen(port,(req,res)=>{
   console.log(`the online equipment server is running on port ${port}`); 
})
