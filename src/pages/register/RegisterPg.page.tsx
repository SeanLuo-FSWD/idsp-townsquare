import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { register } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import styles from "./RegisterPg.module.scss";
import townSquareLogo from "./assets/townSquareLogo.svg";

const Register = () => {
  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setSignUpStatus, setCerror, cerror } = useContext(LoginContext);
  const [registerStatus, setRegisterStatus] = useState(false);
  useEffect(() => {
    return () => {
      setCerror("");
    };
  }, []);
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
      register(user_obj, (err: Error, result: any) => {
        if (err) {
          console.log(err);
          setCerror(err.message);
        } else {
          setSignUpStatus(true);
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
      {cerror && <Error message={cerror} />}
      <div className={styles.card}>
        <div className={styles.backgroundSquare}>
          <br></br>
          <br></br>
          <img
            className={styles.logo}
            id="logo"
            src={townSquareLogo}
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
              <form>
                <div className={"form-control"}>
                  <input
                    className={styles.inputForm}
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Create a username"
                    value={person.username}
                    maxLength={20}
                    onChange={handleChange}
                  />
                  <div className="form-control">
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
          <Link className={styles.backToSignUp} to="/">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
