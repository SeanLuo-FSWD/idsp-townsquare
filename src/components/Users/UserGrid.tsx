import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import styles from "./UserGrid.module.scss";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";

function UserGrid(props: any) {
  return (
    <div className={styles.grid}>
      {props.people.map((user: any) => {
        const profile_pic = user.avatar;

        return (
          <div key={user._id} className={`${styles.userTile} flex--center`}>
            <img src={profile_pic}></img>
            <h4 style={{ position: "absolute", bottom: "0" }}>
              {user.username}
            </h4>
            <Link to={`/person/${user._id}`} />
          </div>
        );
      })}
    </div>
  );
}

export default UserGrid;
