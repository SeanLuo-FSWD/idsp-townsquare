import React, { useContext, useState } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { login } from "../../utils/api/auth";
import Error from "../../components/Error/Error";

function Login() {
  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    setIsAuthenticated,
    setUserId,
  } = useContext(LoginContext);

  const [loginError, setLoginError] = useState("");

  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (person.email && person.password) {
      const user_obj = {
        email: person.email,
        password: person.password,
      };
      login(user_obj, (err: Error, result: any) => {
        if (err) {
          console.log(err);
          setLoginError(err.message);
        } else {
          setLoginError("");

          setIsAuthenticated(true);
          setSignUpStatus(false);

          // Can I get username back here?
          console.log("login result message");
          console.log(result);
          setUsername(result.data.username);
          setUserId(result.data.userId);
        }
      });
    } else {
      setLoginError("You are missing some credentials");
    }
  };

  const handleLogin_test = (e: any) => {
    e.preventDefault();
    setUsername("tester");
    setUserId("tester123");
    setLoginError("");

    setIsAuthenticated(true);
    setSignUpStatus(false);
  };

  return (
    <div>
      {signUpStatus && <h2>Sign up success</h2>}
      {loginError && <Error message={loginError} />}
      <h2>Please login</h2>
      <h4>bob@bob.com</h4>
      <div>
        <label htmlFor="uname">
          <b>email</b>
        </label>
        <input
          type="text"
          placeholder="Enter email"
          name="email"
          required
          value={person.email}
          onChange={handleChange}
        />
        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          value={person.password}
          onChange={handleChange}
        />
        <button
          // onClick={() => {
          //   console.log("setIsAuthenticated toggled to true");
          //   setIsAuthenticated(true);
          //   setSignUpStatus(false);
          // }}
          onClick={handleLogin_test}
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