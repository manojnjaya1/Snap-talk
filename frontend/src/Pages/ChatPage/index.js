import React, {useState, useEffect} from 'react'
import axios from "axios";

export default function ChatPage() {
  const [chats, setchats] = useState([])
  const fetchChats = async ()=>{
    const {data}=await axios.get("/api/chat");
    setchats(data);
  }

  useEffect(() => {
    fetchChats();
  }, [])

  console.log(chats);
  return (
    <>
      {"ChatPage"}
    </>
  )
}
