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
import Badge from "@material-ui/core/Badge";
import _ from "lodash";
import MenuIcon from "@material-ui/icons/Menu";

const PeoplePg = (props: any) => {
  const [people, setPeople] = useState(null) as any;
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
        const sortedCurrentUser = _.sortBy(result, ({ _id }) =>
          _id === currentUser.userId ? 0 : 1
        );

        console.log(sortedCurrentUser);

        setPeople(sortedCurrentUser);
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
      <div className="pagePadding">
        <Navbar currentPath={window.location.pathname} />
        <SubNav className={styles.nav}>
          {detailView ? (
            <img
              className={`pointer ${styles.userIcons}`}
              onClick={() => {
                setDetailView(false);
              }}
              src={detailedViewIcon}
            />
          ) : (
            <MenuIcon
              className={`pointer ${styles.userIcons}`}
              onClick={() => {
                setDetailView(true);
              }}
            />
          )}

          {props.peoplePg.applied ? (
            <Badge
              color="primary"
              badgeContent=" "
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              className="pointer"
              onClick={() => setShowFilter(true)}
            >
              <img
                className={`pointer ${styles.userIcons}`}
                src={filter}
                onClick={() => setShowFilter(true)}
              />
            </Badge>
          ) : (
            <img
              className={`pointer ${styles.userIcons}`}
              src={filter}
              onClick={() => setShowFilter(true)}
            />
          )}
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
      </div>
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
