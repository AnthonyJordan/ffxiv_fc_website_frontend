import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  const loginProfile = user ? (
    <NavLink className="navButton" exact to="/login">
      Sign Up/Login
    </NavLink>
  ) : (
    "Profile/Logout"
  );
  return (
    <div className="navbar">
      <div>
        <NavLink className="navButton" exact to="/">
          Home
        </NavLink>
      </div>
      <div>
        <NavLink className="navButton" exact to="/members">
          Members
        </NavLink>
      </div>
      <div>
        <NavLink className="navButton" exact to="/gallery">
          Gallery
        </NavLink>
      </div>
      <div>{loginProfile}</div>
    </div>
  );
}

export default NavBar;
