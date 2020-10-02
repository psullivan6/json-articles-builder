import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import "./styles.css";

const Nav = () => {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <NavLink activeClassName="active" to="/" exact>
            Upload
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/builder">
            Articles Builder
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/preview">
            Preview
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
