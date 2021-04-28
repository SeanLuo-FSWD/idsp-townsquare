import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";
import { register } from "../../utils/api/auth";
import Error from "../../components/Error";

const Register = () => {
  const history = useHistory();
  const [person, setPerson] = useState({ email: "", password: "" });
  const { setSignUpStatus } = useContext(LoginContext);
  const [signUpError, setSignUpError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (person.email && person.password) {
      register(person.email, person.password, (err: Error, result: any) => {
        if (err) {
          console.log(err);
          setSignUpError(err.message);
        } else {
          setSignUpError("");
          setSignUpStatus(true);
          history.push("/");
        }
      });
    }
  };
  return (
    <>
      <article className="form">
        {signUpError && <Error message={signUpError} />}
        <form>
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
          <button type="submit" className="btn" onClick={handleSubmit}>
            Register
          </button>
        </form>
      </article>
    </>
  );
};

export default Register;
