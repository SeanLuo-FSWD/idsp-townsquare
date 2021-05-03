import React, { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { fetchPeople } from "../../utils/api/people.api";

import UserGrid from "../../components/Users/UserGrid";
import Error from "../../components/Error/Error";

function UsersPg() {
  const [error, setError] = useState("");
  const [people, setPeople] = useState(null);

  useEffect(() => {
    fetchPeople((err: Error, result: any) => {
      if (err) {
        setError(err.message);
      } else {
        setPeople(result.data);
      }
    });
  }, []);

  const { username } = useContext(LoginContext);

  if (error) {
    return <Error message={error} />;
  } else if (!people) {
    return (
      <div>
        <h2>Loading</h2>
      </div>
    );
  }
  return (
    <>
      <div>
        <h1>Users page</h1>
        <h2>Welcome: {username} </h2>
      </div>

      <UserGrid people={people} />
    </>
  );
}

export default UsersPg;
