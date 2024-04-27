import React from "react";
import Navbar from "../components/Navbar";

// Template for each page that needed navbar
export default function MainTemplate({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
