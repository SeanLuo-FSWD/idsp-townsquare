import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { doFetchFeed } from "../../store/redux/actions/feed_act";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Error from "../Error/Error";
import Post from "../../components/Post/Post";
import { fetchFeed } from "../../utils/api/posts.api";

const Feed = (props: any) => {
  // useEffect(() => {
  //   props.onFetchFeed();
  // }, []);
  const [error, setError] = useState("");
  const [feed, setFeed] = useState(null) as any;

  // useEffect(() => {
  //   fetchFeed((err: Error, result: any) => {
  //     if (err) {
  //       setError(err.message);
  //     } else {
  //       setFeed(result);
  //     }
  //   });
  // }, []);

  // if (error) {
  //   return <Error message={props.feed.error} />;
  // }

  if (!props.feed) {
    return (
      <div>
        <h2>loading...</h2>
      </div>
    );
  }

  return props.feed.map((post: any) => {
    console.log("sssssssssssssssssssssssss");
    console.log(post.id);

    return <Post key={post.id} post={post}></Post>;
  });

  // return (
  //   <div>

  //     {error ? (
  //       <Error message={props.feed.error} />
  //     ) : feed.length > 0 ? (
  //       feed.map((post: any) => {
  //         return <Post key={post.id} post={post}></Post>;
  //       })
  //     ) : (
  //       <div>
  //         <h2>loading...</h2>
  //       </div>
  //     )}
  //   </div>
  // );
};

// const mapStateToProps = (state: any) => {
//   return {
//     feed: getFeed(state.feedState),
//     error: getFeedError(state.feedState),
//   };
// };

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onFetchFeed: () => dispatch(doFetchFeed()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Feed);

export default Feed;