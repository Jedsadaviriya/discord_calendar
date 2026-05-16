const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
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
  res.json({message: 'backend is working you dumb fahff'})
})
//server start
const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=> {
  console.log(`server running on http://localhost:${PORT}`)
})
// user schema
const userSchema = new mongoose.Schema({
  email: {type: String, unique: true,require: true},
  password: {type: String, require:true},
  username: {type: String, require:true}
})
const User = mongoose.model('User', userSchema)

app.post('/api/register', async (req, res) => {
  try{
    const hashedPassword=await bcrypt.hash(req.body.password, 10);
    const user=new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username
    });
    await user.save();
    res.status(201).json({message: 'Account created', user});
  } catch (err) {
    res.status(400).json({error: err.message});
  }
})