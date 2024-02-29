import React from 'react';
import "./index.css";
import AllChatSet from './AllChatSet';
import { groupConsecutive } from '../config/ChatLogic';
import { ChatState } from '../../../Context/ChatProvider';

export default function MessageArea({allMessages, fetchAgain, setfetchAgain, setallMessages}) {
    const {user} = ChatState();
    groupConsecutive(allMessages)
    return ( 
        <>
            <div className="scrollable-div scroller-design">
                <div className="scrollable-content">
                    {
                        allMessages && groupConsecutive(allMessages).map((setMessage,key)=>{
                            return(
                                <AllChatSet 
                                    fetchAgain={fetchAgain} setfetchAgain={setfetchAgain}
                                    setMessage={setMessage} 
                                    allMessages={allMessages}
                                    setallMessages={setallMessages}
                                    sender={user._id===setMessage[0].sender._id?"right": "left"} 
                                    url={setMessage[0].sender.pic} 
                                    username={setMessage[0].sender.name} 
                                    key={key}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}
