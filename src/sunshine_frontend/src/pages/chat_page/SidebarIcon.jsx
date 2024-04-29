import React from "react";

export default function SidebarIcon({ icon }) {
  return (
    <div className="flex justify-center place-content-center w-full h-12 mt-5 hover:bg-cream-custom ease-out duration-200">
      <div>{icon}</div>
    </div>
  );
}