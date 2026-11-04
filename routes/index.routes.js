const router = require("express").Router()
const User = require('../models/User')
const Channel = require('../models/Channel')
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


router.get('/:channelID/discussions',(req,res)=>{
    res.render('discussions.ejs')
})

router.get('/:channelID/:discussionID/messages',(req,res)=>{
    res.render('messages.ejs')
})

/* router.get('/discussions',(req,res)=>{
    res.render('discussions.ejs')
}) */

module.exports = router;