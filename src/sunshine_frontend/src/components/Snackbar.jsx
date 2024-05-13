import React from "react";

export default function Snackbar({ bgColor, title, description, icon }) {
  return (
    <div className={`${bgColor} flex p-3 gap-3 rounded-xl`}>
      {icon}
      <div>
        <div className="font-bold text-white text-base">
          {title}
        </div>
        <div className=" text-white text-sm">{description}</div>
      </div>
    </div>
  );
}
