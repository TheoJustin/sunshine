import React from "react";

export default function Group({ id, lastMessage, groupName, setActiveGroup, activeGroup }) {
    const bg = activeGroup === id ? "bg-cream-custom" : "bg-transparent"
  return (
    <div
      onClick={() => {
        setActiveGroup(id);
      }}
      className={`${bg} cursor-pointer text-left hover:bg-cream-custom rounded-xl ease-out transition-all duration-200 mr-2 p-4 flex flex-col mb-5`}
    >
      <div className="font-bold">{groupName}</div>
      <div className="text-lg text-gray-600">{lastMessage}</div>
    </div>
  );
}
