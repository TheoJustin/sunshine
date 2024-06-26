import React from "react";

export default function MiniLoader() {
  return (
    <div className="flex w-full h-[87%] min-h-[50vh] justify-center items-center">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
