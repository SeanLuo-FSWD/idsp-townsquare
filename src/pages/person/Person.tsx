import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
} from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import { deletePost } from "../../utils/api/posts.api";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Person.module.scss";
import Post from "../../components/Post/Post";
import _ from "lodash";
import SubNav from "../../components/Navbar/SubNav";
import deleteIcon from "./assets/delete.svg";
import backIcon from "./assets/back.svg";
import chatIconWhite from "./assets/chatIconWhite.svg";
import followIconWhite from "./assets/followIconWhite.svg";
import unfollowIconWhite from "./assets/unfollowWhite.svg";
import {
  doChatUpdate,
  doChatInitialChatGroup,
  doChatIdAdd,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import socket from "../../utils/socketIO.util";
import Error from "../../components/Error/Error";
import { v4 as uuidv4 } from "uuid";
import Spinning from "../../pages/spinning.page";

function Person(props: any) {
  const history = useHistory();
  let { id } = useParams() as any;
  // if (!id) {
  //   id = props.personId;
  // }
  const shared_id = id ? id : props.personId;

  console.log("shared___________id");
  console.log(shared_id);

  const [person, setPerson] = useState(null) as any;
  const [followed, setFollowed] = useState([]) as any;

  const { currentUser, setCerror, cerror } = useContext(LoginContext);

  console.log("------- person shared_id -------");
  console.log(shared_id);

  useEffect(() => {
    getPerson(shared_id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        if (result.data.user) {
          setPerson(result.data);
          const personObj = {
            avatar: result.data.user.avatar,
            userId: result.data.user.userId,
            username: result.data.user.username,
          };
          props.onPropStartChatProp([personObj]);
        } else {
          setPerson("not found");
        }
      }
    });

    props.doChatTypeUpdateProp({ new: false, group: false });

    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data);
      }
    });
    return () => {
      setCerror("");
    };
  }, [shared_id]);

  const onFollowHandle = (followUserId: string) => {
    // SetFollowState({ userId: userId, follow: follow });
    toggleFollowing(followUserId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        if (result.follow_status === "followed") {
          console.log("Person.tsx - followed : result");

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

  const onRemovePost = (postId: string) => {
    deletePost(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        const newFeed = _.filter(person.feed, (p) => p._id !== postId);

        setPerson({
          ...person,
          posts: newFeed,
        });
      }
    });
  };

  function checkFollowed() {
    const match_follow = _.filter(
      followed,
      (f: any) => f.followingUserId === shared_id
    );
    if (match_follow[0]) {
      return true;
    }

    return false;
  }

  if (person) {
    if (person.user) {
      return (
        <div key={uuidv4()} className="pagePadding">
          {!props.personId && (
            <div>
              <Navbar currentPath={window.location.pathname} />
              <SubNav className="flex--space-between">
                <img
                  className="pointer"
                  src={backIcon}
                  onClick={history.goBack}
                />
              </SubNav>
            </div>
          )}
          {cerror && <Error message={cerror} />}
          <div className={styles.postContainer}>
            <div className={styles.personContainer}>
              <img
                className={styles.profileImg}
                src={person.user.avatar}
                alt=""
              />
              <div>
                <div className={styles.infoContainer}>
                  <div className={styles.username}>{person.user.username}</div>
                  <div className={styles.infoContent}>
                    Age: {person.user.age}
                  </div>
                  <div className={styles.infoContent}>
                    Gender: {person.user.gender}
                  </div>
                  <div className={styles.infoContent}>
                    Location: {person.user.location}
                  </div>
                </div>

                {person.user.userId !== currentUser.userId ? (
                  checkFollowed() ? (
                    <button
                      className={styles.followButtons}
                      onClick={() => onFollowHandle(person.user.userId)}
                    >
                      <img
                        className={styles.followUnfollowIcons}
                        src={unfollowIconWhite}
                      />
                      <div>Unfollow</div>
                    </button>
                  ) : (
                    <button
                      className={styles.followButtons}
                      onClick={() => onFollowHandle(person.user.userId)}
                    >
                      <img
                        className={styles.followUnfollowIcons}
                        src={followIconWhite}
                      />
                      <div>Follow</div>
                    </button>
                  )
                ) : null}
              </div>

              {person.user.userId !== currentUser.userId && (
                <button
                  className={styles.followButtons}
                  onClick={() => {
                    history.push(`/chat`);
                  }}
                >
                  <img
                    className={styles.followUnfollowIcons}
                    src={chatIconWhite}
                  />
                  <div>Chat</div>
                </button>
              )}
            </div>

            {person.posts.map((post: any) => {
              return (
                <div key={post._id} className={styles.postWrapper}>
                  <div>
                    <div className={styles.createdAt}>
                      {new Date(post.createdAt).toDateString()}
                      {post.userId === currentUser.userId && (
                        <img
                          src={deleteIcon}
                          className="pointer"
                          onClick={() => {
                            onRemovePost(post._id);
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <Post post={post}></Post>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <>
          <Navbar currentPath={window.location.pathname} />
          <h2 style={{ marginTop: "80px" }}>user profile removed :(</h2>
          <SubNav className="flex--space-between">
            <img className="pointer" src={backIcon} onClick={history.goBack} />
          </SubNav>
        </>
      );
    }
  } else {
    return (
      <>
        {cerror && <Error message={cerror} />}
        <Spinning />
      </>
    );
  }
}

// export default Person;
const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPropStartChatProp: (addedGroup: any) =>
      dispatch(doChatUpdate(addedGroup)),
    onSetInitialChatGroup: (initialChatGroup: any) =>
      dispatch(doChatInitialChatGroup(initialChatGroup)),
    onSetChatIdGroup: (chatId: any) => dispatch(doChatIdAdd(chatId)),
    doChatTypeUpdateProp: (chatType: any) =>
      dispatch(doChatTypeUpdate(chatType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
