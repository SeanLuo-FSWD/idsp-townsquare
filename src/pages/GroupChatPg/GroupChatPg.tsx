import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { postFilterSubmit } from "../../utils/api/posts.api";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import { doChatUpdate } from "../../store/redux/actions/chat_act";
import { getPeople } from "../../utils/api/people.api";
import FILTER_INITIAL_STATE from "../../constants/filter_initial_state";
import FilterUserList from "./FilterUserList";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import GroupChat from "./GroupChat";
import { connect } from "react-redux";

// function GroupChatPg({ startPage, chatId }: any) {
function GroupChatPg(props: any) {
  const history = useHistory();
  const { showModal, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);
  const [people, setPeople] = useState([]);
  const [toggleView, setToggleView] = useState("chat");
  const [addedGroup, setAddedGroup] = useState([]) as any; // array of ids
  const [addedGroupIds, setAddedGroupIds] = useState([]) as any;

  // const [showFeedFilter, setShowFeedFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(
    FILTER_INITIAL_STATE.peoplePg.feed
  );
  const [peopleFilter, setPeopleFilter] = useState(
    FILTER_INITIAL_STATE.peoplePg.people
  );
  console.log("1111111111111111111111");
  console.log("1111111111111111111111");

  useEffect(() => {
    console.log("cccccccccccccccccccc");
    console.log("cccccccccccccccccccc");
    setAddedGroup(props.addedGroup);
  }, []);

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
    // feedFilterHolder = {
    //   ...feedFilterHolder,
    //   [key_name_pair[0]]: key_name_pair[1],
    // };
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
      // setToggleView("chat");
      props.onPropStartChatProp(addedGroup, "group");
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
            />
            <div style={{ alignSelf: "flex-start", marginTop: "50px" }}>
              <h2>Added users</h2>
              {addedGroup.map((person: any) => {
                return (
                  <div key={person._id}>
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

// export default FeedFilterModalContent;
const mapStateToProps = (state: any) => {
  return {
    chatId: state.chatState.chatId,
    addedGroup: state.chatState.addedGroup,
    error: state.chatState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPropStartChatProp: (addedGroup: any, chatType: string) =>
      dispatch(doChatUpdate(addedGroup, chatType)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupChatPg);

// export default GroupChatPg;