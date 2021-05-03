import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import { fetchPerson } from "../../utils/api/people.api";
import Error from "../../components/Error/Error";

function Person() {
  const { id } = useParams() as any;
  const [error, setError] = useState("");
  const [person, setPerson] = useState(null) as any;

  useEffect(() => {
    fetchPerson(id, (err: Error, result: any) => {
      if (err) {
        setError(err.message);
      } else {
        console.log("ddddddddddddddddddddddd");
        console.log(result.data);

        setPerson(result.data);
      }
    });
  }, []);

  if (error) {
    return <Error message={error} />;
  }
  if (person) {
    return (
      <div>
        <h2>{id}</h2>
        <Link to="/users" className="btn">
          Back
        </Link>
        <div>
          <h2>userName: {person.userName}</h2>
          <h2>age: {person.age}</h2>
          <h2>gender: {person.gender}</h2>
        </div>
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
