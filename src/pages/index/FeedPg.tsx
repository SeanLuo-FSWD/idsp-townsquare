import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import { fetchFeed } from "../../utils/api/posts.api";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./FeedPg.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import _ from "lodash";
import { Filter } from "@material-ui/icons";
import FeedFilter from "../../components/Filter/FeedFilter";
import { v4 as uuidv4 } from "uuid";
import PostModalContent from "./PostModalContent";
import FeedFilterModalContent from "./FeedFilterModalContent";
import { connect } from "react-redux";

const FeedPg = (props: any) => {
  const [feed, setFeed] = useState(null) as any;
  const { currentUser, showModal, setShowModal, setCerror } = useContext(
    LoginContext
  );

  useEffect(() => {
    fetchFeed(props.feedFilter, (err: Error, result: any) => {
      console.log("SHOULD BE CALLEEEEEED");

      if (err) {
        setCerror(err.message);
      } else {
        console.log("FEED OBJ FROM FEEDPG");
        console.log(result);

        setFeed(result);
      }
    });
  }, [props.feedFilter]);

  const addPostProp = (result: any) => {
    setFeed(_.concat(result, feed));
  };

  const filterPostProp = (result: any) => {
    setFeed(result);
  };

  return (
    <>
      <Navbar currentPath={window.location.pathname} />
      <SubNav>
        <div className={`flex--space-around ${styles.SubNavWrap}`}>
          <h2>{currentUser.username}</h2>
          <button onClick={() => setShowModal("postUpload")}>
            Upload Post
          </button>

          <button onClick={() => setShowModal("filter")}>Filter</button>
        </div>
      </SubNav>
      <div>
        <Feed feed={feed} />
      </div>
      {showModal ? (
        showModal == "postUpload" ? (
          <Modal>
            <PostModalContent addPostProp={addPostProp} />
          </Modal>
        ) : (
          <Modal>
            <FeedFilterModalContent filterPostProp={filterPostProp} />
          </Modal>
        )
      ) : null}
    </>
  );
};

// export default FeedPg;

const mapStateToProps = (state: any) => {
  const errState = state.filterReducer ? state.filterReducer.error : null;
  return {
    feedFilter: state.filterState,
    error: errState,
  };
};

export default connect(mapStateToProps)(FeedPg);
