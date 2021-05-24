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
import {
  doChatUpdate,
  doChatInitialChatGroup,
  doChatIdAdd,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import followBlackIcon from "./assets/followBlack.svg";
import unfollowBlackIcon from "./assets/unfollowBlack.svg";
import socket from "../../utils/socketIO.util";
import Error from "../../components/Error/Error";

function Person(props: any) {
  const history = useHistory();
  let { id } = useParams() as any;
  if (!id) {
    id = props.personId; // Use passed in prop id, if no param.
  }

  const [person, setPerson] = useState(null) as any;
  const [followed, setFollowed] = useState([]) as any;
  const [addedGroup, setAddedGroup] = useState([]) as any;

  const { currentUser, setCerror, cerror } = useContext(LoginContext);

  console.log("------- person id -------");
  console.log(id);

  useEffect(() => {
    console.log("person [] person [] person [] person [] person");

    getPerson(id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPerson(result.data);
        const personObj = {
          avatar: result.data.user.avatar,
          userId: result.data.user.userId,
          username: result.data.user.username,
        };
        props.onSetInitialChatGroup([personObj]);
      }
    });

    props.doChatTypeUpdateProp({ new: false, group: false });

    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data); //all the users CURRENT guy follow.
      }
    });
  }, []);

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
      (f: any) => f.followingUserId === id
    );
    if (match_follow[0]) {
      return true;
    }

    return false;
  }

  if (person) {
    return (
      <div>
        {!props.personId && (
          <div>
            <Navbar currentPath={window.location.pathname} />
            <SubNav className="flex--space-between">
              <img src={backIcon} onClick={history.goBack} />
              {person.user.userId !== currentUser.userId ? (
                checkFollowed() ? (
                  <button
                    className={styles.followButtons}
                    onClick={() => onFollowHandle(person.user.userId)}
                  >
                    Unfollow
                    <img
                      className={styles.followUnfollowIcons}
                      src={unfollowBlackIcon}
                    />
                  </button>
                ) : (
                  <button
                    className={styles.followButtons}
                    onClick={() => onFollowHandle(person.user.userId)}
                  >
                    Follow
                    <img
                      className={styles.followUnfollowIcons}
                      src={followBlackIcon}
                    />
                  </button>
                )
              ) : null}

              <button
                className={styles.followButtons}
                onClick={() => {
                  history.push(`/chat`);
                }}
              >
                Chat
              </button>
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
              <p>Username: {person.user.username}</p>
              <p>Age: {person.user.age}</p>
              <p>Gender: {person.user.gender}</p>
              <p>Location: {person.user.location}</p>
            </div>
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
  }
  return <div>Loading</div>;
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
