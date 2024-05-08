
import React, { useEffect, useState } from 'react'
import logo from "../../../../assets/Logo_Sunshine-removebg.png"
import { NavLink } from 'react-router-dom';

const activeStyle = ({ isActive }) => ({
  color: isActive ? 'black' : 'black',
  textDecoration: isActive ? 'underline' : 'none',
  fontSize: '1.7vw'
});

const activeSquareStyle = (pathname) => ({
  width: pathname == '/chat' ? '1vw' : '11vw',
  left: pathname == '/' ? '3vw' : pathname == '/about' ? '17.5vw' : pathname == '/chat' ? '33.3vw' : '41.5vw',
  height: pathname == '/chat' ? '1vw' : '3.4vw',
  borderRadius: pathname == '/chat' ? '100vw' : '1.7vw'
});

const navStyle = (pathname) => ({
  display: pathname == '/chat' ? 'none' : 'flex'
})


function Navbar() {
  const [squareStyle, setSquareStyle] = useState(activeSquareStyle('/home'));
  const locationName = window.location.pathname;
  useEffect(() => {
    refreshSquare();
  }, [locationName]);

  async function refreshSquare() {
    setSquareStyle(activeSquareStyle(locationName));
  }

  return (
    // <BrowserRouter>
    //   <main>
    <>
      <nav style={navStyle(locationName)}>
        <ul>
          <div>
            <NavLink style={activeStyle} to="/" onClick={refreshSquare} className="font-productsans font-normal">Home</NavLink>
          </div>
          <div>
            <NavLink style={activeStyle} to="/about" onClick={refreshSquare} >About</NavLink>

          </div>
          {/* <div> */}
          <NavLink to={"/chat"} onClick={refreshSquare}>
            <img className='logo' src={logo} alt="" />

          </NavLink>
          {/* </div> */}
          <div>
            <NavLink style={activeStyle} to="/login" onClick={refreshSquare} >Profile</NavLink>
          </div>

          <div>
            <NavLink style={activeStyle} to="/" onClick={refreshSquare} >Etc</NavLink>

          </div>
          <div className='navIndicator' style={squareStyle}></div>

        </ul>
      </nav>
      {/* <div>{location.pathname}</div> */}
    </>
  );
}

export default Navbar;