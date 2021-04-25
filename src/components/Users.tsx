import React, { useState, useContext } from "react";
import { LoginContext } from "./context/LoginContext";

function Users() {
  const { username } = useContext(LoginContext);

  return (
    <div>
      <h1>Users page</h1>
      <h2>Welcome: {username} </h2>
    </div>
  );
}

export default Users;
