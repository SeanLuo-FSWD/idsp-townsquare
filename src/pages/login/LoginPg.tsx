import React, { useContext, useState } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { login } from "../../utils/api/auth.api";
import Error from "../../components/Error/Error";
import style from "./Login.module.scss";

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
    <div>
      <img
        id="logo"
        src="https://i.imgur.com/0ldmkwI.png"
        alt="TownSquareLogo"
      ></img>
      <h1 className="townSquareTitle">TownSquare</h1>
      <h2>Login</h2>

      <h3>For default user, login with:</h3>
      <h4>email: bob@bob.com</h4>
      <h4>password: bob@bob.com</h4>

      {signUpStatus && <h2>Sign up success</h2>}
      {loginError && <Error message={loginError} />}
      {/* <h4>bob@bob.com</h4> */}
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
        <br></br>
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
        <br></br>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <div>
          <p>Don't have an account?</p>
          <br></br>
          <div className="register">
            <button>
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
