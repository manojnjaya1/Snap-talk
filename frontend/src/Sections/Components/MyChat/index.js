import React, { useEffect, useState } from 'react'
import "./index.css"
import { convertTimestampToTime, getsender } from '../config/ChatLogic';
import ChatCard from '../ChatCard';
import axios from 'axios';
import { ChatState } from '../../../Context/ChatProvider';

const myMsg = (id, notification)=>{
    let count=0;
    notification && notification.map((chat)=>{
        if(chat.chat._id===id) count++;
    })
    return count;
}

export default function MyChat(props) {
    const { user, chats, setChats, selectedChat, setSelectedChat, notification, setnotification } = ChatState();
    const [userlogged, setuserlogged] = useState();
    const handleCreateChat = async (userId) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post("/api/chat", { userId }, config);
            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            props.handleCloseSearch();
            props.showSingleChat();
        } catch (err) {
            console.log(err);
        }
    };
    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get("/api/chat", config);
            setChats(data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        setuserlogged(JSON.parse(localStorage.getItem("user")));
        fetchChats();
        setSelectedChat(selectedChat)
    }, [props.fetchAgain]);

    return (
        <>
            <div className="profile-container scroller-container">
                {
                    props.searchTime &&
                    props.searchResult.map((member, key) => {
                        return (
                            <ChatCard
                                active="hovering"
                                key={member._id}
                                _id={member._id}
                                onClickFunc={()=> handleCreateChat(member)}
                                member={member}
                                chatname={member.name}
                                url={member.pic}
                                latestMessage={member.email}
                                bio={"Hey, here I'm using SnapTalk!🙂"}
                            />
                        )
                    })
                }
                {
                    (!props.searchTime) &&
                    chats && chats.map((chat,key) => {
                        const sender = getsender(userlogged, chat.users);
                        {/* console.log(chat,selectedChat, chat===selectedChat) */}
                        return (
                            <ChatCard
                                key={key}
                                id={key}
                                active={selectedChat && chat._id === selectedChat._id ? `active-holder` : "hovering"}
                                onClickFunc={() => {
                                    setSelectedChat(chat)
                                    props.showSingleChat();
                                    setnotification(notification.filter((element) => element.chat._id !== chat._id))
                                }}
                                chatname={!chat.isGroupChat ? sender.name : chat.chatName}
                                timestamp={convertTimestampToTime(chat.latestMessage ? chat.latestMessage.updatedAt: chat.updatedAt)}
                                url={chat.isGroupChat?chat.pic:sender.pic}
                                latestMessage={
                                    chat.latestMessage ? 
                                    (chat.latestMessage.sender.name +": "+ chat.latestMessage.content).substring(0,35) + ((chat.latestMessage.sender.name +": "+ chat.latestMessage.content).length>=35?"...":"")
                                    :"Hey, here I'm using SnapTalk!🙂"}
                                unread={myMsg(chat._id, notification)}
                                typing={false}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}
