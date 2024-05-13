import React from "react";
import placeholder from "../../../../../../assets/profilePlaceholder.jpg"

export default function Group({
  id,
  lastMessage,
  groupName,
  imageUrl,
  setActiveGroup,
  activeGroup,
}) {
  const bg = activeGroup === id ? "bg-cream-custom" : "bg-transparent";
  return (
    <div
      onClick={() => {
        setActiveGroup(id);
      }}
      className={`${bg} cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 mr-2 p-4 flex flex-col mb-5`}
    >
      <div className="flex gap-5">
        <img className="m-0 w-20 h-20 rounded-3xl object-cover" src={imageUrl === "" ? placeholder : imageUrl} alt="" />
        <div>
          <div className="font-bold truncate max-w-[10vw]">{groupName}</div>
          <div className="text-lg text-gray-600 truncate max-w-[10vw]">{lastMessage}</div>
        </div>
      </div>
    </div>
  );
}
