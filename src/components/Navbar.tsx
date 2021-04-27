import React, { FC, useContext } from "react";

import { Link } from "react-router-dom";
import { LoginContext } from "../store/context/LoginContext";

function Navbar() {
  const { setIsAuthenticated } = useContext(LoginContext);

  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <button
            onClick={() => {
              setIsAuthenticated(false);
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
