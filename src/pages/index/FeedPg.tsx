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
import { getFollowingUsers, toggleFollowing } from "../../utils/api/people.api";

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
  const [followed, setFollowed] = useState([]) as any;

  // const newUser = useOnFollowHandle(followState);

  // useEffect(() => {
  //   if (newUser) {
  //     SetFollowState(null);
  //     setCurrentUser(newUser);
  //   }
  // });

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
    deletePost(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        const newFeed = _.filter(feed, (p) => p._id !== postId);
        console.log("444444444444444444");
        console.log("444444444444444444");
        console.log(newFeed);

        setFeed(newFeed);
      }
    });
  };

  const onFollowHandle = (followUserId: string) => {
    // SetFollowState({ userId: userId, follow: follow });
    toggleFollowing(followUserId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("88888888888888888888");
        console.log("88888888888888888888");
        console.log(result);

        // followingUserId: "609ac3c7c8442904d4cf818b";
        // userId: "6099dff94ed44209b8b49fb5";
        // _id: "609c64dc439f85859d80c8b5";

        if (result === "followed") {
          setFollowed([
            ...followed,
            { followingUserId: followUserId, userId: currentUser.userId },
          ]);
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
    console.log("FeedPg FeedPg FeedPg: feed, currentUser");
    console.log(feed);
    console.log(currentUser);

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
              <div key={post._id} className={styles.postWrapper}>
                <div className="flex--space-between">
                  <div
                    className="flex"
                    onClick={() => profileRedirect(post.userId)}
                  >
                    <img
                      src={post.avatar}
                      alt=""
                      className={styles.postWrapper__img}
                    />

                    <h4>{post.username}</h4>
                  </div>
                  <h4>{post.createdAt}</h4>

                  {post.userId === currentUser.userId ? (
                    <button
                      onClick={() => {
                        onRemovePost(post._id);
                      }}
                    >
                      Delete
                    </button>
                  ) : // followed.includes(post.userId)
                  checkFollowed(post.userId) ? (
                    <button onClick={() => onFollowHandle(post.userId)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => onFollowHandle(post.userId)}>
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
