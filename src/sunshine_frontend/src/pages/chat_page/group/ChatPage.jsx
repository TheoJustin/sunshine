import React, { useEffect, useState } from "react";
import ChatPageTemplate from "../../../templates/ChatPageTemplate";
import ChatBox from "./ChatBoxGroup"
import GroupList from "./GroupList";

export default function ChatPage() {
  const [activeGroup, setActiveGroup] = useState("");
  return (
    <ChatPageTemplate>
      <GroupList activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
      <ChatBox activeGroup={activeGroup}  />
    </ChatPageTemplate>
  );
}
