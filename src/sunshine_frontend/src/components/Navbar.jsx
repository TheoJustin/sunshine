import React, { useEffect, useState } from "react";
import logo from "../../../../assets/Logo_Sunshine-removebg.png";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { opacity } from "@cloudinary/url-gen/actions/adjust";

const activeStyle = ({ isActive }) => ({
  color: isActive ? "white" : "#ff9f1c",
  fontSize: "1.7vw",
  fontWeight: '600'
});

var isHover = false;



// .navbar-shrink {
//   height: 4vw; /* Adjust the height as needed */
// }



// nav ul div {
//   width: 11vw;
//   text-align: center;
//   align-items: center;
//   padding: 0vw 1.7vw;
//   border-radius: 1vw;
//   transition: all 0.3s;
// }



const activeSquareStyle = (pathname, isScrolled) => ({
  width: "11vw",
  opacity: (isScrolled && !isHover) ? '0%' : '100%',
  left:
  (isScrolled && !isHover) ? '25vw' :
    pathname == "/"
      ? "3vw"
      : pathname == "/about"
      ? "17.7vw"
      : pathname == "/chat"
      ? "33.3vw"
      : pathname == "/login" ? "41.3vw" : '25vw',
  height: pathname == "/chat" ? "1vw" : "3.4vw",
  borderRadius: pathname == "/chat" ? "100vw" : "1.7vw",
});

const navbarStyle = (pathname) => ({
  display: pathname == "/chat" || pathname == "/friend" || pathname == 'TwentyFive' || pathname == 'MentalMath' || pathname == 'ReactionTime' ? "none" : "flex",
  position: 'fixed',
  left: '50%',
  top: '10%',
  transform: 'translate(-50%, -50%)',
  zIndex: '100',
  justifyContent: 'center',
  transition: 'all 0.3s',
})
const navUlStyleTemplate = (isScrolled) => ({
  display: 'flex',
  width: isScrolled && !isHover ? '7vw' : '70vw',
  padding: isScrolled && !isHover ? '0' : ' 0.5vw 3vw',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'linear-gradient( 100deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
  borderRadius: '6vw',
  zIndex: '1',
  height: '6vw',
  transition: 'all 0.3s',
})

const navDivTemplate = (isScrolled) => ({
  width: isScrolled && !isHover ? '0vw' : '11vw',
  opacity: isScrolled && !isHover ? '0%' : '100%',
  textAlign: 'center',
  alignItems: 'center',
  padding: isScrolled && !isHover ? '0' : '0vw 1.7vw',
  borderRadius: '1vw',
  transition: 'all 0.3s',
})

function Navbar({isScrolled}) {
  
  const location = useLocation();
  const [squareStyle, setSquareStyle] = useState(activeSquareStyle(location.pathname, isScrolled));
  const [navStyle, setNavStyle] = useState(navbarStyle(location.pathname));
  const [navUlStyle, setNavUlStyle] = useState(navUlStyleTemplate(isScrolled));
  const [navDivStyle, setNavDivStyle] = useState(navDivTemplate(isScrolled));

  async function refreshStyles() {
    // console.log(location.pathname);
    // console.log(isScrolled);
    setSquareStyle(activeSquareStyle(location.pathname, isScrolled));
    setNavStyle(navbarStyle(location.pathname));
    setNavUlStyle(navUlStyleTemplate(isScrolled));
    setNavDivStyle(navDivTemplate(isScrolled));
    // console.log(navbarStyle(location.pathname));
  }

  useEffect(() => {
    refreshStyles();
  }, [location.pathname, isScrolled]);
  
  function mouseEnter(){
    isHover = true;
    refreshStyles();
  }
  function mouseLeave(){
    isHover = false;
    refreshStyles();
  }

  return (
    <>
      <nav onScrollCapture={refreshStyles} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} id="navbar" className="font-productsans" style={navStyle}>
        <ul style={navUlStyle}>
          {isScrolled}
          <div style={navDivStyle}>
            <NavLink
              style={activeStyle}
              to="/"
              onClick={refreshStyles}
              className="font-productsans font-normal"
            >
              Home
            </NavLink>
          </div>
          <div style={navDivStyle}>
            <NavLink style={activeStyle} to="/about" onClick={refreshStyles}>
              About
            </NavLink>
          </div>
          <div>
            <NavLink to={"/chat"} onClick={refreshStyles}>
              <img style={{
                width: '5vw',
                maxWidth: '5vw',
              }} src={logo} alt="" />
            </NavLink>
          </div>
          <div style={navDivStyle}>
            <NavLink style={activeStyle} to="/login" onClick={refreshStyles}>
              Profile
            </NavLink>
          </div>
          <div className="bg-darkgreen-custom py-1 rounded-3xl" style={{boxShadow: '0 0 15px #1b2f2e'}}>
            <div style={{...navDivStyle}}>
              <NavLink style={{...activeStyle, color: '#ffffff', fontWeight: '600'}} to="/chat" onClick={refreshStyles}>
                Chat
              </NavLink>
            </div>

          </div>
          <div className="navIndicator" style={squareStyle}></div>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
