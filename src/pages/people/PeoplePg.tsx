import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { fetchPeople } from "../../utils/api/people.api";
import UserGrid from "../../components/Users/UserGrid";
import Error from "../../components/Error/Error";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./PeoplePg.module.scss";
import { connect } from "react-redux";
import Modal from "../../UI/Modal";
import PeopleFilterModalContent from "./PeopleFilterModalContent";

const PeoplePg = (props: any) => {
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
    fetchPeople(props.peoplePg, (err: Error, result: any) => {
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
      <SubNav>
        <div className={`flex--space-around ${styles.SubNavWrap}`}>
          <h2>{currentUser.username}</h2>
          <button
            className={`${props.peoplePg.applied ? styles.applied : ""}`}
            onClick={() => setShowModal("filter")}
          >
            Filter
          </button>
        </div>
      </SubNav>

      <UserGrid people={people} />
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
