import React, { useEffect, useState } from 'react';
import './index.css';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchBar from "../SearchBar/index"
import axios from 'axios';
import { ChatState } from '../../../Context/ChatProvider';
import ChatCard from '../ChatCard';
import UserAvatar from '../UserAvatar';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';

const Modal = ({ onClose, setfetchAgain, fetchAgain }) => {
    const { user, selectedChat, setSelectedChat, openMessage} = ChatState();
    const [searchUser, setSearchUser] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [selectedUsers, setselectedUsers] = useState([]);
    const handleUserSearch = async (param) => {
        try {
            const { data } = await axios.get(`/api/user?search=${param}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setsearchResult(data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleSelectUsers = async (chat) => {
        if (!selectedUsers.find((e) => e._id === chat._id))
        openMessage("updatable", "loading" ,"⏳ Adding You to the Group... Please Wait.");
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`
                    }
                }
                const { data } = await axios.put("/api/chat/add", {
                    chatId: selectedChat._id,
                    userId: chat._id
                }, config);
                openMessage("updatable", "success" ,`🎉 Congrats, ${chat.name}! You've Just Leveled Up in Group Chatting! 🚀`);
                setselectedUsers([chat, ...selectedUsers])
                setSelectedChat(data);
                setfetchAgain(!fetchAgain)
            } catch (err) {
                console.log(err);
                openMessage("updatable","error",`⚠️ Oops! Unable to Add You to the Group!`)
            }
    }
    useEffect(() => {
        handleUserSearch("");
        setselectedUsers(selectedChat.users)
    }, [])
    return (
        <div className="modals-overlay" onClick={onClose}>
            <div className="modals" onClick={(e) => e.stopPropagation()}>
                <div className="modals-header">
                    <div className='headline' >
                        Add members
                    </div>
                    <div className='close-btn' >
                        <CloseRoundedIcon onClick={onClose} />
                    </div>
                </div>
                <div className="modals-content groupchat-creater-body">
                    <div className="gc-search-bar">
                        <div className="members-list">
                            {
                                selectedUsers.map((selectedUser) => {
                                    return (
                                        <div key={selectedUser._id} className="member"
                                        // onClick={() => setselectedUsers(removeValueFromArray(selectedUsers, selectedUser))} 
                                        >
                                            <UserAvatar src={selectedUser.pic} width={"1.8em"} height={"1.8em"} />
                                            {selectedUser.name}
                                            {/* <ClearRoundedIcon /> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <SearchBar
                            searchUser={searchUser}
                            setSearchUser={setSearchUser}
                            handleUserSearch={handleUserSearch}
                            show={false}
                            style={{
                                width: "90%",
                            }}
                            id="modal-searching"
                        />
                    </div>
                    <div className="groupchat-creater-profile-container scroller-container">
                        {
                            searchResult &&
                            searchResult.map((chat, key) => {
                                if (selectedUsers.find(e => e._id === chat._id)) return (<></>)
                                return (
                                    <ChatCard
                                        // style={{ height: "20%" }}
                                        active="hovering"
                                        key={chat._id}
                                        _id={chat._id}
                                        onClickFunc={() => {
                                            handleSelectUsers(chat)
                                        }}
                                        member={chat}
                                        chatname={chat.name}
                                        url={chat.pic}
                                        latestMessage={chat.email}
                                        bio={"Hey, here I'm using SnapTalk!🙂"}
                                    />
                                )
                            })
                        }
                    </div>
                </div>

                <div className="confirm-btn squircles" onClick={onClose} >
                    <DoneOutlineRoundedIcon />
                </div>
            </div>
        </div>
    );
};

export default Modal;