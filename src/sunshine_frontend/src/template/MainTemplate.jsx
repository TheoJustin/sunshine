import React, { useState } from "react";
import Navbar from "../components/Navbar";

// Template for each page that needed navbar


export default function MainTemplate({ children }) {
  return (
    <>
      {/* navbarnya klo ditaroh sini transisinya jdi gbisa :( */}
      {/* <Navbar squareStyle={squareStyle} setSquareStyle={setSquareStyle} activeSquareStyle={activeSquareStyle}/> */} 
      <div>{children}</div>
    </>
  );
}
