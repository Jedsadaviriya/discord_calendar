const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
const Community =require('./models/Community')
const Event = require('./models/Event')
const WorkSchedule =require('./models/WorkSchedule')
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
  res.json({message: 'backend is working you dumb fahff fjaoisdh gw4 ararara'})
})
//server start
const PORT = process.env.PORT ||5000;
app.listen(PORT, ()=> {
  console.log(`server running on http://localhost:${PORT}`)
})
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
app.get('/api/users', checkAuth, async(req,res)=>{
  try{
    const users = await User.find({}, 'email username');
    res.json(users);
  }catch (err){
    res.status(400).json({error: err.message});
  }
})
// event post
app.post('/api/events', checkAuth, async(req,res)=>{
  try{
    const event = new Event({
      title: req.body.title,
      startTime: new Date(req.body.startTime),
      endTime: new Date(req.body.endTime),
      type: req.body.type,
      createdBy: req.user.id
    });
    await event.save();
    res.status(201).json(event);
  }catch(err){
    res.status(400).json({error: err.message});
  }
});
// get events info
app.get('/api/events', checkAuth, async(req, res)=>{
  try{
    const events = await Event.find({createdBy: req.user.id});
    res.json(events);
  }catch(err){
    res.status(400).json({error: err.message})
  }
})
//create communities
app.post('/api/communities', checkAuth, async(req,res)=>{
  try {
    const community = new Community({
      name: req.body.name,
      members: [req.user.id],
      createdBy: req.user.id
    });
    await community.save();
    res.status(201).json(community);
  } catch (err){
    res.status(400).json({error: err.message})
  }
});
// fetch all communities
app.get('/api/communities', checkAuth, async(req,res)=>{
  try{
    const communities = await Community.find({members: req.user.id});
    res.json(communities);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
// invite other people
app.post('/api/communities/:id/invite', checkAuth, async(req,res)=> {
  try{
    const community = await Community.findById(req.params.id);
    if(!community) return res.status(404).json({error: 'Community not found'});
    const user = await User.findOne({email: req.body.email});
    if(!user)return res.status(404).json({error: 'User not found'})
    if (!community.members.includes(user._id.toString())){
      community.members.push(user._id);
      await community.save();
    }
    res.json(community);
  }catch(err){
    res.status(400).json({error: err.message})
  }
})
// get community by id
app.get('/api/communities/:id', checkAuth, async(req,res)=>{
  try {
    const community = await Community.findById(req.params.id).populate('members');
    res.json(community);
  }catch (err){
    res.status(400).json({error: err.message});
  }
})
// get community event
app.get('/api/communities/:id/events', checkAuth, async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({error: 'Community not found'});
    
    const events = await Event.find({createdBy: {$in: community.members}});
    res.json(events);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});
// create work schedule
app.post('/api/schedule', checkAuth, async(req,res)=>{
  try {
    const schedule = new WorkSchedule({
      userId: req.user.id,
      daysOfWeek: req.body.daysOfWeek,
      startTime: req.body.startTime,
      endTime:req.body.endTime,
      timezone: req.body.timezone
    });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err){
    res.status(400).json({error: err.message})
  }
})
// get work schedule
app.get('/api/schedule', checkAuth, async(req,res)=>{
  try{
    const schedule = await WorkSchedule.findOne({userId: req.user.id});
    res.json(schedule);
  } catch (err){
    res.status(400).json({error: err.message})
  }
})