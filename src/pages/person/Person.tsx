import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import followIcon from "./assets/follow.svg";
import unfollowIcon from "./assets/unfollow.svg";

function Person() {
  const history = useHistory();
  const { id } = useParams() as any;
  const [person, setPerson] = useState(null) as any;
  const [followed, setFollowed] = useState([]) as any;

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

  // const onRemovePost = (postId: string) => {
  //   deletePost(postId, (err: Error, result: any) => {
  //     if (err) {
  //       setCerror(err.message);
  //     } else {
  //       console.log("why not called on callback?????");

  //       const newFeed = _.filter(person.feed, (p) => p._id != postId);
  //       const newPerson = {
  //         ...person,
  //         feed: newFeed,
  //       };
  //       console.log("1111111111111111111111");
  //       setPerson({
  //         ...person,
  //         feed: newFeed,
  //       });
  //     }
  //   });
  // };

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

  // const onFollowHandle = (userId: string, follow: boolean) => {
  //   userFollow(userId, follow, (err: Error, result: any) => {
  //     if (err) {
  //       setCerror(err.message);
  //     } else {
  //       let newFollowArr = [];
  //       if (!follow) {
  //         console.log("unfollow unfollow");
  //         console.log(follow);

  //         newFollowArr = _.filter(currentUser.followed, (f) => f !== userId);
  //         console.log(newFollowArr);
  //       } else {
  //         console.log("follow follow");
  //         console.log(follow);
  //         newFollowArr = [...currentUser.followed, userId];
  //         console.log(newFollowArr);
  //       }

  //       const newUser = { ...currentUser, followed: newFollowArr };
  //       setCurrentUser(newUser);
  //     }
  //   });
  // };

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
        <Navbar currentPath={window.location.pathname} />
        <SubNav className="flex--space-between">
          <img src={backIcon} onClick={history.goBack} />
          {/* {person.user.userId !== currentUser.id ? (
            currentUser.followed.includes(person.user.id) ? (
              <button onClick={() => onFollowHandle(person.id, false)}>
                Unfollow
              </button>
            ) : (
              <img src={followIcon} onClick={() => onFollowHandle(person.id, true)}/>
            )
          ) : null} */}
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
        </SubNav>
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

// const mapStateToProps = (state: any) => {
//   console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
//   return {
//     user: getUser(state.usersState, userId),
//     userFeed: getUserFeed(state.usersState),
//     error: state.usersState.error,
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onPersonFeed: (id: string) => dispatch(doPersonFeed(id)),
//   };
// };

// export default connect(null, mapDispatchToProps)(Person);

export default Person;
