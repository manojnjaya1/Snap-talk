import React from 'react'
import { MessageFilled } from "@ant-design/icons";
import "./index.css";

export default function BlankContainer() {
    return (
        <>
            <div className="message-container blank-container" style={{ backgroundColor: "var(--primary-light)" }} >
                <h1 className="fw-bold" >Join <span style={{ color: "var(--primary)" }} >Snap</span>Talk
                    <span>
                        <MessageFilled style={{ color: "var(--primary)" }} className="logo-icon" />
                    </span> today<span style={{ color: "var(--primary)" }}>!</span></h1>
                <p>
                    <span  >
                        {/* <MailLockRoundedIcon style={{fontSize: "1.2em"}}/> */}
                    </span>Connect, Chat, and Discover a New Era of Conversation.</p>
                {/* Connect, Chat, and Discover a New Way to Communicate. */}
            </div>
        </>
    )
}
