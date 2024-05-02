import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import './index.css';
import './fonts.css';
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/chat_page/ChatPage";
import FriendPage from "./pages/chat_page/FriendPage";
import { Actor, HttpAgent } from "@dfinity/agent";
import {
  idlFactory as fontLoaderIdl,
  sunshine_fontloader,
} from "declarations/sunshine_fontloader";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./use-auth-client";

// const agent = new HttpAgent({ host: 'https://ic0.app' });
// const fontLoaderCanisterId = 'be2us-64aaa-aaaaa-qaabq-cai';
// const fontLoader = Actor.createActor(fontLoaderIdl, { agent, canisterId: fontLoaderCanisterId });

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
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path: "/friend",
    element: <FriendPage />,
  },
];

const activeStyle = ({ isActive }) => ({
  color: isActive ? "red" : "blue",
  textDecoration: isActive ? "none" : "underline",
});

function App() {
  // useEffect(() => {
  //   const uploadFonts = async () => {
  //     try {
  //       const fontsFolder = '/fonts';
  //       const fontFileNames = ['Product_Sans_Bold.ttf', 'Product_Sans_Italic.ttf', 'Product_Sans_Bold_Italic.ttf', 'Product_Sans_Regular.ttf'];

  //       for (const fontFileName of fontFileNames) {
  //         const fontName = fontFileName.replace(/\.[^/.]+$/, '');
  //         const fontDataResponse = await fetch(`${fontsFolder}/${fontFileName}`);
  //         const fontArrayBuffer = await fontDataResponse.arrayBuffer();
  //         const fontData = new Blob([new Uint8Array(fontArrayBuffer)]);

  //         await sunshine_fontloader.uploadFont(fontName, fontData);
  //         console.log('Font uploaded successfully:', fontName);
  //       }
  //     } catch (error) {
  //       console.error('Failed to upload fonts:', error);
  //     }
  //   };

  //   const loadFonts = async () => {
  //     try {
  //       const fontNames = await sunshine_fontloader.getFontName();  // Assuming getFontName is available
  //       const fontStyles = fontNames.map(fontName => {
  //         let fontWeight = 'normal';
  //         let fontStyle = 'normal';

  //         if (fontName.includes('Bold') && fontName.includes('Italic')) {
  //           fontWeight = 'bold';
  //           fontStyle = 'italic';
  //         } else if (fontName.includes('Bold')) {
  //           fontWeight = 'bold';
  //         } else if (fontName.includes('Italic')) {
  //           fontStyle = 'italic';
  //         }

  //         const fontFamily = 'Product Sans'; // Simplify the family name for CSS

  //         return `
  //           @font-face {
  //             font-family: '${fontFamily}';
  //             src: local('${fontName}'), url('/fonts/${fontName}.ttf') format('truetype');
  //             font-style: ${fontStyle};
  //             font-weight: ${fontWeight};
  //           }
  //         `;
  //       }).join('\n');

  //       const styleElement = document.createElement('style');
  //       styleElement.innerHTML = fontStyles;
  //       document.head.appendChild(styleElement);
  //     } catch (error) {
  //       console.error('Failed to load fonts:', error);
  //     }
  //   };

  //   uploadFonts().then(loadFonts);
  // }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          {/* <Navbar /> */}
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
