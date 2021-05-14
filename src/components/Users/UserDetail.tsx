import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import styles from "./UserGrid.module.scss";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
} from "../../utils/api/people.api";

function UserDetail(props: any) {
  console.log("UserDetail UserDetail UserDetail: user");
  console.log(props.people);
  const { currentUser, setCerror, setCurrentUser } = useContext(LoginContext);

  const [followed, setFollowed] = useState([]) as any;

  useEffect(() => {
    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("3333333333333333");
        console.log("setFollowed");
        console.log(result.data);
        setFollowed(result.data);
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

  function checkFollowed(personUserId: string) {
    const match_follow = _.filter(
      followed,
      (f: any) => f.followingUserId === personUserId
    );
    if (match_follow[0]) {
      return true;
    }

    return false;
  }

  return (
    <div>
      {props.people.map((user: any) => {
        const profile_pic = user.avatar;

        return (
          <div
            key={user._id}
            className="flex"
            style={{ justifyContent: "center" }}
          >
            <Link to={`/person/${user._id}`}>
              <img
                style={{ height: "100px", width: "100px" }}
                src={profile_pic}
              ></img>
            </Link>

            <div>
              <div>
                <h4>{user.username}</h4>
                {user._id !== currentUser.userId ? (
                  checkFollowed(user._id) ? (
                    <button onClick={() => onFollowHandle(user._id)}>
                      Unfollow
                    </button>
                  ) : (
                    <button onClick={() => onFollowHandle(user._id)}>
                      Follow
                    </button>
                  )
                ) : null}
              </div>

              <div style={{ display: "flex" }}>
                <span style={{ marginRight: "20px" }}>Location</span>
                <span>{user.location}</span>
              </div>

              <div style={{ display: "flex" }}>
                <span style={{ marginRight: "20px" }}>age</span>
                <span>{user.age}</span>
              </div>

              <div style={{ display: "flex" }}>
                <span style={{ marginRight: "20px" }}>gender</span>
                <span>{user.gender}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserDetail;
