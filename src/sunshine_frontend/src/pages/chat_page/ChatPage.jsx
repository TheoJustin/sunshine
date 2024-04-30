import React, { useState } from "react";
import Sidebar from "./Sidebar";
import FriendList from "./FriendList";

export default function ChatPage() {
  const [active, setActive] = useState("");
  return (
    <>
      <div className="flex w-screen h-screen bg-yellow-50">
        <Sidebar setActive={setActive}/>
        <FriendList />
      </div>
    </>
  );
}
