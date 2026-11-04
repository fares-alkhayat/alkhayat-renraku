const mongoose = require("mongoose");

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
    messageCount: {
        type: Number
    },
    followCount: {
        type: Number
    },
    upvoteCount: {
        type: Number
    },
    downvoteCount: {
        type: Number
    },
    voteCount: {
        type: Number
    },
    userCount: {
        type: Number
    },
    tags: {
        type: [String]
    },
    genre: {
        type: String
    }
})

const Discussion = mongoose.model("Discussion", discussionSchema);

module.exports = Discussion;