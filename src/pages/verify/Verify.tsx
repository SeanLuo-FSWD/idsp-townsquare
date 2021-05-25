import React, { useEffect, useState, useContext } from "react";
import { verify } from "../../utils/api/auth.api";
import { LoginContext } from "../../store/context/LoginContext";
import { useHistory } from "react-router-dom";
import Error from "../../components/Error/Error";

function Verify() {
  const [status, setStatus] = useState(false);

  const history = useHistory();

  const { cerror, setCerror } = useContext(LoginContext);

  useEffect(() => {
    let search = window.location.search;
    let query = new URLSearchParams(search).get("id") as string;

    verify(query, (err: Error, result: {}) => {
      if (err) {
        setCerror(
          "Your email could not be verified, please try register again"
        );
      } else {
        setStatus(true);
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    });
  }, []);

  return !status ? (
    <div className="pagePadding">
      {cerror && <Error message={cerror} />}
      <h2>Please wait as we verify you</h2>
    </div>
  ) : (
    <div className="pagePadding">
      <h2>
        Authentication success! You will be redirected to Login page shortly
      </h2>
    </div>
  );
}

export default Verify;
