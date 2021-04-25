import React, { useState, useContext } from "react";
import { LoginContext } from "./context/LoginContext";

function Login() {
  const { setUsername, setIsAuthenticated } = useContext(LoginContext);

  return (
    <div>
      <h2>Please login</h2>
      <form>
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
            setIsAuthenticated(true);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
