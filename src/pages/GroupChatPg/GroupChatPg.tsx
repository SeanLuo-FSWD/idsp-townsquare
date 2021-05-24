import React, { useState, useEffect, useContext } from "react";
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

// function GroupChatPg({ startPage, chatId }: any) {
function GroupChatPg(props: any) {
  const history = useHistory();
  const { cerror, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);
  const [people, setPeople] = useState([]);
  const [toggleView, setToggleView] = useState("chat");
  const [addedGroup, setAddedGroup] = useState(props.addedGroup) as any;
  const initialChatGroup = props.initialChatGroup;
  const [addedGroupIds, setAddedGroupIds] = useState(
    props.addedGroup.map((p: any) => {
      return p.userId;
    })
  ) as any;

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
    if (addedGroup.length === 0) {
      window.alert("You must select at least one user!");
    } else {
      props.onPropStartChatProp(addedGroup);
      props.doChatTypeUpdateProp(props.chatType);
      props.onSetInitialChatGroup(addedGroup);
      history.push("/chat");
    }
  }

  return (
    <div>
      {toggleView === "users" ? (
        <>
          <div className="flex">
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
            <div style={{ alignSelf: "flex-start", marginTop: "50px" }}>
              <h2>Added users</h2>
              {addedGroup.map((person: any) => {
                return (
                  <div key={person.userId}>
                    <div>
                      <img src={person.avatar} height="50px" width="50px" />
                    </div>
                    <div style={{ display: "flex" }}>
                      <span>{person.username}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar currentPath={window.location.pathname} />
          <SubNav>
            <button onClick={history.goBack}>Back</button>
          </SubNav>
          <div style={{ marginTop: "50px" }}>
            {cerror && <Error message={cerror} />}
            <PeopleFilter
              peopleFilterProps={peopleFilterProps}
              feedPg_People={FILTER_INITIAL_STATE.peoplePg.people}
            />

            <div className="flex">
              <p>
                Apply Feed filter to users (Will only show users who created
                matched posts)
              </p>
            </div>
            <FeedFilter
              feedFilterProps={feedFilterProps}
              feedPg_Feed={FILTER_INITIAL_STATE.peoplePg.feed}
            />
            <div className="flex">
              <button onClick={onGroupFilterSubmit}>Submit</button>
              <button
                onClick={() => {
                  setModalProps(null);
                  setShowModal("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
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
