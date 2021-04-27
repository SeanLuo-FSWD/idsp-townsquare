import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginContext } from "../../store/context/LoginContext";

const Register = () => {
  const history = useHistory();
  const [person, setPerson] = useState({ email: "", password: "" });
  const { setSignUpStatus } = useContext(LoginContext);

  // xlr_controlled_input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (person.email && person.password) {
      // First handle post api here.
      // setPerson({ email: "", password: "" });
      setSignUpStatus(true);
      history.push("/");
    }
  };
  return (
    <>
      <article className="form">
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
