import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { sunshine_backend } from "declarations/sunshine_backend";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/ChatPage";

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
];

const activeStyle = ({ isActive }) => ({
  color: isActive ? "red" : "blue",
  textDecoration: isActive ? "none" : "underline",
});

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
