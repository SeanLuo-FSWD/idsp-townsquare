import React from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, getUserFeed } from "../../store/redux/selector/Users";
import UserInfo from "./UserInfo";

let userId = "";
function Person(props: any) {
  const { id } = useParams() as any;
  userId = id;
  console.log(id);
  console.log("fffffffffffffffffffffff");
  console.log(userId);
  console.log(props.user);

  if (props.user) {
    return (
      <div>
        <h2>{id}</h2>
        <Link to="/users" className="btn">
          Back
        </Link>

        <div>
          <h2>userName: {props.user.userName}</h2>
          <h2>age: {props.user.age}</h2>
          <h2>gender: {props.user.gender}</h2>
        </div>
      </div>
    );
  }
  return <div>Loading</div>;
}

const mapStateToProps = (state: any) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  return {
    user: getUser(state.usersState, userId),
    userFeed: getUserFeed(state.usersState),
    error: state.usersState.error,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(Person);

// export default Person;
