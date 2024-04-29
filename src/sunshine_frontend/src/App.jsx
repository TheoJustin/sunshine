import { sunshine_fontloader } from 'declarations/fontLoader';
import { useState } from "react";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { sunshine_backend } from "declarations/sunshine_backend";
import './index.css';
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import ChatPage from "./pages/chat_page/ChatPage";

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

useEffect(() => {
  const uploadFonts = async () => {
      try {
          const fontsFolder = '/fonts';
          const fontFiles = await fetch(fontsFolder).then(response => response.json());

          // Iterate through each font file
          for (const fontFile of fontFiles) {
              const fontName = fontFile.name.replace(/\.[^/.]+$/, ''); // Extract font name without extension
              const fontData = await fetch(`${fontsFolder}/${fontFile.name}`).then(response => response.blob());
              await sunshine_fontloader.uploadFont(fontName, fontData);
              console.log('Font uploaded successfully:', fontName);
          }
      } catch (error) {
          console.error('Failed to upload fonts:', error);
      }
  };
  uploadFonts();

  const loadFonts = async () => {
    try {
        // Get the list of font names from the font loader
        // const fontNames = /* Call a function to get the list of font names */;
        
        // Generate CSS rules for each font
        const fontStyles = fontNames.map(fontName => `
            @font-face {
                font-family: '${fontName}';
                src: local('${fontName}'), url('/fonts/${fontName}.woff2') format('woff2'), url('/fonts/${fontName}.woff') format('woff');
                /* Add more font formats if needed */
            }
        `).join('\n');
        
        // Append the generated CSS rules to the document's style element
        const styleElement = document.createElement('style');
        styleElement.innerHTML = fontStyles;
        document.head.appendChild(styleElement);
    } catch (error) {
        console.error('Failed to load fonts:', error);
    }
  };

  loadFonts();
}, []);

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
