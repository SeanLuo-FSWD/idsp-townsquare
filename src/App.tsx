import React, { useState, useEffect } from "react";
import "./App.scss";
import { LoginContext } from "./store/context/LoginContext";
import Routing from "./components/Routing/Routing";
import { IUser } from "./interfaces/IUser";
import socket from "./utils/socketIO.util";
import {
  doNoticeError,
  doNoticeAdd,
  doNoticeSet,
} from "./store/redux/actions/notice_act";
import io from "socket.io-client";
import { getNotice } from "./utils/api/auth.api";
import { connect } from "react-redux";

function App(props: any) {
  const [signUpStatus, setSignUpStatus] = useState(false);
  const [showModal, setShowModal] = useState("");
  const [modalProps, setModalProps] = useState(false);
  const [cerror, setCerror] = useState("");
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [groupChat, setGroupChat] = useState([]) as any;

  window.onbeforeunload = (event: any) => {
    const e = event || window.event;
    setCerror("");
  };

  useEffect(() => {
    if (currentUser) {
      console.log("--- socket connected");
      socket.connect();

      // getNotice(currentUser.userId, (err: Error, result: any) => {
      getNotice((err: Error, result: any) => {
        if (err) {
          setCerror(err.message);
        } else {
          console.log("App - getNotice : result <=====================");

          console.log(result);
          props.doNoticeSetProp(result);
        }
      });

      socket.on("notification", () => {
        // const notification_obj = {
        //   receiverId,
        //   _id,
        //   message,
        //   link,
        //   createdAt,
        // };
        // props.doNoticeAddProp(notification_obj);
        getNotice((err: Error, result: any) => {
          if (err) {
            setCerror(err.message);
          } else {
            console.log("App.tsx - notification socket - getNotice : result");

            console.log(result);
            props.doNoticeSetProp(result);
          }
        });
      });
    }
    console.log(socket);

    return () => {
      console.log("--- socket disconnected");
      socket.disconnect();
    };
  }, [currentUser]);
  // }, []);

  return (
    <LoginContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signUpStatus,
        setSignUpStatus,
        showModal,
        setShowModal,
        modalProps,
        setModalProps,
        cerror,
        setCerror,
        groupChat,
        setGroupChat,
      }}
    >
      <Routing />
    </LoginContext.Provider>
  );
}

// export default App;

const mapStateToProps = (state: any) => {
  return {
    notices: state.noticeState.notices,
    error: state.chatState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    doNoticeErrorProp: (error: any) => dispatch(doNoticeError(error)),
    doNoticeAddProp: (notice: {
      _id: string;
      message: string;
      link: string;
      createdAt: Date;
    }) => dispatch(doNoticeAdd(notice)),
    doNoticeSetProp: (notices: any) => dispatch(doNoticeSet(notices)),
  };
};

// export default SubNav;
export default connect(mapStateToProps, mapDispatchToProps)(App);
