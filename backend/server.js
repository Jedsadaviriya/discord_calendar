const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
//middleware
app.use(cors());
app.use(express.json());
//db connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err))
//test route
app.get('/api/test', (_req,res) =>{
  res.json({message: 'backend is working you dumb fah'})
})
//server start
const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=> {
  console.log(`server running on http://localhost:${PORT}`)
})