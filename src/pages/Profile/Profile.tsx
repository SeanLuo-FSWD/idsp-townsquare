import React, { useState, useEffect, useContext } from "react";
import { editProfile } from "../../utils/api/auth.api";
import { fetchPerson } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import Navbar from "../../components/Navbar/Navbar";

function Profile() {
  const [initPerson, setInitPerson] = useState(null) as any;
  const [person, setPerson] = useState({
    userName: "bob",
    age: 5,
  }) as any;
  //   const [pwRetype, setPwRetype] = useState(false);

  const {
    userId,
    username,
    showModal,
    setShowModal,
    setUsername,
    setCurrentUser,
    modalProps,
    currentUser,
    setModalProps,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    fetchPerson(currentUser.id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        // setPerson(result.data); // Uncontrolled
        console.log("null");
      }
    });
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value }); //controlled
  };

  function handleProfileEdit(e: any) {
    e.preventDefault();
    editProfile(person, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        // return the current user object
        setUsername(result.username);
        setCurrentUser({
          username: "bob",
          email: "bob@bob.com",
          img:
            "https://static.wikia.nocookie.net/spongebob/images/d/d7/SpongeBob_stock_art.png/revision/latest?cb=20190921125147",
          age: 5,
          sex: "male",
        });

        return result;
      }
    });
    return;
  }

  if (person) {
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
