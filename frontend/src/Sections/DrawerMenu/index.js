import React, { useEffect, useState } from 'react';
import './index.css';
import ChatCard from '../Components/ChatCard';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import SearchBar from '../Components/SearchBar';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import UserAvatar from '../Components/UserAvatar';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import axios from "axios";
import GroupNameForm from '../Components/GroupNameForm';
import { ChatState } from '../../Context/ChatProvider';

function DrawerMenu(props) {
    const { user } = ChatState();
    const [searchUser, setSearchUser] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    // const [props.selectedUsers, props.setselectedUsers] = useState([]);
    const [open, setopen] = useState(false)

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

    const handleSelectUsers =(chat)=>{
        if(!props.selectedUsers.find((e)=> e._id===chat._id))
        props.setselectedUsers([chat,...props.selectedUsers])
    }

    const removeValueFromArray = (arr, value) => arr.filter(e => e !== value);

    useEffect(() => {
      handleUserSearch("");
    }, [])

    return (
        <>
            <div className={`drawer ${props.open ? 'open' : ''}`}>
                <div className="groupchat-creater-header border-bottom">
                    <ArrowBackIosRoundedIcon style={{ cursor: "pointer" }} onClick={()=>{
                        // props.setselectedUsers([]);
                        props.closeGroupChatCreater()
                    }}/>
                    <div className="groupchat-creater-text">
                        Create a Group Chat
                    </div>
                </div>
                    {/* !groupName && */}
                {
                    <div className="groupchat-creater-body">
                        <div className="gc-search-bar"  >
                            <div className="members-list">
                                {
                                    props.selectedUsers.map((selectedUser) =>{
                                        return (
                                            <div key={selectedUser._id} className="member" onClick={()=> props.setselectedUsers(removeValueFromArray(props.selectedUsers,selectedUser))} >
                                                <UserAvatar src={selectedUser.pic} width={"1.8em"} height={"1.8em"} />
                                                {selectedUser.name}
                                                <ClearRoundedIcon />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* <SearchBar id="user-search" style={{ width: "90%" }} /> */}
                            <SearchBar
                                searchUser={searchUser}
                                setSearchUser={setSearchUser}
                                handleUserSearch={handleUserSearch}
                                // handleCloseSearch={handleCloseSearch}
                                show={false}
                                style={{
                                    width: "90%",
                                }}
                                id="user-serach"
                            />
                        </div>

                        <div className="drawer-container groupchat-creater-profile-container scroller-container">

                                {/* searchTime && */}
                            {
                                searchResult && 
                                searchResult.map((chat, key) => {
                                    if(props.selectedUsers.find(e=>e._id===chat._id)) return(<></>)
                                    return (
                                        <ChatCard
                                            // style={{ height: "20%" }}
                                            active="hovering"
                                            key={chat._id}
                                            _id={chat._id}
                                            onClickFunc={()=> {
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
                }
                <div onClick={()=> setopen(true)} className="groupchat-creater-footer d-flex border-top justify-content-center align-items-center">
                    <button disabled={props.selectedUsers.length<1} className='squircles'>
                        <ArrowForwardRoundedIcon />
                    </button>
                </div>
                <GroupNameForm selectedUsers={props.selectedUsers} setopen={setopen} closeLastDrawer={props.closeGroupChatCreater} onClose={()=> setopen(false)} open={open} />

            </div>
        </>
    );
}

export default DrawerMenu;

{/* {
    groupName &&
    <>
        <div className="groupchat-creater-body upload-box">
            <UploadImage />
            <EmojiInput />
        </div>
    </>
} */}
{/* <div className="groupchat-creater-footer d-flex border-top justify-content-center align-items-center">
    <button className='squircles' >
        {
            !groupName && <ArrowForwardRoundedIcon disabled onClick={nextStephandler} />
        }
        {
            groupName && <DoneOutlineRoundedIcon />
        }
    </button>
</div> */}