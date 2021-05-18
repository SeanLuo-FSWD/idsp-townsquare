import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
} from "../../utils/api/people.api";
import Error from "../../components/Error/Error";
import Feed from "../../components/Feed/Feed";
import { LoginContext } from "../../store/context/LoginContext";
import { deletePost } from "../../utils/api/posts.api";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Person.module.scss";
import Post from "../../components/Post/Post";
import _ from "lodash";
import SubNav from "../../components/Navbar/SubNav";
import { useOnFollowHandle } from "../../helper/follow";
import deleteIcon from "./assets/delete.svg";
import backIcon from "./assets/back.svg";
import GroupChat from "../GroupChatPg/GroupChat";
import { doChatUpdate } from "../../store/redux/actions/chat_act";

function Person(props: any) {
  const history = useHistory();
  let { id } = useParams() as any;
  if (!id) {
    id = props.personId; // Use passed in prop id, if no param.
  }

  const [person, setPerson] = useState(null) as any;
  const [followed, setFollowed] = useState([]) as any;
  const [addedGroup, setAddedGroup] = useState([]) as any;

  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  useEffect(() => {
    getPerson(id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPerson(result.data);
      }
    });

    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data); //all the users CURRENT guy follow.
      }
    });
  }, []);

  useEffect(() => {
    if (person) {
      const personObj = {
        avatar: person.user.avatar,
        _id: person.user.userId,
        username: person.user.username,
      };
      setAddedGroup([personObj]);
    }
  }, [person]);

  const onFollowHandle = (followUserId: string) => {
    // SetFollowState({ userId: userId, follow: follow });
    toggleFollowing(followUserId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
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

  //  if (toggleChat) {
  //    const p: any = {
  //      avatar: person.user.avatar,
  //      username: person.user.username,
  //      _id: person.user.userId,
  //    };
  //    return <GroupChat addedGroup={[p]} />;
  //  } else

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
                  <button onClick={() => onFollowHandle(person.user.userId)}>
                    Unfollow
                  </button>
                ) : (
                  <button onClick={() => onFollowHandle(person.user.userId)}>
                    Follow
                  </button>
                )
              ) : null}

              {/* <button onClick={() => setToggleChat(true)}>Chat</button> */}

              <button
                onClick={() => {
                  props.onPropStartChatProp(addedGroup);
                  history.push(`/chat`);
                }}
              >
                Chat
              </button>
            </SubNav>
          </div>
        )}

        {/* <Link to="/users" className="btn">
          Back
        </Link> */}
        <div className={styles.personContainer}>
          <img className={styles.profileImg} src={person.user.avatar} alt="" />
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
                <p className={styles.createdAt}>
                  {new Date(post.createdAt).toDateString()}
                  {post.userId === currentUser.userId && (
                    <img
                      src={deleteIcon}
                      onClick={() => {
                        onRemovePost(post._id);
                      }}
                    />
                  )}
                </p>
              </div>

              <Post post={post}></Post>
            </div>
          );
        })}
        {/* <Feed feed={person.feed} /> */}
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
      dispatch(doChatUpdate(addedGroup, "private")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Person);
