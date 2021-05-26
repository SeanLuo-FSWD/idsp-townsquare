import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { login } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import styles from "./LoginPg.module.scss";
import townSquareLogo from "./assets/townSquareLogo.svg";
import { authenticate } from "../../utils/api/auth.api";

function Login() {
  const { setCurrentUser, cerror, setCerror } = useContext(LoginContext);
  const [authCalled, setAuthCalled] = useState(false);
  const [person, setPerson] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    authenticate((err: Error, result: any) => {
      if (err) {
        setCurrentUser(null);
      } else {
        setCurrentUser(result.data);
      }
      setAuthCalled(true);
    });

    return () => {
      setCerror("");
    };
  }, []);
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
          console.log("1111111111111111111111");
          console.log(err.message);
          console.log(err);

          setCerror(err.message);
        } else {
          setCerror("");
          setCurrentUser(result.data);
        }
      });
    } else {
      setCerror("You are missing some credentials");
    }
  };

  if (authCalled) {
    return (
      <div className={styles.card}>
        <div className={styles.container}>
          <div>
            <img
              className={styles.logo}
              src={townSquareLogo}
              alt="TownSquareLogo"
            ></img>
            <h1 className="townSquareTitle">TownSquare</h1>

            <form className={styles.loginForm}>
              <label htmlFor="uname"></label>
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
              <label htmlFor="psw"></label>
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
            {cerror && <Error message={cerror} />}
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
  } else {
    return <h2>Authenticating</h2>;
  }
}

export default Login;
