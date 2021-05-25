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
import filter from "./filter.svg";
import townSquareLogo from "./assets/townSquareLogo.svg";
import detailedViewIcon from "./assets/detailedView.svg";
import PeopleFilterModalContent from "./PeopleFilterModalContent";

const PeoplePg = (props: any) => {
  const [people, setPeople] = useState(null);
  const [detailView, setDetailView] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const { cerror, currentUser, setCerror } = useContext(LoginContext);

  useEffect(() => {
    return () => {
      setCerror("");
    };
  }, []);

  useEffect(() => {
    getPeople(props.peoplePg, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPeople(result);
      }
    });
  }, [props.peoplePg]);

  const toggleFilterProp = (showState: boolean) => {
    setShowFilter(showState);
  };

  if (!people) {
    return (
      <>
        <div className="pagePadding">
          {cerror && <Error message={cerror} />}
          <h2>Loading</h2>
        </div>
      </>
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
        <img
          className={`pointer ${styles.userIcons}`}
          onClick={() => {
            setDetailView(!detailView);
          }}
          src={detailedViewIcon}
        />
        <img
          className={`pointer ${styles.userIcons}`}
          src={filter}
          onClick={() => setShowFilter(true)}
        />
      </SubNav>
      {cerror && <Error message={cerror} />}
      {showFilter ? (
        <PeopleFilterModalContent toggleFilterProp={toggleFilterProp} />
      ) : detailView ? (
        <div className={styles2.detailedViewContainer}>
          <UserDetail people={people} />
        </div>
      ) : (
        <div className={styles.userContainer}>
          <UserGrid people={people} />
        </div>
      )}
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
