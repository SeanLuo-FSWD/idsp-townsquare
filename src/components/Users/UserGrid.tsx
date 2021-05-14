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
        const profile_pic = user.img
          ? user.img
          : "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png";

          console.log(user);
          console.log(user);
        return (
          <div key={user.id} className={`${styles.userTile} flex--center`}>
            <img src={profile_pic}></img>
            <Link to={`/person/${user.id}`} />
              <div className={styles.tileUsername}>
              {user.username}<br></br>
              {user.age}<br></br>
              {user.gender}<br></br>
              {user.location}

              </div>
          </div>
          
        );
      })}
    </div>
  );
}

export default UserGrid;
