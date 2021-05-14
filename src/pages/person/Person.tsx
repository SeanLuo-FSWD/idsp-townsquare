import React, { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import { fetchPerson, userFollow } from "../../utils/api/people.api";
import Error from "../../components/Error/Error";
import Feed from "../../components/Feed/Feed";
import { LoginContext } from "../../store/context/LoginContext";
import { postRemove } from "../../utils/api/posts.api";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Person.module.scss";
import Post from "../../components/Post/Post";
import _ from "lodash";
import SubNav from "../../components/Navbar/SubNav";
import { useOnFollowHandle } from "../../helper/follow";
import deleteIcon from "./assets/delete.svg"
import backIcon from "./assets/back.svg"
import followIcon from "./assets/follow.svg"
import unfollowIcon from "./assets/unfollow.svg"

function Person() {
  const history = useHistory();
  const { id } = useParams() as any;
  const [person, setPerson] = useState(null) as any;
  const [followState, SetFollowState] = useState(null) as any;

  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  const newUser = useOnFollowHandle(followState);

  useEffect(() => {
    if (newUser) {
      console.log("if follow state is set, user is...");
      console.log(newUser);
      // setCurrentUser(newUser);
      SetFollowState(null);
      setCurrentUser(newUser);
    }
  });

  useEffect(() => {
    fetchPerson(id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPerson(result);
      }
    });
  }, []);

  const onFollowHandle = (userId: string, follow: boolean) => {
    console.log("00000");

    SetFollowState({ userId: userId, follow: follow });
  };

  const onRemovePost = (postId: string) => {
    postRemove(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        const newFeed = _.filter(person.feed, (p) => p.id != postId);
        const newPerson = {
          ...person,
          feed: newFeed,
        };
        setPerson(newPerson);
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

  if (person) {
    return (
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav className="flex--space-between">
          <img src={backIcon} onClick={history.goBack}/>
          {person.id !== currentUser.id ? (
            currentUser.followed.includes(person.id) ? (
              <img src={unfollowIcon} onClick={() => onFollowHandle(person.id, false)}/>
            ) : (
              <img src={followIcon} onClick={() => onFollowHandle(person.id, true)}/>
            )
          ) : null}
        </SubNav>
        {/* <Link to="/users" className="btn">
          Back
        </Link> */}
        <div className={styles.personContainer}>
          <img className={styles.profileImg} src={person.img} alt="" />
          <div>
            <p>Username: {person.username}</p>
            <p>Age: {person.age}</p>
            <p>Gender: {person.gender}</p>
            <p>Location: {person.location}</p>
          </div>
        </div>

        {person.feed.map((post: any) => {
          return (
            <div key={post.id} className={styles.postWrapper}>
              <div>
                <p className={styles.createdAt}>{post.createdAt}
                {post.userId === currentUser.id && (
                  <img
                    src={deleteIcon}
                    onClick={() => {
                      onRemovePost(post.id);
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
