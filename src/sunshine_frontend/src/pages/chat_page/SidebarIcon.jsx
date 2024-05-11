import React, { useState } from "react";

export default function SidebarIcon({ icon, onClick }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative flex justify-center place-content-center w-full h-12 mt-5 cursor-pointer"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={onClick}
    >
      <Hover active={active} />
      <div>{icon}</div>
    </div>
  );
}

function Hover({ active }) {
  const opacityControl = active ? "opacity-100" : "opacity-0";
  return (
    <div
      className={`absolute flex bg-orange-custom w-1 rounded-r-sm left-0 h-12 transition-opacity duration-200 ${opacityControl}`}
    ></div>
  );
}

