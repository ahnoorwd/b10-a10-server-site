const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT||5000;

//middleware are here 

app.use(cors());
app.use(express.json());

// the root structure is start here 


app.get('/',(req,res)=>{
    res.send('The equipment server is running')
})
app.listen(port,(req,res)=>{
   console.log(`the online equipment server is running on port ${port}`); 
})
