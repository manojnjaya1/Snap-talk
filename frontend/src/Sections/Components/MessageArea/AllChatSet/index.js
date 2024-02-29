import React from 'react'
import "./index.css";
import EachMessageBoxContainer from '../EachMessageBoxContainer';
import { convertTimestampToTime } from '../../config/ChatLogic';

export default function AllChatSet(props) {
    const classAnimation=`slide-in-${props.sender}`
    return (
        <>
            <div className={`${props.sender}-chats all-chats-set ${classAnimation}`}>
                <div className="user-pic">
                    <div>
                        <img className='' src={props.url} alt="" />
                    </div>
                </div>
                <div className="message-content">
                    <div className="user-details">
                        <div className="user-name">{props.username}</div>
                    </div>
                    {
                        props.setMessage && props.setMessage.map((eachmessage,key)=>{
                            console.log(eachmessage);
                            return(
                                <EachMessageBoxContainer sender={props.sender} allMessages={props.allMessages} setallMessages={props.setallMessages} fetchAgain={props.fetchAgain} setfetchAgain={props.setfetchAgain} key={key} messageId={eachmessage._id} classAnimation={classAnimation} message={eachmessage.content} time={convertTimestampToTime(eachmessage.updatedAt)} />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

// import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
// import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
// import { Dropdown } from 'antd';
// import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
// import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
// import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
                    // <div className="each-message-box-container">
                    //     <div className="each-message-box first-message">
                    //         <p>
                    //             This is Arish from IIIT Bhopal
                    //         </p>
                    //         <div className="message-likes-time">
                    //             <div className="likes">
                    //                 ❤️
                    //             </div>
                    //             <div className="time">
                    //                 <span>
                    //                     2:47 am
                    //                 </span>
                    //                 <span className='seen-icons' >
                    //                     {/* <DoneRoundedIcon /> */}
                    //                     <DoneAllRoundedIcon />
                    //                 </span>
                    //             </div>
                    //         </div>
                    //         <div className="menu-container">
                    //             <span>
                    //                 <EmojiEmotionsRoundedIcon />
                    //             </span>
                    //             <span>
                    //                 {/* When More Options are implemented
                    //                 <Dropdown
                    //                     menu={{
                    //                         items,
                    //                     }}
                    //                     placement="bottomLeft"
                    //                     arrow
                    //                 >
                    //                     <KeyboardArrowDownRoundedIcon />
                    //                 </Dropdown> */}
                    //                 <DeleteRoundedIcon />
                    //             </span>
                    //         </div>
                    //     </div>
                    // </div>
                    // <div className="each-message-box-container">
                    //     <div className="each-message-box" >
                    //         <p>
                                
                    //         </p>
                    //         <div className="message-likes-time">
                    //             <div className="likes">
                    //                 😂
                    //             </div>
                    //             <div className="time">
                    //                 <span>
                    //                     2:47 am
                    //                 </span>
                    //                 <span className='seen-icons' >
                    //                     {/* <DoneRoundedIcon /> */}
                    //                     <DoneAllRoundedIcon />
                    //                 </span>
                    //             </div>
                    //         </div>
                    //         <div className="menu-container">
                    //             <span>
                    //                 <EmojiEmotionsRoundedIcon />
                    //             </span>
                    //             <span>
                    //                 <DeleteRoundedIcon />
                    //             </span>
                    //         </div>
                    //     </div>
                    // </div>
                    // <div className="each-message-box-container">
                    //     <div className="each-message-box" >
                    //         <p>
                    //             Hi
                    //         </p>
                    //         <div className="message-likes-time">
                    //             <div className="likes">
                    //                 ✌️
                    //             </div>
                    //             <div className="time">
                    //                 <span>
                    //                     2:47 am
                    //                 </span>
                    //                 <span className='seen-icons' >
                    //                     {/* <DoneRoundedIcon /> */}
                    //                     <DoneAllRoundedIcon />
                    //                 </span>
                    //             </div>
                    //         </div>
                    //         <div className="menu-container">
                    //             <span>
                    //                 <EmojiEmotionsRoundedIcon />
                    //             </span>
                    //             <span>
                    //                 <DeleteRoundedIcon />
                    //             </span>
                    //         </div>
                    //     </div>
                    // </div>