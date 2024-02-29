import React from 'react'
import "./index.css"
import UserAvatar from "../UserAvatar"
import { Badge } from 'antd';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function ChatCard(props) {
    return (
        <>
                {/* ${0.8}s 
                ${0.3*props.id}s */}
            <div onClick={()=> {props.onClickFunc()}} style={{"animation": `slideIn 
                ${0.7 + 0.4*props.id}s
                ease forwards 
                ` ,...props.style}} className={`slide-in profile-cards ${props.active}`} >
                <div className="profile-images">
                    <UserAvatar
                        src={props.url}
                        dot={props.typing}
                        alt="Avatar"
                        width="4.2em"
                        height="4.2em"
                        status={'processing'}
                        bh={'1.2em'}
                        bw={'1.2em'}
                        offset={[0, 53]}
                        bgColor= "var(--primary)"
                    />
                </div>
                <div className="profile-details">
                    <div className='upper-row' >
                        <div className='username' >
                            {props.chatname}
                        </div>
                        <div className='timestamp' >
                            {props.timestamp}
                        </div>
                    </div>
                    <div className='lower-row' >
                        <div className='bio' >
                        {
                            props.typing? 
                            <span style={{color: "var(--primary)"}} >Typing...</span>:
                            props.latestMessage
                        }
                        </div>
                        <div className="badge-container">
                            {
                                <Badge
                                    count={props.unread}
                                />
                            }
                            {/* <CheckSharpIcon style={{color: "var(--primary)"}} /> */}
                            {
                                props.unread===0 &&
                                <DoneAllIcon style={{color: "var(--primary"}} />
                            }
                        </div>
                    </div>
                </div>
                {
                    props.content
                }
            </div>
        </>
    )
}
