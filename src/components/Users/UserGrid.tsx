import React from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import styles from "./UserGrid.module.scss";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";

function UserGrid({ users }: any) {
  return (
    <div className={styles.grid}>
      {users.map((user: any) => {
        const profile_pic = user.img
          ? user.img
          : "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png";

        return (
          <div key={user.id} className={`${styles.userTile} flex--center`}>
            <img src={profile_pic}></img>
            <Link to={`/person/${user.id}`} />
          </div>
        );
      })}
    </div>
  );
}

export default UserGrid;
