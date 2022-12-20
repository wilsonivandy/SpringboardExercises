import React from "react";
import { NavLink } from "react-router-dom";
// import "./NavBar.css"; 

function NavBar() {
  return (
    <nav className="NavBar">
      <NavLink exact to="/chips">
        Chips
      </NavLink>
      <NavLink exact to="/nachos">
        Nachos
      </NavLink>
      <NavLink exact to="/cheetos">
        Cheetos
      </NavLink>
    </nav>
  );
}

export default NavBar;