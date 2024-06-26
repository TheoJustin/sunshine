import React from "react";

export default function Loader() {
  return (
    <div className="flex w-screen h-screen justify-center items-center bg-orange-100">
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
