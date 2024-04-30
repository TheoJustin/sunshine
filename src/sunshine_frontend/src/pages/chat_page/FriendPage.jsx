import React from "react";
import ChatPageTemplate from "../../templates/ChatPageTemplate";
import FriendList from "./FriendList";

export default function FriendPage() {
  return (
    <ChatPageTemplate>
      <FriendList />
    </ChatPageTemplate>
  );
}
