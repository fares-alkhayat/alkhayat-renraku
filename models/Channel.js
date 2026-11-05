const mongoose = require("mongoose");
const uuidv7 = require("uuidv7")

const channelSchema = new mongoose.Schema({
      channelID: {
        type: String,
        required: true,
        default: () => uuidv7.uuidv7(),
        index: { unique: true }
      },
    channelName: {
        type: String,
        required: true,
    },
    messageCount: {
        type: Number
    },
    followCount: {
        type: Number
    },
    discussionCount: {
        type: Number
    },
    userCount: {
        type: Number
    },
    approvedAt: {
        type: Date,
        required: true
    }
},{timestamps:true})

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;