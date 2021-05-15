import React, { useContext, useState } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { login } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import styles from "./LoginPg.module.scss";

function Login() {
  const history = useHistory();

  const {
    signUpStatus,
    setSignUpStatus,
    currentUser,
    setCurrentUser,
    cerror,
    setCerror,
  } = useContext(LoginContext);

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
        console.log("55555555555555555");
        console.log("fffffffffffffffffffffff");
        if (err) {
          console.log("err err err err err");

          console.log(err);
          setCerror(err);
        } else {
          setCerror("");
          console.log("result.data result.data result.data result.data");
          console.log(result.data);

          // setSignUpStatus(false);
          setCurrentUser(result.data);

          // if (result.data.firstTime) {
          //   history.push("/");
          // }
        }
      });
    } else {
      setCerror("You are missing some credentials");
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

          {signUpStatus && <h2>Sign up success</h2>}
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
          </form>
          <button className={styles.loginButton} onClick={handleLogin}>
            Login
          </button>
        </div>
        <div>
          <p className={styles.noAccount}>Don't have an account?</p>
          <div className="register">
            <button className={styles.registerButton}>
              <Link className={styles.link} to="/register">
                Register
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
