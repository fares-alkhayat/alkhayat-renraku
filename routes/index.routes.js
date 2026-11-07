const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const User = require('../models/User')
const Channel = require('../models/Channel')
const Subchannel = require('../models/Subchannel')
const Discussion = require('../models/Discussion')
const Message = require('../models/Message')


router.get('/',(req,res)=>{
    res.render('homepage.ejs')
})

router.get('/my-profile', isSignedIn, async (req,res)=>{
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

router.get('/channels/subchannel=:subchannelID/discussion=:discussionID',async (req,res)=>{
    const discussions = await Discussion.find({discussionRef: req.params.discussionID});
    const allMessages = await Message.find({discussionRef: discussions.discussionID});
    console.log(allMessages);
    res.render('messages.ejs',{Message: allMessages, discussionId: req.params.discussionID})})

router.get('/create-subchannel', isSignedIn, (req,res)=>{
    res.render('create-subchannel.ejs')})

router.get('/channels/subchannel=:subchannelID/create-discussion', isSignedIn, (req,res)=>{
    res.render('create-discussion.ejs')})

router.get('/channels/subchannel=:subchannelID/discussion=:discussionID/create-message', isSignedIn, (req,res)=>{
    res.render('create-message.ejs')})
// router.get('/channels/:channelID/create-subchannel',(req,res)=>{
//    res.render('create-subchannel.ejs')})

router.post('/channels/create-subchannel', isSignedIn, async (req,res)=>{
    const createSubchannel = await Subchannel.create({
    subchannelName: req.body.subchannelName,
    subchannelAbout: req.body.subchannelAbout,
    subchannelRules: req.body.subchannelRules,
    channelRef: req.body.channelRef,
})
    res.redirect('/channels/:channelID/')
})

router.post('/channels/subchannel=:subchannelID/create-discussion', isSignedIn, async (req,res)=>{
    const createDiscussion = await Discussion.create({
    discussionName: req.body.discussionName,
    discussionAbout: req.body.discussionAbout,
    discussionRules: req.body.discussionRules,
    subchannelRef: req.body.subchannelRef,
    genre: req.body.genre,
    tags: req.body.tags,
})
    res.redirect('/channels/subchannel=:subchannelID/')
})

router.post('/channels/create-message', isSignedIn, async (req,res)=>{
    const createMessage = await Message.create({
    messageTitle: req.body.messageTitle,
    messageBody: req.body.messageBody,
    discussionRef: req.body.discussionRef
})
    res.redirect('/channels/subchannel=:subchannelID/discussion=:discussionID/')
})

router.post('/channels/subchannel=:subchannelID/edit', isSignedIn, async (req,res)=>{
    const foundSubchannel = await Subchannel.find({subchannelID: req.params.subchannelID})
        if(!foundSubchannel.subchannelOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Subchannel.findOneAndDelete({subchannelID: req.params.subchannelID})
    res.redirect('/channels/:channelID/')
})

router.post('/channels/subchannel=:subchannelID/discussion=:discussionID/edit', isSignedIn, async (req,res)=>{
    const foundDiscussion = await Discussion.find({discussionID: req.params.discussionID})
        if(!foundDiscussion.discussionOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Discussion.findOneAndDelete({discussionID: req.params.discussionID})
    res.redirect('/channels/subchannel=:subchannelID/')
})

router.post('/channels/subchannel=:subchannelID/discussion=:discussionID/message=:messageID/edit', isSignedIn, async (req,res)=>{
        const foundMessage = await Message.find({Message: req.params.messageID})
        if(!foundMessage.messageOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Message.findOneAndDelete({messageID: req.params.messageID})
    res.redirect('/channels/subchannel=:subchannelID/discussion=:discussionID')
})

router.get('/channels/subchannel=:subchannelID/edit', isSignedIn, async (req,res)=>{
    const foundSubchannel = await Subchannel.find({subchannelID: req.params.subchannelID})
    if(!foundSubchannel.subchannelOwner.equals(req.session.user._id)){
    return res.send('Action not allowed.')
    }
    res.render('edit-subchannel.ejs',{Subchannel: foundSubchannel})
})

router.get('/channels/subchannel=:subchannelID/discussion=:discussionID/edit', isSignedIn, async (req,res)=>{
    const foundDiscussion = await Discussion.find({discussionID: req.params.discussionID})
        if(!foundDiscussion.discussionOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    res.render('edit-discussion.ejs',{Discussion: foundDiscussion})
})

router.get('/channels/subchannel=:subchannelID/discussion=:discussionID/message=:messageID/edit', isSignedIn, async (req,res)=>{
    const foundMessage = await Message.find({messageID: req.params.messageID})
        if(!foundMessage.messageOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    res.render('edit-message.ejs',{Message: foundMessage})
})

router.post('/channels/subchannel=:subchannelID', isSignedIn, async (req,res)=>{
    const foundSubchannel = await Subchannel.find({subchannelID: req.params.subchannelID})
    if(!foundSubchannel.subchannelOwner.equals(req.session.user._id)){
    return res.send('Action not allowed.')
    }
    const updatedSubchannel = await Subchannel.findOneAndUpdate({subchannelID: req.params.subchannelID})

    res.redirect('/channels/:channelID/',{Subchannel: updatedSubchannel})
})

router.post('/channels/subchannel=:subchannelID/discussion=:discussionID', isSignedIn, async (req,res)=>{
    const foundDiscussion = await Discussion.find({discussionID: req.params.discussionID})
        if(!foundDiscussion.discussionOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    const updatedDiscussion = await Discussion.findOneAndUpdate({discussionID: req.params.discussionID})

    res.redirect('/channels/subchannel=:subchannelID/', {Discussion: updatedDiscussion})
})

router.post('/channels/subchannel=:subchannelID/discussion=:discussionID/message=:messageID', isSignedIn, async (req,res)=>{
    const foundMessage = await Message.find({messageID: req.params.messageID})
        if(!foundMessage.messageOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    const updatedMessage = await Message.findOneAndUpdate({messageID: req.params.messageID})

    res.redirect('/channels/subchannel=:subchannelID/discussion=:discussionID', {Message: updatedMessage})
})

router.get('/all-discussions',(req,res)=>{
    res.render('all-discussions.ejs')
})

module.exports = router;