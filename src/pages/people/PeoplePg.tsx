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
import townSquareLogo from "./assets/townSquareLogo.png"
import detailedViewIcon from "./assets/detailedView.svg";
import PeopleFilterModalContent from "./PeopleFilterModalContent";
import DetailFollow from "../../components/Users/DetailFollow";

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
        <div className={styles.logoAndGreeting}>
          <img className={styles.townSquareLogo} src={townSquareLogo}/>
          <div>Hi {currentUser.username}! </div>
        </div>
        

        <div className={styles.subNavIcons}>
          <img
          className={styles.userIcons}
          onClick={() => { setDetailView(!detailView);}}
          src={detailedViewIcon}/>
          {/* {detailView ? <span>Grid view</span> : <span>Detail view</span>} */}
<<<<<<< HEAD
        </button>
        <div className={styles.filterIcon}>
          <img
            className={styles.userIcons}
            src={filter}
            onClick={() => setShowModal("filter")}
          />
=======

          <img
          className={styles.userIcons}
          src={filter}
          onClick={() => setShowModal("filter")}/>

>>>>>>> a4ce699f09614e47cd54432c74a54c3122684e27
        </div>
        
      </SubNav>

      {detailView ? (
        <div className={styles2.detailedViewContainer}>
          <UserDetail people={people}>
            {/* <UserDetail>
            {() => {
              return <DetailFollow people={people} />;
            }} */}

            {/* {(person: any, onFollowHandleProp: any, followed: any) => {
              return (
                <DetailFollow
                  person={person}
                  onFollowHandleProp={onFollowHandleProp}
                  followed={followed}
                />
              );
            }} */}
          </UserDetail>
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
