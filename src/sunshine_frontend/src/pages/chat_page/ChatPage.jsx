import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";
import ChatPageTemplate from "../../templates/ChatPageTemplate";

export default function ChatPage() {
  return (
    <ChatPageTemplate>
      <FriendList />
    </ChatPageTemplate>
  );
}
