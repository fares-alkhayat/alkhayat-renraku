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

router.get('/news',(req,res)=>{
    res.render('news.ejs')
})

router.get('/my-profile', isSignedIn, async (req,res)=>{
    const user = await User.findById(req.session.user._id)
    res.render('profile.ejs', {user: user})
})

router.get('/channels', async (req,res)=>{
    const allChannels = await Channel.find();
    console.log(allChannels);
    res.render('channels.ejs',{Channel: allChannels})})

router.get('/all-discussions', async (req,res)=>{
    const allDiscussions = await Discussion.find();
    const subchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID});
    console.log(allDiscussions);
    res.render('all-discussions.ejs',{Discussion: allDiscussions, subchannelId: req.params.subchannelID})})

router.get('/channels/:channelID',async (req,res)=>{
  console.log('in channels route')
    const channel = await Channel.findOne({channelID: req.params.channelID })
    const allSubchannels = await Subchannel.find({channelRef: channel._id});
    console.log(allSubchannels);
    res.render('subchannels.ejs',{Subchannel: allSubchannels, channelId: req.params.channelID})})

router.get('/channels/subchannel/:subchannelID',async (req,res)=>{
  console.log('in subcannel route')
    const subchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID});
    const allDiscussions = await Discussion.find({subchannelRef: subchannel._id});

    console.log(allDiscussions);
    res.render('discussions.ejs',{Discussion: allDiscussions, subchannelId: req.params.subchannelID})})

router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/',async (req,res)=>{
    const discussions = await Discussion.findOne({discussionID: req.params.discussionID});
    const allMessages = await Message.find({discussionRef: discussions._id});
    console.log(allMessages);
    res.render('messages.ejs',{Message: allMessages, discussionID: req.params.discussionID, subchannelID: req.params.subchannelID})})

router.get('/create-subchannel/:channelId', isSignedIn, (req,res)=>{
    res.render('create-subchannel.ejs', {channelId: req.params.channelId})})

router.get('/channels/subchannel/:subchannelID/create-discussion', isSignedIn, (req,res)=>{
    res.render('create-discussion.ejs', {subchannelId: req.params.subchannelID})})

router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/create-message', isSignedIn, (req,res)=>{
    res.render('create-message.ejs', {subchannelId: req.params.subchannelID, discussionId: req.params.discussionID})})

// router.get('/channels/:channelID/create-subchannel',(req,res)=>{
//    res.render('create-subchannel.ejs')})

router.post('/channels/:channelId/create-subchannel', isSignedIn, async (req,res)=>{
    const createSubchannel = await Subchannel.create({
    subchannelName: req.body.subchannelName,
    subchannelAbout: req.body.subchannelAbout,
    subchannelRules: req.body.subchannelRules,
    subchannelOwner: req.session.user._id,
    channelRef: req.body.channelRef,
})
    res.redirect('/channels/' + req.params.channelId)
})

router.post('/channels/subchannel/:subchannelID/create-discussion', isSignedIn, async (req,res)=>{
  const subchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID})
    const createDiscussion = await Discussion.create({
    discussionName: req.body.discussionName,
    discussionAbout: req.body.discussionAbout,
    discussionRules: req.body.discussionRules,
    discussionOwner: req.session.user._id,
    genre: req.body.genre,
    tags: req.body.tags,
    subchannelRef: subchannel._id
})
    res.redirect('/channels/subchannel/' + subchannel.subchannelID)
})

router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/create-message', isSignedIn, async (req,res)=>{
    const discussion = await Discussion.findOne({discussionID: req.params.discussionID})
    const createMessage = await Message.create({
    messageTitle: req.body.messageTitle,
    messageBody: req.body.messageBody,
    messageOwner: req.session.user._id,
    discussionRef: discussion._id
})

    res.redirect('/channels/subchannel/:subchannelID/discussion/' + discussion.discussionID)
})

router.delete('/channels/subchannel/:subchannelID', isSignedIn, async (req,res)=>{
    const foundSubchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID})
        if(!foundSubchannel.subchannelOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Subchannel.findOneAndDelete({subchannelID: req.params.subchannelID})
    res.redirect('/channels/')
})

router.delete('/channels/subchannel/:subchannelID/discussion/:discussionID', isSignedIn, async (req,res)=>{
    const foundDiscussion = await Discussion.findOne({discussionID: req.params.discussionID})
        if(!foundDiscussion.discussionOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Discussion.findOneAndDelete({discussionID: req.params.discussionID})
    res.redirect('/channels/')
})
router.delete('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID', isSignedIn, async (req,res)=>{
    const foundMessage = await Message.findOne({messageID: req.params.messageID})
        if(!foundMessage.messageOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Message.findOneAndDelete({messageID: req.params.messageID})
    res.redirect('/channels/')
})

router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/edit', isSignedIn, async (req,res)=>{
    const foundDiscussion = await Discussion.find({discussionID: req.params.discussionID})
        if(!foundDiscussion.discussionOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Discussion.findOneAndDelete({discussionID: req.params.discussionID})
    res.redirect('/channels/subchannel/:subchannelID/')
})

router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID/edit', isSignedIn, async (req,res)=>{
        const foundMessage = await Message.findOne({Message: req.params.messageID})
        if(!foundMessage.messageOwner.equals(req.session.user._id)){
        return res.send('Action not allowed.')
    }
    await Message.findOneAndDelete({messageID: req.params.messageID})
    res.redirect('/channels/subchannel/:subchannelID/discussion/:discussionID')
})

router.get('/channels/subchannel/:subchannelID/edit', isSignedIn, async (req,res)=>{
    const foundSubchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID}).populate('subchannelOwner')
    console.log(foundSubchannel)
    if(foundSubchannel.subchannelOwner._id != (req.session.user._id)){
      return res.send('Action not allowed.')
    }
    res.render('edit-subchannel.ejs',{Subchannel: foundSubchannel})
})

router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/edit', isSignedIn, async (req,res)=>{  
  const foundSubchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID}).populate('subchannelOwner')
  const foundDiscussion = await Discussion.findOne({discussionID: req.params.discussionID}).populate('discussionOwner')
        console.log(foundDiscussion)
    if(foundDiscussion.discussionOwner._id != (req.session.user._id)){
        return res.send('Action not allowed.')
    }
    res.render('edit-discussion.ejs',{Discussion: foundDiscussion})
})

router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID/edit', isSignedIn, async (req,res)=>{
      const foundDiscussion = await Discussion.findOne({discussionID: req.params.discussionID}).populate('discussionOwner')
      const foundMessage = await Message.findOne({messageID: req.params.discussionID}).populate('messageOwner')
        console.log(foundMessage)
    if(foundDiscussion.discussionOwner._id != (req.session.user._id)){
        return res.send('Action not allowed.')
    }
    res.render('edit-message.ejs',{Message: foundMessage})
})

router.put('/channels/subchannel/:subchannelID', isSignedIn, async (req,res)=>{
    const foundSubchannel = await Subchannel.findOne({subchannelID: req.params.subchannelID})
    const channelInfo = await Channel.findById( foundSubchannel.channelRef)
    if(foundSubchannel.subchannelOwner._id != (req.session.user._id)){
    return res.send('Action not allowed.')
    }
    const updatedSubchannel = await Subchannel.findOneAndUpdate(foundSubchannel._id, req.body)

    res.redirect('/channels/' + channelInfo.channelID)
})

router.put('/channels/subchannel/:subchannelID/discussion/:discussionID', isSignedIn, async (req,res)=>{
  const foundSubchannel = await Subchannel.find({subchannelID: req.params.subchannelID})
  const foundDiscussion = await Discussion.find({discussionID: req.params.discussionID})
        if(foundSubchannel.discussionOwner._id != (req.session.user._id)){
        return res.send('Action not allowed.')
    }
    const updatedDiscussion = await Discussion.findOneAndUpdate({discussionID: req.params.discussionID})

    res.redirect('/channels/subchannel/:subchannelID/', {Discussion: updatedDiscussion})
})

router.put('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID', isSignedIn, async (req,res)=>{
    const foundMessage = await Message.find({messageID: req.params.messageID})
        if(!foundMessage.messageOwner._id != (req.session.user._id)){
        return res.send('Action not allowed.')
    }
    const updatedMessage = await Message.findOneAndUpdate({messageID: req.params.messageID})

    res.redirect('/channels/subchannel/:subchannelID/discussion/:discussionID', {Message: updatedMessage})
})


router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/upvote/', async (req, res) => {
  try {
    console.log('UPVOTE')
      const discussion = await Discussion.findOne({discussionID: req.params.discussionID})
      const subchannel = await Subchannel.findOne({_id: discussion.subchannelRef})

      if(discussion.upvoteCount.some((oneId)=> oneId == req.session.user._id)){
        return    res.redirect(`/channels/subchannel/${subchannel.subchannelID}/`);

      }
    await Discussion.findByIdAndUpdate(discussion._id, {
      $push: { upvoteCount: req.session.user._id },
    });
    res.redirect(`/channels/subchannel/${subchannel.subchannelID}/`);
  } catch (error) {
    console.log(error);
 }
});

router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/upvoted-by/:userID', async (req, res) => {
  try {
    const populatedUpvotes = await Discussion.findOne(req.params.discussionID).populate('owner');

    const userHasUpvoted = populatedUpvotes.upvotedByUsers.some((user) =>
      user.equals(req.session.userID)
    );

    res.render('/channels/subchannel/:subchannelID/discussion/:discussionID', {
      discussion: populatedUpvotes,
      userHasUpvoted: userHasUpvoted,
    });

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/downvote/', async (req, res) => {
  try {
    console.log('DOWNVOTE')
      const discussion = await Discussion.findOne({discussionID: req.params.discussionID})

    await Discussion.findByIdAndUpdate(discussion._id, {
      $push: { downvoteCount: req.session.user._id },
    });
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
 }
});


router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/downvoted-by/:userID', async (req, res) => {
  try {
    const populatedDownvotes = await Discussion.findOne(req.params.discussionID).populate('owner');

    const userHasDownvoted = populatedDownvotes.downvotedByUsers.some((user) =>
      user.equals(req.session.userID)
    );

    res.render('/channels/subchannel/:subchannelID/discussion/:discussionID', {
      discussion: populatedDownvotes,
      userHasDownvoted: userHasDownvoted,
    });

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID/upvote/', async (req, res) => {
  try {
    console.log('UPVOTE')
      const message = await Message.findOne({messageID: req.params.messageID})

    await Message.findByIdAndUpdate(message._id, {
      $push: { upvoteCount: req.session.user._id },
    });
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
 }
});

router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID/upvoted-by/:userID', async (req, res) => {
  try {
    const populatedUpvotes = await Message.findOne(req.params.discussionID).populate('owner');

    const userHasUpvoted = populatedUpvotes.upvotedByUsers.some((user) =>
      user.equals(req.session.userID)
    );

    res.render('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID', {
      message: populatedUpvotes,
      userHasUpvoted: userHasUpvoted,
    });

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID/downvote/', async (req, res) => {
  try {
    console.log('DOWNVOTE')
      const message = await Message.findOne({messageID: req.params.messageID})

    await Message.findByIdAndUpdate(message._id, {
      $push: { downvoteCount: req.session.user._id },
    });
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
 }
});


router.get('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID//downvoted-by/:userID', async (req, res) => {
  try {
    const populatedDownvotes = await Message.findOne(req.params.messageID).populate('owner');

    const userHasDownvoted = populatedDownvotes.downvotedByUsers.some((user) =>
      user.equals(req.session.userID)
    );

    res.render('/channels/subchannel/:subchannelID/discussion/:discussionID/message/:messageID/', {
      message: populatedDownvotes,
      userHasDownvoted: userHasDownvoted,
    });

  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/my-contributions', (req,res)=>{
  res.render('my-contributions.ejs')
})
module.exports = router;