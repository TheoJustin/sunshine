import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import "./index.css";
import "./fonts.css";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as fontLoaderIdl,
  sunshine_fontloader,
} from "declarations/sunshine_fontloader";
import { AuthProvider } from "./use-auth-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { ChakraProvider } from "@chakra-ui/react";
import TwentyFive from "./pages/game_page/TwentyFive";
import MentalMath from "./pages/game_page/MentalMath";
import ReactionTest from "./pages/game_page/ReactionTest";
import ChatPage from "./pages/chat_page/group/ChatPage";
import FriendPage from "./pages/chat_page/friend/FriendPage";
// import { CardWithForm } from "./components/login/LoginCardTest";

// const agent = new HttpAgent({ host: 'https://ic0.app' });
// const fontLoaderCanisterId = 'be2us-64aaa-aaaaa-qaabq-cai';
// const fontLoader = Actor.createActor(fontLoaderIdl, { agent, canisterId: fontLoaderCanisterId });
function App() {
  const [scrolled, setScrolled] = useState(false);
  const routes = [
    {
      path: "/",
      element: <LandingPage/>,
    },
    {
      path: "/about",
      element: <AboutPage setScrolled={setScrolled}/>,
    },
    {
      path: "/login",
      element: <LoginPage/>,
    },
    {
      path: "/register",
      element: <RegisterPage/>,
    },
    {
      path: "*",
      element: <NotFoundPage/>,
    },
    {
      path: "/chat",
      element: <ChatPage/>,
    },
    {
      path: "/friend",
      element: <FriendPage/>,
    },
    {
      path: "/TwentyFive",
      element: <TwentyFive/>,
    },
    {
      path: "/MentalMath",
      element: <MentalMath/>,
    },
    {
      path: "/ReactionTime",
      element: <ReactionTest/>,
    },
  ];
  
  
  const queryClient = new QueryClient();
  function handleScroll(event) {
    const scrollY = event.target.scrollTop;
    // console.log(scrollY);
    if (scrollY > 0) {
      console.log("higher");
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <main id="mainapp" onScrollCapture={handleScroll}>
            <Navbar isScrolled={scrolled} />
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
