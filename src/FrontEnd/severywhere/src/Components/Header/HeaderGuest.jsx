
import "./HeaderGuest.scss";
import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../../redux/actions/BasicAction";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const role = useSelector(state => state.BasicReducer.user_login?.id_role)
  let menuRef = useRef();

  const dispatch = useDispatch();
  const handleLogout = () => {
    console.log("logout");
    dispatch(logOutAction());

    window.location.href = "/";
  }

  return (
    <nav className="Header-Guest">
      <div className="container">
        <a href="/homepage" id="lg">
          <img src="/horizontal_white.png" className="SE-logo" alt="logo"/>
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
                  {role === 1 ?(
                      <>
                        <DropdownItem className={"fas fa-user-alt"} text={"Account"} link = "/editprofile"/>
                        <DropdownItem className={"fa-solid fa-cart-shopping"} text={"Bookings"} link = "/changepw"/>
                        <DropdownItem className={"fa-solid fa-arrow-right-from-bracket"} text={"Log out"} onClick= {()=>handleLogout()}/>
                      </>
                  )
                  : (
                      <>
                      <DropdownItem className={"fa-regular fa-user"} text={"Login"} link = "/login"/>
                      <DropdownItem className={"fa-solid fa-user-plus"} text={"Register"} link = "/signup"/>
                      </>
                  )}
                  
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
      <li className="dropdownItem">
        <i className={props.className}></i>
        <a href = {props.link}>{props.text}</a>
      </li>
  );
}

export default Navbar;




