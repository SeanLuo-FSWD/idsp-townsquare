import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { register } from "../../utils/api/auth";
import Error from "../../components/Error/Error";

const Register = () => {
  const history = useHistory();
  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { setSignUpStatus } = useContext(LoginContext);
  const [signUpError, setSignUpError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          setSignUpError(err.message);
        } else {
          setSignUpError("");
          setSignUpStatus(true);
          console.log("registration result message");
          console.log(result.data.message);

          history.push("/");
        }
      });
    } else {
      setSignUpError("You are missing some credentials");
    }
  };
  return (
    <>
      <article className="form">
        {signUpError && <Error message={signUpError} />}
        <form>
          <div className="form-control">
            <label htmlFor="username">username : </label>
            <input
              type="username"
              id="username"
              name="username"
              value={person.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id="email"
              name="email"
              value={person.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">password : </label>
            <input
              type="password"
              id="password"
              name="password"
              value={person.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" onClick={handleRegister}>
            Register
          </button>
        </form>
      </article>
    </>
  );
};

export default Register;
