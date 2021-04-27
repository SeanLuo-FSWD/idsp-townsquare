import React, { useContext, useEffect } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Login() {
  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setIsAuthenticated,
  } = useContext(LoginContext);
  const location = useLocation();

  useEffect(() => {
    console.log("signUpStatus");
    console.log(signUpStatus);
  });

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
