import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { getPeople } from "../../utils/api/people.api";
import styles from "./peoplePg.module.scss";
import styles2 from "./detailedView.module.scss";
import UserGrid from "../../components/Users/UserGrid";
import UserDetail from "../../components/Users/UserDetail";
import Error from "../../components/Error/Error";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { connect } from "react-redux";
import Modal from "../../UI/Modal";
import filter from "./filter.svg";
import detailedViewIcon from "./assets/detailedView.svg";
import PeopleFilterModalContent from "./PeopleFilterModalContent";

const PeoplePg = (props: any) => {
  const [people, setPeople] = useState(null);
  const [detailView, setDetailView] = useState(false);

  const {
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    currentUser,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    getPeople(props.peoplePg, (err: Error, result: any) => {
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
        <div>Hi {currentUser.username}! </div>
        <div>Explore users near you!</div>

        <button
          className={styles.detailedViewToggle}
          onClick={() => {
            setDetailView(!detailView);
          }}
        >
          <img src={detailedViewIcon}></img>
          {/* {detailView ? <span>Grid view</span> : <span>Detail view</span>} */}
        </button>
        <div className={styles.filterIcon}>
          <img src={filter} onClick={() => setShowModal("filter")} />
        </div>
      </SubNav>

      {detailView ? (
        <div className={styles2.detailedViewContainer}>
          <UserDetail people={people} />
        </div>
      ) : (
        <div className={styles.userContainer}>
          <UserGrid people={people} />
        </div>
      )}

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
