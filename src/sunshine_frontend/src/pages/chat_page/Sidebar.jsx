import React from "react";
import logoImg from "../../../../../assets/Logo_Sunshine-removebg.png";
import { UserIcon as UserSolid } from "@heroicons/react/24/solid";
import { UserIcon as UserOutline } from "@heroicons/react/24/outline";
import { ChatBubbleOvalLeftEllipsisIcon as ChatSolid } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon as ChatOutline } from "@heroicons/react/24/outline";
import SidebarIcon from "./SidebarIcon";
import { useNavigate, useNavigation } from "react-router-dom";
import placeholder from "../../../../../assets/profilePlaceholder.jpg";
import { sunshine_backend } from "../../../../declarations/sunshine_backend";
import { useQuery } from "@tanstack/react-query";

// Enums
const IconStates = Object.freeze({
  ACTIVE: "w-10 text-orange-custom stroke-1",
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
    <div className="absolute flex bg-orange-custom w-1 rounded-r-sm left-0 h-12 ease-out duration-200"></div>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  const locationName = window.location.pathname;
  const getUserDetail = async () => {
    return await sunshine_backend.getUserById(principal);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getUserDetail"],
    queryFn: getUserDetail,
  });

  return (
    <>
      <div className="flex flex-col justify-between h-screen w-[6%] py-8 bg-[#0c0c14]">
        <div>
          <img
            className="w-16 cursor-pointer"
            src={logoImg}
            alt="logo"
            onClick={() => {
              navigate(`/`);
            }}
          />
          {/* icons */}
        </div>
        <div>
          <div className="flex-col place-content-center justify-center mt-16 gap-5">
            <SidebarIcon
              icon={
                locationName === "/friend"
                  ? Icons.FRIENDACTIVE
                  : Icons.FRIENDNONACTIVE
              }
              onClick={() => {
                navigate(`/friend`);
              }}
            />
            <SidebarIcon
              icon={
                locationName === "/chat"
                  ? Icons.CHATACTIVE
                  : Icons.CHATNONACTIVE
              }
              onClick={() => {
                navigate(`/chat`);
              }}
            />
            {data &&
              data.ok && (
                <img
                  className="w-12 h-12 object-cover rounded-full mt-5 cursor-pointer"
                  src={
                    data.ok.profileUrl === "" ? placeholder : data.ok.profileUrl
                  }
                  alt=""
                  onClick={() => navigate(`/login`)}
                />
              )}
          </div>
        </div>
      </div>
    </>
  );
}
