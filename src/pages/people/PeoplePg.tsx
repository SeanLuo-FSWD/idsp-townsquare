import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { fetchPeople } from "../../utils/api/people.api";
import styles from "./peoplePg.module.scss"
import UserGrid from "../../components/Users/UserGrid";
import Error from "../../components/Error/Error";
import Navbar from "../../components/Navbar/Navbar";

function PeoplePg() {
  const [people, setPeople] = useState(null);
  const {
    username,
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    cerror,
    currentUser,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    fetchPeople((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPeople(result);
      }
    });
  }, []);

  if (!people) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <>
      <Navbar currentPath={window.location.pathname} />
      <div className={styles.header}>
        <p>Explore users near you!</p>
        <p>Welcome: {currentUser.username} </p>
        
      </div>

      <div className={styles.userContainer}>
        <UserGrid people={people} />
      </div>

    </>
  );
}

export default PeoplePg;
