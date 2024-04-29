import React from "react";
import logoImg from "../../../../../assets/Logo_Sunshine-removebg.png";
import { UserIcon } from "@heroicons/react/16/solid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import SidebarIcon from "./SidebarIcon";

export default function Sidebar() {
  return (
    <>
      {/* The left nav */}
      <div className="flex flex-col justify-between h-screen w-24 py-3 bg-gray-800">
        <div>
          <img className="w-16" src={logoImg} alt="" />
          {/* icons */}
          <div className="flex-col place-content-center justify-center mt-16 gap-5">
            <SidebarIcon
              icon={<UserIcon className="w-10 text-cream-custom stroke-1" />}
            />
            <SidebarIcon
              icon={
                <ChatBubbleOvalLeftEllipsisIcon className="w-10 text-cream-custom stroke-1" />
              }
            />
          </div>
        </div>
        <div>
          <img className="w-16" src={logoImg} alt="" />
        </div>
      </div>
    </>
  );
}
