import React, { useState } from 'react'
import UploadImage from '../UploadImage/UploadImage'
import EmojiPalette from '../EmojiPalette'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import axios from 'axios';
import { ChatState } from '../../../Context/ChatProvider';

export default function GroupNameForm(props) {
    const {user, chats, setChats, selectedChat, setSelectedChat, openMessage} = ChatState();
    const [name, setname] = useState("");
    const [pic, setpic] = useState("")
    const [loading, setloading] = useState(false)

    const handleCreateGroup= async()=>{
        if(!name || !props.selectedUsers) return;

        openMessage("creating","loading","⏳ Spinning Up the Chat Machine... Just a Moment, Please! 🔄");
        try{
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }
            const {data} = await axios.post("/api/chat/group", {
                name,
                users: JSON.stringify(props.selectedUsers.map((element) => element._id)),
                pic: pic ? pic: "https://1.bp.blogspot.com/-TCjM5XzRUSg/X75w1adIN3I/AAAAAAAAGPM/n1tW2tKMr-MsL2sCf8uneKIGMHj0TLT3QCNcBGAsYHQ/s720/Screenshot_2020-11-25-21-38-44-66.png"
            } ,config);
            openMessage("creating","success",`🎉 Welcome to the Party Zone! ${data.chatName} Group Chat is Now Live! 🥳`);
            setChats([data[0], ...chats]);
            setSelectedChat(data[0])
            props.setopen(false);
            props.closeLastDrawer();
        }catch(err){
            openMessage("creating","error",`⚠️ Uh-oh! Chat Creation Failed for ${name}. Gremlins at Work? 🛠️`);
        }
    }
    return (
        <>
            <div className={`drawer ${props.open ? 'open' : ''}`}>
            <div className="groupchat-creater-header border-bottom">
                    <ArrowBackIosRoundedIcon style={{ cursor: "pointer" }} onClick={()=> {
                        props.onClose();
                        setname("")
                    }} />
                    <div className="groupchat-creater-text">
                        Create a Group Chat
                    </div>
                </div>
                <div className="groupchat-creater-body upload-box">
                    <UploadImage pic={pic} setpic={setpic} loading={loading} setloading={setloading}/>
                    <EmojiPalette inputValue={name} setInputValue={setname} />
                </div>
                <div onClick={()=> {
                    handleCreateGroup()
                    setname("")
                }} className="groupchat-creater-footer d-flex border-top justify-content-center align-items-center">
                    <button disabled={!(name.trim()).length || loading} className='squircles' >
                        <DoneOutlineRoundedIcon />
                    </button>
                </div>
            </div>
        </>
    )
}
