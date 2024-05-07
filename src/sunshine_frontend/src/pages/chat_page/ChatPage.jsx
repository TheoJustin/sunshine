import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import ChatPageTemplate from "../../templates/ChatPageTemplate";
import { useAuth } from "../../use-auth-client";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox"

export default function ChatPage() {
  



  return (
    
    <ChatPageTemplate>
      <FriendList />
      <ChatBox />
    </ChatPageTemplate>
  );
}
