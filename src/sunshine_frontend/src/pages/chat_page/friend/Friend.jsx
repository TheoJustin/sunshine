import React from "react";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg";

export default function Friend({
  name,
  pfp,
  friendPrincipal,
  lastMsg,
  activeFriend,
  setActiveFriend,
}) {
  // const bg = activeGroup === id ? "bg-cream-custom" : "bg-transparent";
  return (
    <div
      onClick={() => setActiveFriend(friendPrincipal)}
      className={`cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 mr-2 p-4 flex flex-col mb-5`}
    >
      <div className="flex gap-5">
        <img
          className="m-0 w-20 h-20 rounded-3xl object-cover"
          src={pfp === "" ? placeholder : pfp}
          alt=""
        />
        <div>
          <div className="font-bold">{name}</div>
          <div className="text-lg text-gray-600 truncate max-w-[10vw]">
            {lastMsg}
          </div>
        </div>
      </div>
    </div>
  );
}
