import React from "react";
import { MessageFilled } from "@ant-design/icons";
import UserAvatar from "../UserAvatar";
import "./index.css"

export default function Header(props) {
    return (
        <>
            <div className="logo-header fade-in">
                <div className="logo -in">
                    <span>Snap</span>Talk
                    <span>
                        <MessageFilled className="logo-icon" />
                    </span>
                </div>
                <UserAvatar
                    src={props.url}
                    count={props.count}
                    alt="Avatar"
                    width="3.5em"
                    height="3.5em"
                />
            </div>
        </>
    );
}