import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import styles from "./SubNav.module.scss";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  doNoticeError,
  doNoticeAdd,
  doNoticeRemove,
  doNoticeSet,
} from "../../store/redux/actions/notice_act";
import {
  removeNoticeById,
  clearAllNotifications,
} from "../../utils/api/auth.api";
import HelpIcon from "@material-ui/icons/Help";

function SubNav(props: any) {
  const { setCerror } = useContext(LoginContext);
  const history = useHistory();

  const [showDD, setShowDD] = useState(false);

  // console.log(props.notices);
  // useEffect(() => {
  //   document.getElementById("root").addEventListener("click", (e) => {
  //     // e.stopPropagation();
  //     setShowDD(false);
  //   });
  // }, []);

  function removeMapThenRedirect(
    link: string,
    noticeId: string,
    receiverId: string
  ) {
    const notice_obj = {
      notificationId: noticeId,
      receiverId: receiverId,
    };
    removeNoticeById(notice_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("SubNav - getNotice : result <=====================");

        console.log(result);
        props.doNoticeSetProp(result);
        history.push(link);
      }
    });
  }

  function clearAll() {
    clearAllNotifications((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        props.doNoticeSetProp([]);
        setShowDD(false);
      }
    });
  }

  return (
    <div className={`flex--space-between ${styles.subNav}`}>
      {props.children}
      <HelpIcon
        onClick={() => {
          history.push("/help");
        }}
      >
        {/* <Link to="/help" /> */}
      </HelpIcon>
      <div>
        <Badge badgeContent={props.notices.length} max={10} color="primary">
          <NotificationsIcon
            className={styles.notificationIcon}
            onClick={() => {
              setShowDD(!showDD);
            }}
          />
        </Badge>
        {showDD && (
          <div className={styles.alert}>
            {props.notices.map((n: any) => {
              return (
                // <li onClick={() => removeAlert(a.id)} key={a.id}>
                //   {createAlert(a)}
                // </li>

                // {
                //   receiverId: '60a76224da25031a2c9d38d0',
                //   createdAt: 'Sat May 22 2021 00:17:27 GMT-0700 (Pacific Daylight Time)',
                //   message: 'sponge bob has liked your post',
                //   link: '/post/60a76986e29a171eb6d18661',
                //   _id: '60a8b0072a244a32f6f7015d'
                // }
                <div key={n._id}>
                  <p
                    style={{ color: "black" }}
                    onClick={() =>
                      removeMapThenRedirect(n.link, n._id, n.receiverId)
                    }
                  >
                    {/* <Link to={n.link}>{n.message}</Link> */}
                    {n.message} - {new Date(n.createdAt).toDateString()}
                  </p>
                </div>
              );
            })}

            <button onClick={clearAll}>Clear all</button>
          </div>
        )}
      </div>
    </div>
  );
}

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
    doNoticeRemoveProp: (noticeId: string) =>
      dispatch(doNoticeRemove(noticeId)),
    doNoticeSetProp: (notices: any) => dispatch(doNoticeSet(notices)),
  };
};

// export default SubNav;
export default connect(mapStateToProps, mapDispatchToProps)(SubNav);
