import React, { useState } from "react";
import ChatPageTemplate from "../../../templates/ChatPageTemplate";
import FriendList from "./FriendList";
import ChatBoxFriend from "./ChatBoxFriend";

export default function FriendPage() {
  const [activeFriend, setActiveFriend] = useState("");
  return (
    <ChatPageTemplate>
      <FriendList
        activeFriend={activeFriend}
        setActiveFriend={setActiveFriend}
      />
      <ChatBoxFriend activeFriend={activeFriend} setActiveFriend={setActiveFriend}/>
    </ChatPageTemplate>
  );
}
