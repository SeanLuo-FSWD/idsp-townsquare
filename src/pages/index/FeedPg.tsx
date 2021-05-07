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
import Post from "../../components/Post/Post";
import { useHistory } from "react-router-dom";
import {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doFilterUpdate,
  doFilterRemove,
} from "../../store/redux/actions/filter_act";
import FilterModalContent from "./FilterModalContent";

const FeedPg = (props: any) => {
  const [feed, setFeed] = useState(null) as any;
  const { currentUser, showModal, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const history = useHistory();

  useEffect(() => {
    console.log("FeedPg props.feedFilter.feed props.feedFilter.feed");
    console.log(props.feedFilter.feed);

    fetchFeed(props.feedFilter.feed, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFeed(result);
      }
    });
  }, [props.feedFilter.feed]);

  const addPostProp = (result: any) => {
    setFeed(_.concat(result, feed));
  };

  const filterPostProp = (result: any) => {
    setFeed(result);
  };

  function profileRedirect(userId: string) {
    history.push(`/person/${userId}`);
  }

  if (feed) {
    return (
      <>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <div className={`flex--space-around ${styles.SubNavWrap}`}>
            <h2>{currentUser.username}</h2>
            <button onClick={() => setShowModal("postUpload")}>
              Upload Post
            </button>

            <button
              className={props.feedFilter.feed && styles.applied}
              onClick={() => setShowModal("filter")}
            >
              Filter
            </button>
          </div>
        </SubNav>
        <div>
          {/* <Feed feed={feed} /> */}

          {feed.map((post: any) => {
            return (
              <div key={post.id} className={styles.postWrapper}>
                <div className="flex--space-between">
                  <div
                    className="flex"
                    onClick={() => profileRedirect(post.userId)}
                  >
                    <img
                      src={post.user.img}
                      alt=""
                      className={styles.postWrapper__img}
                    />
                    <h4>{post.username}</h4>
                  </div>
                  <h4>{post.createdAt}</h4>
                </div>
                <Post post={post}></Post>
              </div>
            );
          })}
        </div>
        {showModal ? (
          showModal === "postUpload" ? (
            <Modal>
              <PostModalContent addPostProp={addPostProp} />
            </Modal>
          ) : (
            <Modal>
              <FilterModalContent />
              {/* <FeedFilterModalContent filterPostProp={filterPostProp} /> */}
            </Modal>
          )
        ) : null}
      </>
    );
  } else {
    return <h2>Loading</h2>;
  }
};

// export default FeedPg;

const mapStateToProps = (state: any) => {
  // const errState = state.filterState ? state.filterState.error : null;
  return {
    feedFilter: state.filterState.filt,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFilterSubmit: (filter_obj: any) => dispatch(doFilterUpdate(filter_obj)),

    onFilterRemove: () => dispatch(doFilterRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPg);
