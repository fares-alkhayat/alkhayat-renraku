const mongoose = require("mongoose");

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
    subchannelAbout: {
        type: String
    },
    subchannelRules: {
        type: String
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
})

const Subchannel = mongoose.model("Subchannel", subchannelSchema);

module.exports = Subchannel;