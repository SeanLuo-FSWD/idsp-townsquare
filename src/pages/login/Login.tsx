import React, { useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";

function Login() {
  const { setUsername, setIsAuthenticated } = useContext(LoginContext);

  return (
    <div>
      <h2>Please login</h2>
      <div>
        <label htmlFor="uname">
          <b>username</b>
        </label>
        <input
          type="text"
          placeholder="Enter username"
          name="email"
          required
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
        />
        <button
          onClick={() => {
            console.log("setIsAuthenticated toggled to true");
            setIsAuthenticated(true);
          }}
        >
          Login
        </button>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
