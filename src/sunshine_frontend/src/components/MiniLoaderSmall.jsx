import React from "react";

export default function MiniLoaderSmall() {
  return (
    <div className="flex w-full h-[30vh] justify-center items-center">
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
