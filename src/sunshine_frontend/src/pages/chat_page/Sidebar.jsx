import React from "react";
import logoImg from "../../../../../assets/Logo_Sunshine-removebg.png";
import { UserIcon as UserSolid } from "@heroicons/react/24/solid";
import { UserIcon as UserOutline } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon as ChatSolid } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon as ChatOutline } from "@heroicons/react/24/outline";
import SidebarIcon from "./SidebarIcon";
import { useNavigate } from "react-router-dom";

// Enums
const IconStates = Object.freeze({
  ACTIVE: "w-10 text-cream-custom stroke-1",
  NONACTIVE: "w-10 text-gray-400 stroke-1",
});

const Icons = Object.freeze({
  FRIENDACTIVE: (
    <div className="flex">
      <UserSolid className={IconStates.ACTIVE} />
      <StaticHover />
    </div>
  ),
  FRIENDNONACTIVE: <UserOutline className={IconStates.NONACTIVE} />,
  CHATACTIVE: (
    <div className="flex">
      <ChatSolid className={IconStates.ACTIVE} />
      <StaticHover />
    </div>
  ),
  CHATNONACTIVE: <ChatOutline className={IconStates.NONACTIVE} />,
});

function StaticHover() {
  return (
    <div className="absolute flex bg-cream-custom w-1 rounded-r-sm left-0 h-12 ease-out duration-200"></div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const locationName = window.location.pathname;

  return (
    <>
      <div className="flex flex-col justify-between h-screen w-[6%] py-3 bg-gray-800">
        <div>
          <img className="w-16 cursor-pointer" src={logoImg} alt="logo" onClick={() => {navigate(`/`)}} />
          {/* icons */}
          <div className="flex-col place-content-center justify-center mt-16 gap-5">
            <SidebarIcon
              icon={
                locationName === "/friend"
                  ? Icons.FRIENDACTIVE
                  : Icons.FRIENDNONACTIVE
              }
              onClick={() => {navigate(`/friend`)}}
            />
            <SidebarIcon
              icon={
                locationName === "/chat"
                  ? Icons.CHATACTIVE
                  : Icons.CHATNONACTIVE
              }
              onClick={() => {navigate(`/chat`)}}
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
