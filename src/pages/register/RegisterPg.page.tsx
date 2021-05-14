import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { register } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import styles from "./RegisterPg.module.scss";

const Register = () => {
  const history = useHistory();

  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setSignUpStatus, setCerror } = useContext(LoginContext);
  const [signUpError, setSignUpError] = useState("");
  const [registerStatus, setRegisterStatus] = useState(false);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleRegister = (e: any) => {
    e.preventDefault();
    if (person.email && person.password && person.username) {
      const user_obj = {
        username: person.username,
        email: person.email,
        password: person.password,
      };
      register(user_obj, (err: any, result: any) => {
        if (err) {
          console.log(err);
          setCerror(err);
        } else {
          setSignUpStatus(true);
          console.log("registration result message");
          console.log(result.data.message);
          setRegisterStatus(true);

          // history.push("/");
        }
      });
    } else {
      setCerror("You are missing some credentials");
    }
  };
  return (
    <>
      <div className={styles.card}>
        <div className={styles.backgroundSquare}>
          <br></br>
          <br></br>
          <img
            className={styles.logo}
            id="logo"
            src="https://i.imgur.com/0ldmkwI.png"
            alt="TownSquareLogo"
          ></img>
          <h1 className="signUpTitle">Sign Up</h1>
          {registerStatus ? (
            <div>
              <h1>
                Registration success, please check your email for verification
                link
              </h1>
            </div>
          ) : (
            <article className="form">
              {signUpError && <Error message={signUpError} />}
              <form>
                <div className={"form-control"}>
                    {/* <label  className={styles.labelText} htmlFor="username">username : </label> */}
                    <input
                      className={styles.inputForm}
                      type="username"
                      id="username"
                      name="username"
                      placeholder="Create a username"
                      value={person.username}
                      onChange={handleChange}
                    />
                  <div className="form-control">
                    {/* <label className={styles.labelText} htmlFor="email">Email : </label> */}
                    <input
                      className={styles.inputForm}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Please enter your email"
                      value={person.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-control">
                    {/* <label className={styles.labelText} htmlFor="password">Password : </label> */}
                    <input
                      className={styles.inputForm}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Create a password"
                      value={person.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </form>
              <button
                  className={styles.registerButton}
                  type="submit"
                  onClick={handleRegister}
                >
                  Sign Up
                </button>
            </article>
          )}
        </div>
        <div className={styles.loginButtonContainer}>
          <p className={styles.alreadyHaveAccount}>Already have an account?</p>
          {/* <button className={styles.backToSignUp}>Log In</button> */}
          <Link className={styles.backToSignUp} to="/">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
