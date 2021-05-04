import React, { useState } from "react";
import styles from "./SubNav.module.scss";

function FeedFilter() {
  const [person, setPerson] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };
  return (
    <div>
      <h2>Feed Filter</h2>
      <form>
        <div className="form-control">
          <label htmlFor="username">username : </label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Create a username"
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
            placeholder="Please enter your email"
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
            placeholder="Create a password"
            value={person.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default FeedFilter;
