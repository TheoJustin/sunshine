import { useState } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { sunshine_backend } from 'declarations/sunshine_backend';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';

const routes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
];

const activeStyle = ({ isActive }) => ({
  color: isActive ? 'red' : 'blue',
  textDecoration: isActive ? 'none' : 'underline'
});



function App() {
  const [greeting, setGreeting] = useState('');

  return (
    <BrowserRouter>
      <main>
        <nav>
          <NavLink style={activeStyle} to="/home">Home</NavLink> | 
          <NavLink style={activeStyle} to="/about">About</NavLink> | 
        </nav>
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
