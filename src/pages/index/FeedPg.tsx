import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import { fetchFeed, postRemove } from "../../utils/api/posts.api";
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
import { userFollow } from "../../utils/api/people.api";

const FeedPg = (props: any) => {
  const [feed, setFeed] = useState(null) as any;
  const {
    currentUser,
    showModal,
    setShowModal,
    setCerror,
    setCurrentUser,
  } = useContext(LoginContext);

  const history = useHistory();

  useEffect(() => {
    fetchFeed(props.feedPg, currentUser, (err: Error, result: any) => {
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
    console.log("3333333333333333");
    console.log(feed);

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

  // const filterPostProp = (result: any) => {
  //   setFeed(result);
  // };

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
    userFollow(userId, follow, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        let newFollowArr = [];
        if (!follow) {
          console.log("unfollow unfollow");
          console.log(follow);

          newFollowArr = _.filter(currentUser.followed, (f) => f !== userId);
          console.log(newFollowArr);
        } else {
          console.log("follow follow");
          console.log(follow);
          newFollowArr = [...currentUser.followed, userId];
          console.log(newFollowArr);
        }

        const newUser = { ...currentUser, followed: newFollowArr };
        setCurrentUser(newUser);
      }
    });
  };

  if (feed) {
    console.log("ggggggggggggggggggggggg");
    console.log("eeeeeeeeeeeeeeeeeeeeee");
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
