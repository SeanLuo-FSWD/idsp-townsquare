import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Login() {
  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setIsAuthenticated,
    setUserId,
  } = useContext(LoginContext);

  return (
    <div>
      {signUpStatus && <h2>Sign up success</h2>}
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
            setUserId(uuidv4());
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
            setSignUpStatus(false);
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
