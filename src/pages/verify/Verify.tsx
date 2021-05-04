import React, { useEffect, useState, useContext } from "react";
import { login, verify } from "../../utils/api/auth.api";
import API_URL from "../../constants/api_url";
import { LoginContext } from "../../store/context/LoginContext";
import { useHistory } from "react-router-dom";

function Verify() {
  const [status, setStatus] = useState(false);

  const history = useHistory();

  const {
    userId,
    setUserId,
    username,
    setUsername,
    showModal,
    setShowModal,
    modalProps,
    setCurrentUser,
    setModalProps,
    setCerror,
    setIsAuthenticated,
  } = useContext(LoginContext);

  useEffect(() => {
    let search = window.location.search;
    let query = new URLSearchParams(search).get("query") as string;

    verify(query, (err: Error, result: {}) => {
      if (err) {
        setCerror(
          "Your email could not be verified, please try register again"
        );
      } else {
        // Ask to login user on backend, AND send userId + username + email here.
        setUserId("1");
        setUsername("bob");
        setCurrentUser({ id: "stub", username: "stub", email: "stub" });
        setIsAuthenticated(true);

        setStatus(true);
        setTimeout(() => {
          history.push("/profile");
        }, 2000);
      }
    });
  }, []);

  return !status ? (
    <div>
      <h2>Please wait as we verify you</h2>
    </div>
  ) : (
    <div>
      <h2>
        Authentication success! You will be redirected to Edit profile page
        shortly
      </h2>
    </div>
  );
}

export default Verify;
