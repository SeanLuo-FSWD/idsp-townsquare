import React, { useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Login from "../../pages/login/LoginPg";
import Profile from "../../pages/Profile/Profile";

const LoggedInRoutesKeeper = (props: any) => {
  const { currentUser } = useContext(LoginContext);

  return (
    <>
      {/* {cerror && <Error message={cerror} />} */}
      {!currentUser ? (
        <Login />
      ) : currentUser.firstTime ? (
        <Profile />
      ) : (
        props.children
      )}
    </>
  );
  // }
};

export default LoggedInRoutesKeeper;
