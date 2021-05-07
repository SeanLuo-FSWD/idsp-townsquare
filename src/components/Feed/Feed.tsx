import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Error from "../Error/Error";
import Post from "../../components/Post/Post";
import { useHistory } from "react-router-dom";
import styles from "./Feed.module.scss";

const Feed = (props: any) => {
  const history = useHistory();

  if (!props.feed) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }

  function profileRedirect(userId: string) {
    history.push(`/person/${userId}`);
  }

  // return props.feed.map((post: any) => {
  //   return (
  //     <div key={post.id} className={styles.postWrapper}>
  //       <div className="flex--space-between">
  //         <div className="flex" onClick={() => profileRedirect(post.userId)}>
  //           <img
  //             src={post.user.img}
  //             alt=""
  //             className={styles.postWrapper__img}
  //           />
  //           <h4>{post.username}</h4>
  //         </div>
  //         <h4>{post.createdAt}</h4>
  //       </div>
  //       <Post post={post}></Post>
  //     </div>
  //   );
  // });
};

export default Feed;
