const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        isGroupChat: {
            type: Boolean,
            default: false
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        pic: {
            type: String,
            default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;