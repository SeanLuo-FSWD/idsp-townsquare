import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import {
  fetchFeed,
  getFullPostByPostId,
  deletePost,
} from "../../utils/api/posts.api";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./FeedPg.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import createPost from "./assets/createPost.svg";
import filter from "./assets/filter.svg";
import townSquareLogo from "./assets/townSquareLogo.svg";
import _ from "lodash";
import Error from "../../components/Error/Error";
import PostModalContent from "./PostModalContent";
import FeedFilterModalContent from "./FeedFilterModalContent";
import { connect } from "react-redux";
import Post from "../../components/Post/Post";
import { useHistory, useParams } from "react-router-dom";
import { getFollowingUsers, toggleFollowing } from "../../utils/api/people.api";
import follow from "./follow.svg";
import deletePostIcon from "./delete.svg";
import unfollow from "./unfollow.svg";
import socket from "../../utils/socketIO.util";

const FeedPg = (props: any) => {
  const { currentUser, showModal, setShowModal, setCerror, cerror } =
    useContext(LoginContext);
  const [feed, setFeed] = useState(null) as any;
  const [followState, SetFollowState] = useState(null) as any;
  const { postId } = useParams() as any;
  const [followed, setFollowed] = useState([]) as any;
  const [showFilter, setShowFilter] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data);
      }
    });

    if (postId) {
      getFullPostByPostId(postId, (err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
          return;
        } else {
          console.log("FeedPg - Single Post - getFullPostByPostId : result");
          console.log(result);

          setFeed([result.data]);
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
    deletePost(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        const newFeed = _.filter(feed, (p) => p._id !== postId);
        setFeed(newFeed);
      }
    });
  };

  const toggleFilterProp = (showState: boolean) => {
    setShowFilter(showState);
  };

  const onFollowHandle = (followUserId: string) => {
    toggleFollowing(followUserId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        if (result.follow_status === "followed") {
          setFollowed([
            ...followed,
            { followingUserId: followUserId, userId: currentUser.userId },
          ]);

          const notification_obj = result.notification_result;

          if (notification_obj) {
            socket.emit("notification", notification_obj);
          }
        } else {
          const new_follow_arr = _.filter(
            followed,
            (f: any) => f.followingUserId !== followUserId
          );

          setFollowed(new_follow_arr);
        }
      }
    });
  };

  function checkFollowed(postUserId: string) {
    const match_follow = _.filter(
      followed,
      (f: any) => f.followingUserId === postUserId
    );
    if (match_follow[0]) {
      return true;
    }

    return false;
  }

  if (feed) {
    return (
      <>
        <SubNav>
          <div className={styles.SubNavWrap}>
            <img className={styles.logo} src={townSquareLogo} />

            <div className={styles.townSquareTitle}>TownSquare</div>
            <img
              className={styles.createPost}
              src={createPost}
              onClick={() => setShowModal("postUpload")}
            />
            <img
              className={styles.filter}
              src={filter}
              onClick={() => setShowFilter(true)}
            />
          </div>
        </SubNav>
        {cerror && <Error message={cerror} />}
        {showFilter ? (
          <FeedFilterModalContent toggleFilterProp={toggleFilterProp} />
        ) : (
          <div className={styles.feedContainer}>
            {/* <Feed feed={feed} /> */}

            {feed.map((post: any) => {
              return (
                <div key={post._id} className={styles.postWrapper}>
                  <div className="flex--space-postNav">
                    <div
                      className={styles.flexpostNav}
                      onClick={() => profileRedirect(post.userId)}
                    >
                      <img
                        src={post.avatar}
                        alt=""
                        className={styles.postWrapper__img}
                      />
                    </div>

                    <div className={styles.flexpostNavDetails}>
                      <div className={styles.uName}>{post.username}</div>
                      <div className={styles.dateInfo}>
                        {new Date(post.createdAt).toDateString()}
                      </div>
                    </div>

                    {post.userId === currentUser.userId ? (
                      <img
                        src={deletePostIcon}
                        className={styles.followUnfollowDelete}
                        onClick={() => {
                          onRemovePost(post._id);
                        }}
                      />
                    ) : checkFollowed(post.userId) ? (
                      <img
                        className={styles.followUnfollowDelete}
                        src={unfollow}
                        onClick={() => onFollowHandle(post.userId)}
                      />
                    ) : (
                      <img
                        className={styles.followUnfollowDelete}
                        src={follow}
                        onClick={() => onFollowHandle(post.userId)}
                      />
                    )}
                  </div>

                  <Post post={post}></Post>
                </div>
              );
            })}
          </div>
        )}

        {showModal
          ? showModal === "postUpload" && (
              <Modal>
                <PostModalContent feed={feed} addPostProp={addPostProp} />
              </Modal>
            )
          : null}

        <Navbar currentPath={window.location.pathname} />
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
