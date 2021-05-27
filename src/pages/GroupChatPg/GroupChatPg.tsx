import React, { useState, useEffect, useContext, useRef } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import {
  doChatUpdate,
  doChatInitialChatGroup,
  doChatTypeUpdate,
} from "../../store/redux/actions/chat_act";
import { getPeople } from "../../utils/api/people.api";
import FILTER_INITIAL_STATE from "../../constants/filter_initial_state";
import FilterUserList from "./FilterUserList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Error from "../../components/Error/Error";
import styles from "./GroupChatPg.module.scss";
import backIcon from "./assets/backIcon.svg";

// function GroupChatPg({ startPage, chatId }: any) {
function GroupChatPg(props: any) {
  const history = useHistory();
  const { cerror, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);
  const [people, setPeople] = useState([]);
  const [toggleView, setToggleView] = useState("chat");
  // const [addedGroup, setAddedGroup] = useState(props.addedGroup) as any;
  const [addedGroup, setAddedGroup] = useState([]) as any;
  const initialChatGroup = props.initialChatGroup;
  // const [addedGroupIds, setAddedGroupIds] = useState(
  //   props.addedGroup.map((p: any) => {
  //     return p.userId;
  //   })
  // ) as any;
  const [addedGroupIds, setAddedGroupIds] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    return () => {
      setCerror("");
    };
  }, []);
  // const [showFeedFilter, setShowFeedFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(
    FILTER_INITIAL_STATE.peoplePg.feed
  );
  const [peopleFilter, setPeopleFilter] = useState(
    FILTER_INITIAL_STATE.peoplePg.people
  );

  const peopleFilterProps = (ppl_filter: any) => {
    const key_name_pair = Object.entries(ppl_filter)[0];

    setPeopleFilter({
      ...peopleFilter,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const setToggleViewProp = (view: string) => {
    setToggleView(view);
  };

  const setAddedGroupProp = (addedGroupState: string[]) => {
    setAddedGroup(addedGroupState);
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({
      ...feedFilter,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const onGroupFilterSubmit = () => {
    const peoplePgSlice = {
      applied: true,
      people: peopleFilter,
      feed: feedFilter,
    };

    getPeople(peoplePgSlice, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPeople(result);
        setToggleView("users");
      }
    });
  };

  function toggleFilterProp() {
    setToggleView("");
  }

  function onStartChatProp() {
    if (addedGroup.length < 2) {
      window.alert("You must select at least two user!");
    } else {
      props.onPropStartChatProp(addedGroup);
      props.doChatTypeUpdateProp(props.chatType);
      // props.onSetInitialChatGroup(addedGroup);
      history.push("/chat");
    }
  }

  function getAvatars(addedGroup: any) {
    console.log("getAvatars getAvatars getAvatars");
    console.log(addedGroup);
    const length = addedGroup.length > 3 ? 3: addedGroup.length;

    let selectGroup: any = [];
    for (let i = 0; i < length; i++) {
      selectGroup.push(addedGroup[i]);
    }

    const arr_user = selectGroup.map((u: any, index: number) => {
      return (
        <div key={u.userId} className={styles.avatarContainer} style={{left: index * 22.5}}>
            <img src={u.avatar} className={styles.avatarThumbnail} />
        </div>
      );
    });

    return arr_user;
  }

  return (
    <>
      {toggleView === "users" ? (
        <>
          <div className="pagePadding">
            <div className={styles.addedUserContainer} ref={containerRef}>
              <div className={styles.titleContainer}>
                <div className={styles.addedUserTitle}>Added users:</div>
              </div>
              <div className={styles.addedList}>
                {getAvatars(addedGroup)}
                {addedGroup.length > 3 && (
                  <h3 style={{display: "inline-flex", position: "relative", left: 5 * 22.5 }}>
                    {/* and {addedGroup.length - 3} other */}
                    ...
                  </h3>
                )}
              </div>
            </div>
            <FilterUserList
              people={people}
              toggleFilterProp={toggleFilterProp}
              addedGroup={addedGroup}
              setAddedGroupProp={setAddedGroupProp}
              onStartChatProp={onStartChatProp}
              addedGroupIds={addedGroupIds}
              setAddedGroupIds={setAddedGroupIds}
              chatType={props.chatType}
              initialChatGroup={initialChatGroup}
            />
          </div>
        </>
      ) : (
        <>
          <div className="pagePadding">
            <Navbar currentPath={window.location.pathname} />
            <SubNav>
              <img src={backIcon} onClick={history.goBack}/>
            </SubNav>
            {cerror && <Error message={cerror} />}
            <div className={styles.filterContainer}>
              <div className={styles.filterInfo}>
              <div className={styles.pageTitle}>
                <div>Filters</div>
              </div>
              <hr />
                <PeopleFilter
                  peopleFilterProps={peopleFilterProps}
                  feedPg_People={FILTER_INITIAL_STATE.peoplePg.people}
                />
              <hr />
              <h2>Post</h2>
              <p>
                Filter users who created matching posts only
              </p>
              <FeedFilter
                feedFilterProps={feedFilterProps}
                feedPg_Feed={FILTER_INITIAL_STATE.peoplePg.feed}
              />
              <div className={styles.footerWrapper}>
                <button
                  className={styles.submitButton}
                  onClick={onGroupFilterSubmit} >
                  Submit
                </button>
              </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
    chatType: state.chatState.chatType,
    initialChatGroup: state.chatState.initialChatGroup,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    doChatTypeUpdateProp: (chatType: any) =>
      dispatch(doChatTypeUpdate(chatType)),
    onPropStartChatProp: (addedGroup: any) =>
      dispatch(doChatUpdate(addedGroup)),
    onSetInitialChatGroup: (initialChatGroup: any) =>
      dispatch(doChatInitialChatGroup(initialChatGroup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatPg);

// export default GroupChatPg;
