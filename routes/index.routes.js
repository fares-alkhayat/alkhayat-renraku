const router = require("express").Router()
const User = require('../models/User')
const Channel = require('../models/Channel')
const Subchannel = require('../models/Subchannel')
const Discussion = require('../models/Discussion')
const Message = require('../models/Message')


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get('/my-profile', async (req,res)=>{
    const user = await User.findById(req.session.user._id)
    res.render('profile.ejs', {user: user})
})

router.get('/channels', async (req,res)=>{
    const allChannels = await Channel.find();
    console.log(allChannels);
    res.render('channels.ejs',{Channel: allChannels})})


router.get('/channels/:channelID',async (req,res)=>{
    const allSubchannels = await Subchannel.find();
    console.log(allSubchannels);
    res.render('subchannels.ejs',{Subchannel: allSubchannels})})

router.get('/:channelID/:subchannelID',async (req,res)=>{
    const allDiscussions = await Discussion.find();
    console.log(allDiscussions);
    res.render('discussions.ejs',{Discussion: allDiscussions})})

router.get('/:channelID/:subchannelID/:discussionID/messages',async (req,res)=>{
    const allMessages = await Message.find();
    console.log(allMessages);
    res.render('messages.ejs',{Message: allMessages})})

router.get('/create-subchannel',(req,res)=>{
    res.render('create-subchannel.ejs')})

router.get('/all-discussions',(req,res)=>{
    res.render('all-discussions.ejs')
})

module.exports = router;