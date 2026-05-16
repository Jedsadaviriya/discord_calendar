const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
//register
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
//login
app.post('/api/login', async (req, res)=> {
  try{
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({error: 'Invalid email or password giggity'});
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(401).json({error: 'Invalid email or password giggity'})
    const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '24h'})
  res.json({token, user});

  }catch (err){
    res.status(500).json({error: err.message})
  }
})
//check auth
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({error: 'No token'});
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({error: 'Invalid token'});
  }
};
app.get('/api/profile', checkAuth, (req, res)=> {
  res.json({message: 'This is your profile', userId: req.user.id})
})
app.post('/api/logout', checkAuth, (req,res) => {
  res.json({message: 'Logged out successfully'});
})