import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import {
  fetchFeed,
  getFullPostByPostId,
  postRemove,
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
import { getFollowed } from "../../utils/api/people.api";

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

  const newUser = useOnFollowHandle(followState);

  useEffect(() => {
    console.log("666666666666666666");
    console.log("666666666666666666");
    if (newUser) {
      SetFollowState(null);
      setCurrentUser(newUser);
    }
  });

  const history = useHistory();

  useEffect(() => {
    getFollowed((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data);
      }
    });

    if (postId) {
      console.log("777777777777777777777");
      console.log(postId);

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

                  {post.userId === currentUser.id ? (
                    <button
                      onClick={() => {
                        onRemovePost(post.postId);
                      }}
                    >
                      Delete
                    </button>
                  ) : followed.includes(post.userId) ? (
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
