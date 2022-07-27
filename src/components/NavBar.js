import React from "react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function NavBar({ user, onLogout }) {
  const [pathname, setPathname] = useState(useLocation());
  function handleLogout() {
    setPathname("/");
    onLogout();
  }
  const loginOrProfile = user ? (
    <div>
      <NavLink
        className="navButton"
        exact
        to="/profile"
        onClick={() => setPathname("/profile")}
      >
        Profile
      </NavLink>
      /
      <span onClick={() => handleLogout()} className={"logout pointer"}>
        Logout
      </span>
    </div>
  ) : (
    <NavLink
      className="navButton"
      exact
      to="/login"
      onClick={() => setPathname("/login")}
    >
      Sign Up/Login
    </NavLink>
  );

  return (
    <div className="navbar">
      <div>
        <NavLink
          className="navButton"
          exact
          to="/"
          onClick={() => setPathname("/")}
        >
          Home
        </NavLink>
      </div>
      <div>
        <NavLink
          className="navButton"
          exact
          to="/members"
          isActive={() => ["/members"].includes(pathname)}
          onClick={() => setPathname("/members")}
        >
          Members
        </NavLink>
      </div>
      <div>
        <NavLink
          className="navButton"
          exact
          to="/gallery"
          onClick={() => setPathname("/gallery")}
        >
          Gallery
        </NavLink>
      </div>
      <div>{loginOrProfile}</div>
    </div>
  );
}

export default NavBar;
