require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const employeeRoutes = require('./Routes/Routes')
const cors = require('cors')
const multer= require('multer')
const path = require('path')
const axios = require('axios')
const app = express()
const cron=require('node-cron')


const DBurl = process.env.MongoURL;
const port = process.env.PORT || 5000;

//Middleware
app.use(cors({
    origin: "*"
  }));
app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/uploads", express.static(path.join(__dirname, "Utils", "uploads")));
  
  mongoose.connect(DBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
  
  // Routes
  app.use(employeeRoutes);
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.get("/",async(req,res)=>{
    res.send("The server is LIVE")
  })
  
  cron.schedule('*/14 * * * *', () => {
    console.log('Running cron job to avoid cold start');
    axios.get('https://usermanagerserver.onrender.com')
      .then(() => {
        console.log('Server pinged successfully');
      })
      .catch(err => {
        console.error('Error pinging server:', err);
      });
  });