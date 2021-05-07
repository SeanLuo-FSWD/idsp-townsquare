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
          setUsername(result.username);
          setUserId(result.userId);
          setCurrentUser({
            ...currentUser,
            // id: result.userId,
            id: "2",
            username: result.username,
            img:
              "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
          });

          // setCurrentUser({
          //   id: "1",
          //   username: "bob",
          //   email: "bob@bob.com",
          //   img:
          //     "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
          //   age: 5,
          //   gender: "male",
          //   location: "Burnaby",
          // });
        }
      });
    } else {
      setLoginError("You are missing some credentials");
    }
  };

  return (

    <div className={styles.card}>
      <div className={styles.container}>
        <div>
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
        <form className={styles.loginForm}>
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
            <br></br>
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
            <br></br>
            <button className={styles.loginButton} onClick={handleLogin}>Login</button>
          </form>
        </div>
        <div>
            <p className={styles.noAccount}>Don't have an account?</p>
            <div className="register">
              <button className={styles.registerButton}>
                <Link className={styles.link} to="/register">Register</Link>
              </button>
            </div>
        </div>
        </div>
      </div>
  );
}

export default Login;

