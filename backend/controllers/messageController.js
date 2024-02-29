const expressAsyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");
const sendMessages = expressAsyncHandler(
    async (req, res) => {
        const { content, chatId } = req.body;
        if (!content || !chatId) {
            res.status(400).json({ message: "Enter all fields" });
            return;
        }

        var newMessage = {
            sender: req.user._id,
            content,
            chat: chatId
        }

        try {
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "name email pic");
            message = await message.populate("chat");

            message = await User.populate(message, {
                path: "chat.users",
                select: "name email pic"
            });

            await Chat.findByIdAndUpdate(chatId, {
                latestMessage: message
            })

            res.status(200).json(message);
        } catch (err) {
            res.status(400).json({ message: "Server Errors!" })
        }
    }
)

const allMessages = expressAsyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate(
                "sender",
                "name pic email"
            ).populate("chat")

        res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        res.status(400).json(err.message);
    }
})

const deleteMessages = expressAsyncHandler(async (req, res) => {
    try {
        // const { messageId } = req.body;
        const messageId= req.params.messageId;

        const deletedMessage = await Message.findByIdAndDelete(messageId);

        if (deletedMessage) {
            res.status(200).json({ message: 'Message deleted successfully' });
        } else {
            res.status(404).json({ message: 'Message not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = { sendMessages, allMessages, deleteMessages };