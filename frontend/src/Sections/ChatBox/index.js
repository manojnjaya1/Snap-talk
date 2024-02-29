import React, { useState } from "react";
import Header from "../Components/Header";
import MyChat from "../Components/MyChat";
import SearchBar from "../Components/SearchBar";
import DropDownMenu from "../Components/DropDownMenu";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
// import { ChatState } from "../../Context/ChatProvider";
import "./index.css";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";
import { Badge, notification } from "antd";

export default function ChatBox(props) {
    const { user} = ChatState();
    const [searchUser, setSearchUser] = useState("");
    const [searchResult, setsearchResult] = useState([]);
    const [searchTime, setsearchTime] = useState(false);

    // searches users to create chats
    const handleUserSearch = async (param) => {
        setsearchTime(true);
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
    const handleCloseSearch = () => {
        setsearchTime(false);
        setSearchUser("");
        setsearchResult([]);
    };

    return (
        <>
            <Header url={user && user.pic} />
            <div className="fade-in search-bar border-bottom border-1">
                
                <SearchBar
                    searchUser={searchUser}
                    setSearchUser={setSearchUser}
                    handleUserSearch={handleUserSearch}
                    handleCloseSearch={handleCloseSearch}
                    show={searchTime}
                    style={{
                        width: "75%",
                    }}
                    id="serach"
                />
                <Badge count={notification.length} >
                    <FilterListRoundedIcon />
                </Badge>
                <DropDownMenu showDrawer={props.showDrawer} />
            </div>

            {/* Implement Segmented for ease tab switch */}
            <MyChat
                handleCloseSearch={handleCloseSearch}
                searchResult={searchResult}
                searchTime={searchTime}
                fetchAgain={props.fetchAgain}
                showSingleChat={props.showSingleChat}
            />
        </>
    );
}

{
/*<MessageCard chatname={"User Name"} timestamp={"12:34 PM"} url={url} latestMessage={"Small message regarding the user..."} unread={4} />
  <MessageCard active="active-holder" chatname={"User Name"} timestamp={"12:34 PM"} url={url} latestMessage={"Small message regarding the user..."} unread={0} typing />
  <MessageCard chatname={"User Name"} timestamp={"12:34 PM"} url={url} latestMessage={"Small message regarding the user..."} unread={1} typing /> */
}
