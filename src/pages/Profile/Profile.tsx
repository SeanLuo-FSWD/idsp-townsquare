import React, { useState, useEffect, useContext } from "react";
import { editProfile } from "../../utils/api/auth.api";
import { fetchPerson } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import Navbar from "../../components/Navbar/Navbar";

function Profile() {
  const [initPerson, setInitPerson] = useState(null) as any;
  const [person, setPerson] = useState({}) as any;
  //   const [pwRetype, setPwRetype] = useState(false);

  const {
    userId,
    username,
    showModal,
    setShowModal,
    setUsername,
    modalProps,
    setModalProps,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    fetchPerson(userId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("sssssssssssssssssssssssss");
        console.log(result.data);

        setPerson(result.data);
      }
    });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  function handleProfileEdit(e: any) {
    e.preventDefault();
    console.log("--------------");
    console.log(person);

    editProfile(person, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(result);
        setUsername(result.username);

        return result;
      }
    });
    return;
  }

  if (person) {
    console.log("fffffffffffffffffffffff");
    console.log(person);

    return (
      <div>
        <Navbar currentPath={window.location.pathname} />

        <h2>Update Profile</h2>
        <form>
          <div className="form-control">
            <label htmlFor="username">username : </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Edit username"
              value={person.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="age">age : </label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Edit age"
              value={person.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="location">location : </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Edit location"
              value={person.location}
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
              placeholder="enter new password"
              value={person.password}
              onChange={handleChange}
            />
            <input
              type="password"
              id="password Retype"
              name="password Retype"
              placeholder="Retype your password"
              value={person.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" onClick={handleProfileEdit}>
            Submit Edit
          </button>
        </form>
      </div>
    );
  }
  return <h2>Loading</h2>;
}

export default Profile;
