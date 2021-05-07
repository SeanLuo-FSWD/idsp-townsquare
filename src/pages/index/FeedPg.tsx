import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import { fetchFeed } from "../../utils/api/posts.api";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./FeedPg.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import createPost from "./createPost.svg";
import filter from "./filter.svg";
import townSquareLogo from "./townSquareLogo.png";
import _ from "lodash";
import { Filter } from "@material-ui/icons";
import FeedFilter from "../../components/Filter/FeedFilter";
import { v4 as uuidv4 } from "uuid";
import PostModalContent from "./PostModalContent";
import FeedFilterModalContent from "./FeedFilterModalContent";
import { connect } from "react-redux";
import Post from "../../components/Post/Post";
import { useHistory } from "react-router-dom";

const FeedPg = (props: any) => {
  const [feed, setFeed] = useState(null) as any;
  const { currentUser, showModal, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const history = useHistory();

  useEffect(() => {
    console.log("FeedPg props.feedPg props.feedPg");
    console.log(props.feedPg);

    fetchFeed(props.feedPg, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
        return;
      } else {
        setFeed(result);
        return;
      }
    });
  }, [props.feedPg]);

  const addPostProp = (result: any) => {
    console.log("addPostProp called?");

    setFeed(_.concat(result, feed));
    // fetchFeed(props.feedPg, (err: Error, result: any) => {
    //   if (err) {
    //     setCerror(err.message);
    //     return;
    //   } else {
    //     setFeed(result);
    //     return;
    //   }
    // });
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
          <div className={`flex--space-subNav ${styles.SubNavWrap}`}>
            <div className={styles.username}>
              <img className={styles.logo} src={townSquareLogo} />
            </div>

            <img
              className={styles.createPost}
              src={createPost}
              onClick={() => setShowModal("postUpload")}
            />
            <img src={filter} onClick={() => setShowModal("filter")} />
          </div>
        </SubNav>
        <div>
          {/* <Feed feed={feed} /> */}

          {feed.map((post: any) => {
            return (
              <div key={post.id} className={styles.postWrapper}>
                {/* <div className="flex--space-between">
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
                </div> */}
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
              <FeedFilterModalContent filterPostProp={filterPostProp} />
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
  return {
    feedPg: state.filterState.feedPg,
    error: state.filterState.error,
  };
};

export default connect(mapStateToProps)(FeedPg);
