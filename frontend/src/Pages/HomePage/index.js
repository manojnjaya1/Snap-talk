import React, { useEffect, useState } from "react";
import "./index.css";
import ChatBox from "../../Sections/ChatBox";
import DrawerMenu from "../../Sections/DrawerMenu";
import MessageContainer from "../../Sections/MessageContainer";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
// import { MessageFilled } from "@ant-design/icons";
// import MailLockRoundedIcon from '@mui/icons-material/MailLockRounded';
import BlankContainer from "../../Sections/Components/BlankContainer";


function HomePage() {
  const [open, setOpen] = useState(false);
  const { user, selectedChat, contextHolder } = ChatState();
  const [selectedUsers, setselectedUsers] = useState([]);
  const [fetchAgain, setfetchAgain] = useState(false);
  const [smOpen, setsmOpen] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  const containerStyle = {
    position: "relative",
    overflow: "hidden",
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const closeGroupChatCreater = () => {
    setselectedUsers([]);
    setOpen(false);
  };
  const showSingleChat=()=>{
    setsmOpen(true);
  }
  const closeSingleChat=()=>{
    setsmOpen(false);
  }
  return (
    <>
      {contextHolder}
      {user && (
        <div className="main-container">
          <div className={`sidebar ${smOpen? "":"showing-sm"} border-end border-2`} style={containerStyle}>
            <ChatBox showSingleChat={showSingleChat} showDrawer={showDrawer} fetchAgain={fetchAgain} />
            <DrawerMenu
              open={open}
              selectedUsers={selectedUsers}
              setselectedUsers={setselectedUsers}
              closeGroupChatCreater={closeGroupChatCreater}
            />
          </div>
          <div className={`message-box ${smOpen? "showing-sm":""} scroller-container`}>
            {
              selectedChat ?
                <MessageContainer closeSingleChat={closeSingleChat} fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
                :
                <BlankContainer />
            }
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
