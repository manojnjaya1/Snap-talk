import React from 'react'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import "./index.css";
import { Popconfirm, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ChatState } from '../../../../Context/ChatProvider';
import axios from 'axios';

// import DoneRoundedIcon from '@mui/icons-material/DoneRounded';

export default function EachMessageBoxContainer(props) {
    const {user, openMessage}=ChatState();
    const confirm = async()=>{
        try{
            const config={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            };
            const {data} = await axios.delete(`/api/message/${props.messageId}`,config);
            props.setallMessages(props.allMessages.filter((element) => element._id !== props.messageId));
            props.setfetchAgain(!(props.fetchAgain))
            message.success(data.message)
        }
        catch(err){
            openMessage("key","error","Failed to delete messages");
        }
    }
    const confirms =(e)=>{
        // deleteMessage();
    }
    return (
        <>
            <div className={"each-message-box-container " + props.classAnimation}>
                <div className="each-message-box first-message">
                    <p>
                        {props.message}
                    </p>
                    <div className="message-likes-time">
                        <div className="likes">
                            {/* ❤️😂 */}
                        </div>
                        <div className="time">
                            <span>
                                {props.time}
                            </span>
                            <span className='seen-icons' >
                                {/* <DoneRoundedIcon /> */}
                                <DoneAllRoundedIcon />
                            </span>
                        </div>
                    </div>
                    <div className="menu-container">
                        <span>
                            <EmojiEmotionsRoundedIcon />
                        </span>
                        {
                            props.sender!=='left' &&
                            <span>
                                <Popconfirm
                                    title="Delete"
                                    description="Are you sure to delete this message?"
                                    okText="Delete"
                                    cancelText="Cancel"
                                    onConfirm={confirm}
                                    icon={
                                        <QuestionCircleOutlined
                                            style={{
                                                color: 'red',
                                            }}
                                        />
                                    }
                                >
                                    <DeleteRoundedIcon />
                                </Popconfirm>
                            </span>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
