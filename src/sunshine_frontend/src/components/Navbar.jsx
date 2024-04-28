
import React, { useEffect, useState } from 'react'
import logo from "../../../../assets/Logo_Sunshine-removebg.png"
import { NavLink } from 'react-router-dom';

const activeStyle = ({ isActive }) => ({
  color: isActive ? 'black' : 'black',
  textDecoration: isActive ? 'underline' : 'none'
});

const activeSquareStyle = (pathname) => ({
  width: pathname == '/chat'? '1vw' :  '11vw',
  left: pathname == '/home' ? '3vw' : pathname == '/about' ? '17.5vw' : pathname=='/chat' ? '33.3vw' : '41.5vw',
  height: pathname == '/chat' ? '1vw': '3.7vw',
  borderRadius: pathname == '/chat' ? '100vw' : '1.7vw'
});


function Navbar(){
  // maaf joss gw komen dlu yaa
    // return (
        // <>
        // <nav className="bg-white border-gray-200 dark:bg-gray-900">
        //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        //     <NavLink
        //       to="/home"
        //       className="flex items-center space-x-3 rtl:space-x-reverse"
        //     >
        //       <img
        //         src={logo}
        //         className="h-8"
        //         alt="Sunshine Logo"
        //       />
        //       <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        //         Sunshine
        //       </span>
        //     </NavLink>
        //     <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        //       <button
        //         type="button"
        //         className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        //         id="user-menu-button"
        //         aria-expanded="false"
        //         data-dropdown-toggle="user-dropdown"
        //         data-dropdown-placement="bottom"
        //       >
        //         <span className="sr-only">Open user menu</span>
        //         <img
        //           className="w-8 h-8 rounded-full"
        //           src="/docs/images/people/profile-picture-3.jpg"
        //           alt="user photo"
        //         />
        //       </button>
        //       <div
        //         className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
        //         id="user-dropdown"
        //       >
        //         <div className="px-4 py-3">
        //           <span className="block text-sm text-gray-900 dark:text-white">
        //             Bonnie Green
        //           </span>
        //           <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
        //             name@flowbite.com
        //           </span>
        //         </div>
        //         <ul className="py-2" aria-labelledby="user-menu-button">
        //           <li>
        //             <a
        //               href="#"
        //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        //             >
        //               Dashboard
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               href="#"
        //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        //             >
        //               Settings
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               href="#"
        //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        //             >
        //               Earnings
        //             </a>
        //           </li>
        //           <li>
        //             <a
        //               href="#"
        //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        //             >
        //               Sign out
        //             </a>
        //           </li>
        //         </ul>
        //       </div>
        //       <button
        //         data-collapse-toggle="navbar-user"
        //         type="button"
        //         className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        //         aria-controls="navbar-user"
        //         aria-expanded="false"
        //       >
        //         <span className="sr-only">Open main menu</span>
        //         <svg
        //           className="w-5 h-5"
        //           aria-hidden="true"
        //           xmlns="http://www.w3.org/2000/svg"
        //           fill="none"
        //           viewBox="0 0 17 14"
        //         >
        //           <path
        //             stroke="currentColor"
        //             stroke-linecap="round"
        //             stroke-linejoin="round"
        //             stroke-width="2"
        //             d="M1 1h15M1 7h15M1 13h15"
        //           />
        //         </svg>
        //       </button>
        //     </div>
        //     <div
        //       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        //       id="navbar-user"
        //     >
        //       <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        //         <li>
        //           <a
        //             href="#"
        //             className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
        //             aria-current="page"
        //           >
        //             Home
        //           </a>
        //         </li>
        //         <li>
        //           <a
        //             href="#"
        //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        //           >
        //             About
        //           </a>
        //         </li>
        //         <li>
        //           <a
        //             href="#"
        //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        //           >
        //             Services
        //           </a>
        //         </li>
        //         <li>
        //           <a
        //             href="#"
        //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        //           >
        //             Pricing
        //           </a>
        //         </li>
        //         <li>
        //           <a
        //             href="#"
        //             className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        //           >
        //             Contact
        //           </a>
        //         </li>
        //       </ul>
        //     </div>
        //   </div>
        // </nav>
        // </>

    // )
  const [squareStyle, setSquareStyle] = useState(activeSquareStyle ('/home'));
  useEffect(() => {
    refreshSquare();
  }, [window.location.pathname]);

  async function refreshSquare(){
    setSquareStyle(activeSquareStyle(window.location.pathname));
  }


  return (
    // <BrowserRouter>
    //   <main>
    <>
        <nav>
          <ul>
            <div>
              <NavLink style={activeStyle}  to="/home" onClick={refreshSquare} >Home</NavLink>
            </div>
            <div>
              <NavLink style={activeStyle} to="/about"  onClick={refreshSquare} >About</NavLink> 

            </div>
            {/* <div> */}
            <NavLink to={"/chat"} onClick={refreshSquare}>
              <img className='logo' src={logo} alt="" />

            </NavLink>
            {/* </div> */}
            <div>
              <NavLink style={activeStyle} to="/"  onClick={refreshSquare} >Etc</NavLink>
            </div>

            <div>
              <NavLink style={activeStyle} to="/"  onClick={refreshSquare} >Etc</NavLink>

            </div>
              <div className='navIndicator' style={squareStyle}></div>
            
          </ul>
        </nav>
        <div>{location.pathname}</div>
    </>
  );
}

export default Navbar;