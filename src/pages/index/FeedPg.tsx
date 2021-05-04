import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../UI/Modal";
import Feed from "../../components/Feed/Feed";
import { IPost } from "../../interfaces/IPost";
import ImageSlider from "../../UI/ImageSlider";
import { doPostCreate } from "../../store/redux/actions/feed_act";
import { postCreate } from "../../utils/api/posts.api";
import Error from "../../components/Error/Error";
import { fetchFeed } from "../../utils/api/posts.api";
import SubNav from "../../components/Navbar/SubNav";
import styles from "./FeedPg.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import _ from "lodash";
import { Filter } from "@material-ui/icons";
import FeedFilter from "../../components/Filter/FeedFilter";

const FeedPg = (props: any) => {
  const [feed, setFeed] = useState(null) as any;
  const [message, setMessage] = useState("");
  const [modalContent, setModalContent] = useState(null) as any;

  const {
    userId,
    username,
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    setCerror,
  } = useContext(LoginContext);

  let img_src = "";

  let file_arr: any[] = [];
  let src_arr: string[] = [];

  useEffect(() => {
    src_arr.forEach((src) => {
      window.URL.revokeObjectURL(src);
    });
  });

  useEffect(() => {
    fetchFeed((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFeed(result);
      }
    });
  }, []);

  const postSubmit = (e: any) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append("userId", userId);
    bodyFormData.append("message", message);
    bodyFormData.append("img_name", uuidv4());

    //should be done server side
    bodyFormData.append("id", uuidv4());

    if (file_arr.length > 0) {
      for (let i = 0; i < modalProps.file_arr.length; i++) {
        bodyFormData.append("filesToUpload[]", modalProps.file_arr[i]);
      }
    }

    src_arr = [];
    file_arr = [];
    setShowModal("");
    setModalProps(null);

    postCreate(bodyFormData, (err: Error, result: IPost[]) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("fffffffffffffffffffffff");
        console.log(result);
        setCerror("");
        // setFeed(feed.unshift(result));
        setFeed(_.concat(result, feed));

        // setCommentList([...commentList, result]);
      }
    });
    setMessage("");
    // props.onPostCreate(bodyFormData);
  };

  function getImg(e: any) {
    console.log(e.target.files);

    file_arr = Array.from(e.target.files);
    file_arr.map((img) => {
      let binaryData = [];
      binaryData.push(img);
      const blob = new Blob(binaryData);

      img_src = window.URL.createObjectURL(blob);

      src_arr.push(img_src);
    });

    setModalProps({ src_arr: src_arr, file_arr: file_arr });
  }

  function PostModalContent() {
    return (
      <>
        <form style={{ marginBottom: "50px" }} onSubmit={postSubmit}>
          <textarea
            rows={4}
            cols={50}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div>
            <input
              type="file"
              id="myFile"
              name="filename"
              accept="image/png"
              multiple
              onChange={(e) => getImg(e)}
            />
          </div>
          <input type="submit" />
        </form>
        <div>{modalProps && <ImageSlider slides={modalProps.src_arr} />}</div>
      </>
    );
  }

  function feedModalContent() {
    return (
      <Filter>
        <FeedFilter></FeedFilter>
      </Filter>
    );
  }

  return (
    <>
      <Navbar currentPath={window.location.pathname} />
      <SubNav>
        <div className={`flex--space-around ${styles.SubNavWrap}`}>
          <h2>{username}</h2>
          {/* <button onClick={() => setShowModal(true)}>Upload Post</button> */}
          <button onClick={() => setShowModal("postUpload")}>
            Upload Post
          </button>

          <button onClick={() => setShowModal("filter")}>Filter</button>
        </div>
      </SubNav>
      <div>
        <Feed feed={feed} />
      </div>
      {showModal ? (
        showModal == "postUpload" ? (
          <Modal>{PostModalContent()}</Modal>
        ) : (
          <Modal>{feedModalContent()}</Modal>
        )
      ) : null}
    </>
  );
};

// export default FeedPg;

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onPostCreate: (post_obj: IPost) => dispatch(doPostCreate(post_obj)),
//   };
// };

// export default connect(null, mapDispatchToProps)(FeedPg);
export default FeedPg;
