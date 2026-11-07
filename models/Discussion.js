const mongoose = require("mongoose");
const uuidv7 = require("uuidv7")

const discussionSchema = new mongoose.Schema({
      discussionID: {
        type: String,
        required: true,
        default: () => uuidv7.uuidv7(),
        index: { unique: true }
      },
    discussionName: {
        type: String,
        required: true,
    },
    discussionOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    discussionAbout: {
        type: String
    },
    discussionRules: {
        type: String
    },
    messageCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],
    followCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    upvoteCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    downvoteCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    voteCount: {
        type: Number
    },
    userCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    tags: {
        type: String
    },
    genre: {
        type: String
    },
    subchannelRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subchannel"
    },
},{timestamps:true})

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;