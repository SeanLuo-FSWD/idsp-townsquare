import React, { useContext, useState } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { login } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import styles from "./LoginPg.module.scss";

function Login() {
  const {
    signUpStatus,
    setSignUpStatus,
    setUsername,
    currentUser,
    setCurrentUser,
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
          setCurrentUser({
            ...currentUser,
            id: result.data.userId,
            username: result.data.username,
          });
        }
      });
    } else {
      setLoginError("You are missing some credentials");
    }
  };

  return (

    <div className={styles.card}>
      <div className={styles.container}>
      <img
        className={styles.logo}
        src="https://i.imgur.com/0ldmkwI.png"
        alt="TownSquareLogo"
      ></img>
      <h1 className="townSquareTitle">TownSquare</h1>
      {/* <p className={styles.testInfo}>
        For default user, login with: <br></br>
        email: bob@bob.com <br></br>
        password: bob@bob.com <br></br>
      </p> */}
      {signUpStatus && <h2>Sign up success</h2>}
      {loginError && <Error message={loginError} />}
      {/* <h4>bob@bob.com</h4> */}
      <div>
        <div className={styles.loginForm}>
          <label htmlFor="uname">
            {/* <p className={styles.labelText}>Email</p> */}
          </label>
          <input
            className={styles.inputField}
            type="text"
            placeholder="Enter email"
            name="email"
            required
            value={person.email}
            onChange={handleChange}
          />
          <label htmlFor="psw">
            {/* <p className={styles.labelText}>Password</p> */}
          </label>
          <input
            className={styles.inputField}
            type="password"
            placeholder="Enter Password"
            name="password"
            required
            value={person.password}
            onChange={handleChange}
          />
        </div>  
          <br></br>
          <button className={styles.loginButton} onClick={handleLogin}>Login</button>
        </div>
        <div>
          <div>
            <p>Don't have an account?</p>
            <div className="register">
              <button className={styles.registerButton}>
                <Link className={styles.link} to="/register">Register</Link>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default Login;
