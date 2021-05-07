import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import { fetchPerson } from "../../utils/api/people.api";
import Error from "../../components/Error/Error";
import Feed from "../../components/Feed/Feed";
import { LoginContext } from "../../store/context/LoginContext";
import { fetchFeed } from "../../utils/api/posts.api";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Person.module.scss";
import { useHistory } from "react-router-dom";
import Post from "../../components/Post/Post";

function Person() {
  const history = useHistory();
  const { id } = useParams() as any;
  const [person, setPerson] = useState(null) as any;
  const {
    userId,
    username,
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    fetchPerson(id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPerson(result);
      }
    });
  }, []);

  if (person) {
    return (
      <div>

        <Navbar currentPath={window.location.pathname} />
        {/* <Link to="/users" className="btn">
          Back
        </Link> */}
        <button onClick={history.goBack}>Back</button>
        <div className="flex">
          <img className={styles.profileImg} src={person.img} alt="" />
          <div>
            <h2>username: {person.username}</h2>
            <h2>age: {person.age}</h2>
            <h2>gender: {person.gender}</h2>
            <h2>location: {person.location}</h2>
          </div>
        </div>

        {person.feed.map((post: any) => {
          return (
            <div key={post.id} className={styles.postWrapper}>
              <h4>{post.createdAt}</h4>
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
