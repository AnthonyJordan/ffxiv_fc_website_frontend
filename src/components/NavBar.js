import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user, onLogout }) {
  const loginOrProfile = user ? (
    <div>
      <NavLink className="navButton" exact to="/profile">
        Profile
      </NavLink>
      /
      <span onClick={onLogout} className={"logout"}>
        Logout
      </span>
    </div>
  ) : (
    <NavLink className="navButton" exact to="/login">
      Sign Up/Login
    </NavLink>
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
      <div>{loginOrProfile}</div>
    </div>
  );
}

export default NavBar;
