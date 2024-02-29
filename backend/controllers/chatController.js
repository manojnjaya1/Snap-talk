const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChats = expressAsyncHandler(
    async (req,res) => {
        const {userId} = req.body;
        console.log(userId);
        if(!userId) {
            console.log("User_id param not sent with the request");
            res.status(400).json({message: "User_id Param not sent with the request"})
            return;
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            users: {
                $all: [req.user._id, userId]
            }
            // $add: [
            //     {users: {$elemMatch: {$eq: req.user._id}}},
            //     {users: {$elemMatch: {$eq: userId}}}
            // ]
        }).populate("users", "-password").populate("latestMessage");

        isChat= await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name email pic"
        })

        if(isChat.length >0) {
            res.send(isChat[0]);
        }
        else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id,userId]
            };

            try{
                const createdChat = await Chat.create(chatData);

                const FullChat = await Chat.findOne({
                    _id: createdChat._id
                }).populate("users", "-password");

                res.status(200).send(FullChat);
            }catch(err) {
                res.status(400).send(err);
                throw new Error(err);
            }
        }
    }
)

const fetchChats = expressAsyncHandler(
    async(req,res)=>{
        try{
            var allChats = await Chat.find({
                users: {
                    $elemMatch: {$eq: req.user._id}
                }
            })
            .populate("users","-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({updatedAt: -1})
            
            allChats = await User.populate(allChats, {
                path: "latestMessage.sender",
                select: "name email pic"
            })
            res.send(allChats);
        }
        catch(err) {
            res.status(400).send(err);
            throw new Error(err);
        }
    }
)

const createGroupChat = expressAsyncHandler(
    async (req,res) =>{
        var {users, name, pic} = req.body;
        if(!users || !name) {
            return res.status(400).send({message: "Please Enter all fields"})
        }

        users = JSON.parse(users);
        if(users.length < 1){
            return res.status(400).send("More than 2 users are required to form a group");
        }

        try{

            const groupChat = await Chat.create({
                chatName: name,
                isGroupChat: true,
                users: [
                    req.user._id,
                    ...users
                ],
                groupAdmin: req.user._id,
                pic
            });

            const fullGroupChat = await Chat.find({
                _id: groupChat._id
            })
            .populate("users", "-password")
            .populate("latestMessage")
            .populate("groupAdmin", "-password")

            res.status(200).send(fullGroupChat);
        }catch(err){
            res.status(400).send(err);
            throw new Error(err);
        }     
    }
)

const renameGroup = expressAsyncHandler(
    async (req,res)=>{
        const {chatId, chatName}=req.body;

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
                chatName
            },
            {
                new: true
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");

        if(!updatedChat) {
            res.status(404).json({message: "Group Name failed to update"})
        }
        else{
            res.status(200).send(updatedChat);
        }
    }
)

const addToGroup = expressAsyncHandler(
    async (req,res)=>{
        const {chatId, userId} = req.body;

        const updated = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: {users: userId}
            },
            {
                new: true
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");

        if(!updated){
            res.status(404).json({message: "Member not exist"})
        }
        else{
            res.status(200).send(updated);
            return;
        }
    }
)
const removeFromGroup = expressAsyncHandler(
    async (req,res)=>{
        const {chatId, userId} = req.body;

        const remove = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: {users: userId}
            },
            {
                new: true
            }
        ).populate("users", "-password")
        .populate("groupAdmin", "-password");

        if(!remove){
            res.status(404).json({message: "Member not exist"})
        }
        else{
            res.status(200).send(remove);
        }
    }
)

module.exports = {accessChats, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup};

