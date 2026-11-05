const mongoose = require("mongoose");
const uuidv7 = require("uuidv7")

const messageSchema = new mongoose.Schema({
      messageID: {
        type: String,
        required: true,
        default: () => uuidv7.uuidv7(),
        index: { unique: true }
      },
    messageTitle: {
        type: String,
        required: true,
    },
    messageBody: {
        type: String
    },
    messageOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    discussionRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Discussion"
    },
},{timestamps:true})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;