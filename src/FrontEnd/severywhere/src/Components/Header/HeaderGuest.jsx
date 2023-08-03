// import "./HeaderGuest.scss";
// import React, {useState, useEffect, useRef} from 'react';


// const Navbar = () => {
  
//     const[open, setOpen] = useState(false);
//     let menuRef = useRef();

//     useEffect(() => {
//         let handler = (e) => {
//             if(!menuRef.current.contains(e.target)){
//                 setOpen(false);
//                 console.log(menuRef.current);
//             }
//         };

//         document.addEventListener("mousedown", handler);

//         return() => {
//             document.removeEventListener("mousedown", handler);
//         }
//     });

//     return (
//         <nav className="Header-Guest">
//                 <div className = "container">
//                     <a href = "https://www.google.com/" id="lg">
//                         <img src="/horizontal_white.png" className = "SE-logo" alt = "logo"/>
//                     </a>
                    
//                     <div className = "subcontainer">
//                         <div className = "Menu">
//                             <a href = "https://www.google.com/">About</a>
//                             <a href = "https://www.google.com/">FAQs</a>
//                             <a href = "https://www.google.com/">Tour Guides</a>
//                             <a href = "https://www.google.com/">Tours</a>
//                         </div>

//                         <line className="vertical-line"></line>
//                         <icons className="icons">
//                             <a href = "https://www.google.com/">
//                                 <i className="fa-solid fa-cart-shopping cartheart"></i>
//                             </a>
//                             <a href = "https://www.google.com/">
//                                 <i className="fa-solid fa-heart cartheart"></i>
//                             </a>
                            
//                             <div className="user" id="user-trigger" onClick={() => {setOpen(!open)}}>
//                                 <i className="fa-solid fa-circle-user iconuser" ></i>
//                                 <i className="fa fa-chevron-down dropicon" ></i>
//                             </div>

//                             <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}></div>
//                                 <ul>
//                                     <DropdownItem className = "fa-regular fa-user" text = {"Login"}/>
//                                     <DropdownItem className = "fa-solid fa-user-plus" text = {"Register"}/>
//                                 </ul>
//                         </icons>
//                     </div>
//                 </div>   
//         </nav>
//     )
// };

// function DropdownItem(props){
//     return(
//       <li className = 'dropdownItem'>
//         <i className = {props.className}></i>
//         <a> {props.text} </a>
//       </li>
//     );
// }

// export default Navbar;         

import "./HeaderGuest.scss";
import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      console.log(e)
      if ( menuRef.current && menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    // document.addEventListener("mousedown", handler);

    // return () => {
    //   document.removeEventListener("mousedown", handler);
    // };
  });

  return (
    <nav className="Header-Guest">
      <div className="container">
        <a href="https://www.google.com/" id="lg">
          <img src="/horizontal_white.png" className="SE-logo" alt="logo" />
        </a>

        <div className="subcontainer">
          <div className="Menu">
            <a href="https://www.google.com/">About</a>
            <a href="https://www.google.com/">FAQs</a>
            <a href="https://www.google.com/">Tour Guides</a>
            <a href="https://www.google.com/">Tours</a>
          </div>

          <line className="vertical-line"></line>
          <icons className="icons">
            <a href="https://www.google.com/">
              <i className="fa-solid fa-cart-shopping cartheart"></i>
            </a>
            <a href="https://www.google.com/">
              <i className="fa-solid fa-heart cartheart"></i>
            </a>

            <div className="user" id="user-trigger" onClick={() => setOpen(!open)}>
              <i className="fa-solid fa-circle-user iconuser"></i>
              <i className={`fa fa-chevron-down dropicon ${open ? 'rotate' : ''}`}></i>
            </div>

            {open && (
              <div className="dropdown-menu" ref={menuRef}>
                <ul>
                  <DropdownItem className={"fa-regular fa-user"} text={"Login"} link = "/login-test"/>
                  <DropdownItem className={"fa-solid fa-user-plus"} text={"Register"} />
                </ul>
              </div>
            )}
          </icons>
        </div>
      </div>
    </nav>
  );
};

function DropdownItem(props) {
  return (
    <Link to = {props.link} style={{ textDecoration: 'none'}}>
      <li className="dropdownItem">
        <i className={props.className}></i>
        <a >{props.text}</a>
      </li>
    </Link>

  );
}

export default Navbar;




