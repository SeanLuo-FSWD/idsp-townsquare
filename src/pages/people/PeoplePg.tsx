import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { fetchPeople } from "../../utils/api/people.api";
import styles from "./peoplePg.module.scss";
import UserGrid from "../../components/Users/UserGrid";
import Error from "../../components/Error/Error";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { connect } from "react-redux";
import Modal from "../../UI/Modal";
import filter from "./filter.svg";
import PeopleFilterModalContent from "./PeopleFilterModalContent";

const PeoplePg = (props: any) => {
  const [people, setPeople] = useState(null);
  const {
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    currentUser,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    fetchPeople(props.peoplePg, currentUser, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPeople(result);
      }
    });
  }, [props.peoplePg]);

  const filterPeopleProp = (result: any) => {
    setPeople(result);
  };

  if (!people) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }
  return (
    <>
      <Navbar currentPath={window.location.pathname} />
      <SubNav className={styles.nav}>
        {/* <div className={styles.header}> */}
        <p>Hi {currentUser.username}! </p>
        <p>Explore your town</p>
        <img src={filter} onClick={() => setShowModal("filter")} />
        {/* </div> */}
      </SubNav>

      <div className={styles.userContainer}>
        <UserGrid people={people} />
      </div>
      {showModal
        ? showModal === "filter" && (
            <Modal>
              <PeopleFilterModalContent filterPostProp={filterPeopleProp} />
            </Modal>
          )
        : null}
    </>
  );
};

// export default PeoplePg;

const mapStateToProps = (state: any) => {
  return {
    peoplePg: state.filterState.peoplePg,
    error: state.filterState.error,
  };
};

export default connect(mapStateToProps)(PeoplePg);
