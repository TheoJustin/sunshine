import React, { Children, useEffect, useState } from "react";
import Sidebar from "../pages/chat_page/Sidebar";

export default function ChatPageTemplate({ children }) {

  return (
    <>
      <div className="flex w-screen h-screen bg-yellow-50">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
