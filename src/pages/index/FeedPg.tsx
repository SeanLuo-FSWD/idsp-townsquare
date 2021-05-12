import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import { fetchFeed, fetchPost, postRemove } from "../../utils/api/posts.api";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./FeedPg.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import createPost from "./assets/createPost.svg";
import filter from "./assets/filter.svg";
import townSquareLogo from "./assets/townSquareLogo.png";
import _ from "lodash";
import { Filter } from "@material-ui/icons";
import FeedFilter from "../../components/Filter/FeedFilter";
import { v4 as uuidv4 } from "uuid";
import PostModalContent from "./PostModalContent";
import FeedFilterModalContent from "./FeedFilterModalContent";
import { connect } from "react-redux";
import Post from "../../components/Post/Post";
import { useHistory, useParams } from "react-router-dom";
import { useOnFollowHandle } from "../../helper/follow";

const FeedPg = (props: any) => {
  const {
    currentUser,
    showModal,
    setShowModal,
    setCerror,
    setCurrentUser,
  } = useContext(LoginContext);
  const [feed, setFeed] = useState(null) as any;
  const [followState, SetFollowState] = useState(null) as any;
  const { postId } = useParams() as any;

  const newUser = useOnFollowHandle(followState);

  useEffect(() => {
    if (newUser) {
      SetFollowState(null);
      setCurrentUser(newUser);
    }
  });

  const history = useHistory();

  useEffect(() => {
    if (postId) {
      fetchPost(postId, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
          return;
        } else {
          setFeed(result);
          return;
        }
      });
    } else {
      fetchFeed(props.feedPg, currentUser, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
          return;
        } else {
          setFeed(result);
          return;
        }
      });
    }
  }, [props.feedPg]);

  const addPostProp = (result: any) => {
    setFeed(_.concat(result, feed));
  };

  function profileRedirect(userId: string) {
    history.push(`/person/${userId}`);
  }

  const onRemovePost = (postId: string) => {
    postRemove(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        const newFeed = _.filter(feed, (p) => p.id != postId);
        setFeed(newFeed);
      }
    });
  };

  const onFollowHandle = (userId: string, follow: boolean) => {
    SetFollowState({ userId: userId, follow: follow });
  };

  if (feed) {
    return (
      <>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <div className={`flex--space-between ${styles.SubNavWrap}`}>
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
        <div className={styles.feedContainer}>
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

                  {post.userId === currentUser.id ? (
                    <button
                      onClick={() => {
                        onRemovePost(post.id);
                      }}
                    >
                      Delete
                    </button>
                  ) : currentUser.followed.includes(post.userId) ? (
                    <button onClick={() => onFollowHandle(post.userId, false)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => onFollowHandle(post.userId, true)}>
                      Follow
                    </button>
                  )}
                </div>

                <Post post={post}></Post>
              </div>
            );
          })}
        </div>
        {showModal ? (
          showModal === "postUpload" ? (
            <Modal>
              <PostModalContent feed={feed} addPostProp={addPostProp} />
            </Modal>
          ) : (
            <Modal>
              <FeedFilterModalContent />
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
