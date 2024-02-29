import React, { useEffect, useState } from 'react'
import "./index.css"
import ProfileImage from '../Components/UserAvatar'
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import AttachmentIcon from '@mui/icons-material/Attachment';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import MicRoundedIcon from '@mui/icons-material/MicRounded';
import PaletteRoundedIcon from '@mui/icons-material/PaletteRounded';
import { Popover } from 'antd';
import MessageArea from '../Components/MessageArea';
import ProfileViewer from './ProfileViewer';
import { ChatState } from '../../Context/ChatProvider';
import { getsender } from '../Components/config/ChatLogic';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import axios from 'axios';
import io from "socket.io-client"
const ENDPOINT = "http://localhost:5000"
var socket, selectedChatCompare;

const colors = [
    "#faafa8", "#d3bfdb", "#fff8b8", "#efeff1", "#f6e2dd"
];
const content = (
    <div className='color-container'>
        {
            colors.map((e, key) => 
            <div 
                key={key} 
                className='color-box squircles' 
                style={{ backgroundColor: e }} 
            >
            </div>)
        }
    </div>
);

export default function MessageContainer({fetchAgain, setfetchAgain, closeSingleChat}) {
    const {user, selectedChat, openMessage, typing, settyping, istyping, setistyping, notification, setnotification} = ChatState();
    const [message, setmessage] = useState("")
    const [allMessages, setallMessages] = useState([]);
    const [openBox1, setopenBox1] = useState("close-1");
    const [openBox2, setopenBox2] = useState("close-2");
    const [socketConnected, setSocketConnected] = useState(false)

    useEffect(() => {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connected", ()=>{
        setSocketConnected(true)
      })
      socket.on("typing",()=> setistyping(true))
      socket.on("stop typing", ()=> setistyping(false))
    }, [])

    const handleButtonClick = () => {
        setopenBox1(openBox1 === "open-box-1" ? "close-1" : "open-box-1");
        setopenBox2(openBox2 === "open-box-2" ? "close-2" : "open-box-2");
    };
    const handleSendMessage= async(e)=>{
        socket.emit("stop typing", selectedChat._id);
        try{
            const config={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            setmessage("");
            const {data} = await axios.post("/api/message",{
                content: message,
                chatId: selectedChat._id
            }, config);

            socket.emit("new message", data);

            setallMessages([...allMessages,data]);
            setfetchAgain(!fetchAgain)
        }catch(err){
            openMessage("error-message","error","Message not sent!");
        }
    }
    const fetchMessages = async()=>{

        if(!selectedChat) return;

        try{
            const config={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };

            const {data} = await axios.get(`/api/message/${selectedChat._id}`,config);
            setallMessages(data);
            socket.emit("join chat", selectedChat._id);
        }
        catch(err){
            openMessage("key","error","Failed to fetch messages");
        }
    }
    useEffect(() => {
      fetchMessages();

      selectedChatCompare = selectedChat;
    }, [selectedChat])
    
    useEffect(() => {
      socket.on("message received", (newMessageReceived)=>{
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
            //give notification
            if(!notification.includes(newMessageReceived)){
                setnotification([newMessageReceived,...notification]);
            }
        }
        else {
            setallMessages([...allMessages, newMessageReceived])
        }
      })
    })
    
    const handletyping = (e) => {
        if(e.target.value!=="\n")
            setmessage(e.target.value)

        if(!socketConnected) return;
        if(!typing) {
            settyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        
        setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;

            if(timeDiff >= 3000 && typing) {
                socket.emit("stop typing", selectedChat._id);
                settyping(false);
            }
        }, 3000);
    }
    const props = {
        chatName: "User Name",
        status: "User"
    }
    
    return (
        <>
            <div className={`message-container ${openBox1}`} 
            // style={{ width: `${box1Width}` }} 
            >
                <div className="chat-header ">
                    <div onClick={closeSingleChat} style={{cursor: 'pointer'}} className="back-btn squircles">
                        <div className='squircles' >
                            <ArrowBackRoundedIcon />
                        </div>
                    </div>
                    <div onClick={handleButtonClick} className="details d-flex align-items-center">
                        <ProfileImage style={{ height: "3.6em", width: "3.6em" }} src={selectedChat.isGroupChat?selectedChat.pic:getsender(user,selectedChat.users).pic} />
                        <div className="chat-details">
                            <div className='chat-name'>
                                {selectedChat.isGroupChat?selectedChat.chatName:getsender(user,selectedChat.users).name}
                            </div>
                            <div className="status">
                                {istyping ? "typing..." : props.status}

                            </div>
                        </div>
                    </div>
                    <div className="options">
                        <div className="dots squircles">
                            <MoreVertRoundedIcon />
                        </div>
                    </div>
                </div>

                <div className="chat-body">
                    <MessageArea allMessages={allMessages} setallMessages={setallMessages} fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
                </div>
                <div className="chat-footer ">
                    <div className="chat-icons">
                        <div className="attach-icon squircles">
                            <AttachmentIcon />
                        </div>
                    </div>
                    <textarea onKeyDown={(e)=> {
                        if(e.nativeEvent.key==="Enter" && !e.nativeEvent.shiftKey)
                            handleSendMessage();
                    }} 
                    value={message} 
                    onChange={handletyping} 
                    className='message-input' rows="1" type="text" placeholder="Type your message..." />
                    <div className="chat-icons">
                        <div className="color-icon squircles">
                            <Popover style={{ backgroundColor: "transparent" }} content={content} title="" trigger="click" >
                                <PaletteRoundedIcon />
                            </Popover>
                        </div>
                        {
                            message.length === 0 ?
                            <div className="send-icon squircles">
                                <MicRoundedIcon />
                            </div>:
                            <div className="send-icon squircles" onClick={handleSendMessage}>
                                <SendRoundedIcon/>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className={`border-start details-profile-container ${openBox2}`} 
            // style={{ width: `${box2Width}` }}
            >
                <ProfileViewer fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} handleButtonClick={handleButtonClick} 
                // display={box1Width === "100%" ? "" : "show"} 
                display={openBox1 !== "open-box-1" ? "" : "show"} 

                />
            </div>
        </>
    )
}
