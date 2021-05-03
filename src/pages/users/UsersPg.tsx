import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { LoginContext } from "../../store/context/LoginContext";
import { doFetchUsers } from "../../store/redux/actions/users_act";
import IUsers from "../../interfaces/redux";
import UserGrid from "../../components/Users/UserGrid";

function UsersPg(props: any) {
  useEffect(() => {
    props.onFetchUsers();
  }, []);

  const { username } = useContext(LoginContext);

  return (
    <>
      <div>
        <h1>Users page</h1>
        <h2>Welcome: {username} </h2>
      </div>

      <UserGrid {...props.users} />
    </>
  );
}

const mapStateToProps = (state: any) => {
  const getUsers = (usersState: IUsers) => {
    return usersState;
  };
  const getUsersError = (usersState: IUsers) => usersState.error;
  return {
    users: getUsers(state.usersState),
    error: getUsersError(state.usersState),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchUsers: () => dispatch(doFetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPg);
