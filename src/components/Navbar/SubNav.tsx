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
import { v4 as uuidv4 } from "uuid";
import townSquareLogo from "./assets/townSquareLogo.svg";

function SubNav(props: any) {
  const { setCerror, currentUser } = useContext(LoginContext);
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
        const linkTarget = {
          pathname: link,
          key: uuidv4(),
        };
        history.push(linkTarget);
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
    <div className={`${styles.subNav}`}>
      <div className={styles.logoWrap}>
        <img
          className={`pointer ${styles.logo}`}
          src={townSquareLogo}
          onClick={() => {
            history.push("/help");
          }}
        />
        <p style={{ paddingLeft: "20px" }}>{currentUser.username}</p>
      </div>
      <div className={styles.childrenWrap}>{props.children}</div>
      <div className={styles.commonIcons}>
        <Badge
          className="pointer"
          badgeContent={props.notices.length}
          max={10}
          color="primary"
        >
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
                <div className={styles.notificationItems} key={n._id}>
                  <p
                    style={{ color: "black" }}
                    className="pointer"
                    onClick={() =>
                      removeMapThenRedirect(n.link, n._id, n.receiverId)
                    }
                  >
                    {/* <Link to={n.link}>{n.message}</Link> */}
                    <div className={styles.notificationWrapper}>
                    <div className={styles.userInfoWrapper}>
                    {n.message}
                    </div>
                    <div className={styles.dateWrapper}>
                    {new Date(n.createdAt).toDateString()}
                    </div>
                    </div>
                  </p>
                </div>
              );
            })}

            <button className={styles.clearButton} onClick={clearAll}>
              Clear all
            </button>
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
