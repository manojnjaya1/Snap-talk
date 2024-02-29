import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
const chatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState()
  const [messageApi, contextHolder] = message.useMessage();
  const [typing, settyping] = useState(false);
  const [istyping, setistyping] = useState(false);
  const navigate = useNavigate();
  const [notification, setnotification] = useState([])

  const openMessage = (key, type, content, duration, className, style) => {
    messageApi.open({
      key,
      type: type,
      content: content,
      duration,
      className,
      style
    });
  };
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    setuser(userInfo);
  }, [navigate])


  return (
    <chatContext.Provider value={{ 
      user, setuser, 
      chats, setChats, 
      selectedChat, setSelectedChat, 
      contextHolder, 
      openMessage, 
      typing, settyping, 
      istyping, setistyping,
      notification, setnotification
      }} >
      {children}
    </chatContext.Provider>
  )
}

export const ChatState = () => {
  return useContext(chatContext);
}

export default ChatProvider;