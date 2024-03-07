import express from "express";
import  mongoose  from "mongoose";
import dotenv from 'dotenv';
//const itemRoutes = require('./routes/itemRoutes');
 //import itemRoutes from './routes/itemRoutes.js'
import itemRoute from './routes/itemRoutes.js';
import {EventEmitter} from 'events';

dotenv.config()

//possible EventEmitter memory leak detected
EventEmitter.defaultMaxListeners = 100;

const app = express();
const PORT = 3009;

app.use(express.json());



// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
   
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
  

app.get('/', function(req, res) {
    // console.log("just fun")
    res.send("hello world!00")
});
 ///app.use()

// let suppose to handle 

 

 app.use('/items',  itemRoute);
 app.use((req, res) => {
  res.status(400).json({ status: false, message: " bad request bro Route not exist" });
});

app.listen(PORT,()=>{
    console.log(`SERVER IS CONNECTED ${PORT}`)
})
