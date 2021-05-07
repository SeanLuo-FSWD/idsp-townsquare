import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import { fetchFeed } from "../../utils/api/posts.api";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./FeedPg.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import createPost from "./createPost.svg"
import filter from "./filter.svg"
import townSquareLogo from "./townSquareLogo.png"
import _ from "lodash";
import { Filter } from "@material-ui/icons";
import FeedFilter from "../../components/Filter/FeedFilter";
import { v4 as uuidv4 } from "uuid";
import PostModalContent from "./PostModalContent";
import FeedFilterModalContent from "./FeedFilterModalContent";
const FeedPg = () => {
  const [feed, setFeed] = useState(null) as any;

  const { currentUser, showModal, setShowModal, setCerror } = useContext(
    LoginContext
  );

  useEffect(() => {
    fetchFeed(null, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("FEED OBJ FROM FEEDPG");
        console.log(result);

        setFeed(result);
      }
    });
  }, []);

  const addPostProp = (result: any) => {
    setFeed(_.concat(result, feed));
  };

  const filterPostProp = (result: any) => {
    setFeed(result);
  };

  return (
    <>
      <Navbar currentPath={window.location.pathname} /> 
      <SubNav>
        <div className={`flex--space-subNav ${styles.SubNavWrap}`}>
          <div className={styles.username}>
            <img className={styles.logo} src={townSquareLogo}/>
          </div>

          <img className={styles.createPost} src={createPost} onClick={() => setShowModal("postUpload")} />
          <img src={filter} onClick={() => setShowModal("filter")}/>
        
          
        </div>
      </SubNav>
        <div className={styles.navContainer}>

        </div>
      <div>
        <Feed feed={feed} />
      </div>
      {showModal ? (
        showModal == "postUpload" ? (
          <Modal>
            <PostModalContent addPostProp={addPostProp} />
          </Modal>
        ) : (
          <Modal>
            <FeedFilterModalContent filterPostProp={filterPostProp} />
          </Modal>
        )
      ) : null}


    </>
  );
};

export default FeedPg;
