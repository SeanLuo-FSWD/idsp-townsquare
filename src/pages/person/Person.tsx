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
import followBlackIcon from "./assets/followBlack.svg";
import unfollowBlackIcon from "./assets/unfollowBlack.svg";

function Person() {
  const history = useHistory();
  const { id } = useParams() as any;
  const [person, setPerson] = useState(null) as any;
  const [followed, setFollowed] = useState([]) as any;

  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  // const newUser = useOnFollowHandle(followed);

  useEffect(() => {
    // if (newUser) {
    //   console.log("if follow state is set, user is...");
    //   console.log(newUser);
    //   // setCurrentUser(newUser);
    //   setFollowed(null);
    //   setCurrentUser(newUser);
    // }
    console.log("Person Person Person Person");
  });

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
        console.log("3333333333333333");
        console.log("setFollowed");
        console.log(result.data);
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
      console.log("callback yet received in Person");

      if (err) {
        setCerror(err.message);
      } else {
        const newFeed = _.filter(person.feed, (p) => p._id !== postId);
        console.log("444444444444444444");
        console.log("444444444444444444");
        console.log(newFeed);

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
              <button className={styles.followButtons} onClick={() => onFollowHandle(person.user.userId)}>
                Unfollow
                <img className={styles.followUnfollowIcons} src={unfollowBlackIcon}/>
              </button>
            ) : (
              <button className={styles.followButtons} onClick={() => onFollowHandle(person.user.userId)}>
                Follow
                <img className={styles.followUnfollowIcons} src={followBlackIcon}/>
              </button>
            )
          ) : null}
        </SubNav>
        {/* <Link to="/users" className="btn">
          Back
        </Link> */}
      <div className={styles.postContainer}>
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
            <div key={post.id} className={styles.postWrapper}>
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
