const mongoose = require("mongoose");
const uuidv7 = require("uuidv7")

const subchannelSchema = new mongoose.Schema({
      subchannelID: {
        type: String,
        required: true,
        default: () => uuidv7.uuidv7(),
        index: { unique: true }
      },
    subchannelName: {
        type: String,
        required: true,
    },
    subchannelOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subchannelAbout: {
        type: String
    },
    subchannelRules: {
        type: String
    },
    messageCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }],
    followCount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    discussionCount: {
        type: Number
    },
    userCount: {
        type: Number
    },
    channelRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel"
    },
},{timestamps:true})

const Subchannel = mongoose.model("Subchannel", subchannelSchema);

module.exports = Subchannel;