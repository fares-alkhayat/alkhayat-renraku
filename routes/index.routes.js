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
    const channel = await Channel.find({channelID: req.params.channelID })
    const allSubchannels = await Subchannel.find({channelRef: channel.channelID});
    console.log(allSubchannels);
    res.render('subchannels.ejs',{Subchannel: allSubchannels, channelId: req.params.channelID})})

router.get('/channels/subchannel=:subchannelID',async (req,res)=>{
    const subchannel = await Subchannel.find({subchannelRef: req.params.subchannelID});
    const allDiscussions = await Discussion.find({subchannelRef: subchannel.subchannelID});
    console.log(allDiscussions);
    res.render('discussions.ejs',{Discussion: allDiscussions, subchannelId: req.params.subchannelID})})

router.get('/:channels/discussion=:discussionID',async (req,res)=>{
    const discussions = await Discussion.find({discussionRef: req.params.discussionID});
    const allMessages = await Message.find({discussionRef: discussions.discussionID});
    console.log(allMessages);
    res.render('messages.ejs',{Message: allMessages, discussionId: req.params.discussionID})})

router.get('/create-subchannel',(req,res)=>{
    res.render('create-subchannel.ejs')})

router.get('/create-discussion',(req,res)=>{
    res.render('create-discussion.ejs')})

router.get('/create-message',(req,res)=>{
    res.render('create-message.ejs')})
// router.get('/channels/:channelID/create-subchannel',(req,res)=>{
//    res.render('create-subchannel.ejs')})

router.post('/channels/create-subchannel', async (req,res)=>{
    const createSubchannel = await Subchannel.create({
    subchannelName: req.body.subchannelName,
    subchannelAbout: req.body.subchannelAbout,
    subchannelRules: req.body.subchannelRules,
    channelRef: req.body.channelRef,
})
    res.redirect('/channels/:channelID/')
})

router.post('/channels/create-discussion', async (req,res)=>{
    const createDiscussion = await Discussion.create({
    discussionName: req.body.discussionName,
    discussionAbout: req.body.discussionAbout,
    discussionRules: req.body.discussionRules,
    subchannelRef: req.body.subchannelRef,
    genre: req.body.genre,
    tags: req.body.tags,
})
    res.redirect('/channels/subchannel=:channelID/')
})

router.post('/channels/create-message', async (req,res)=>{
    const createMessage = await Message.create({
    messageTitle: req.body.messageTitle,
    messageBody: req.body.messageBody,
    discussionRef: req.body.discussionRef
})
    res.redirect('/channels/discussion=:discussionID/')
})

router.get('/all-discussions',(req,res)=>{
    res.render('all-discussions.ejs')
})

module.exports = router;