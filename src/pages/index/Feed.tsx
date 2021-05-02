import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { connect } from "react-redux";
import { doFetchFeed, doPostCreate } from "../../store/redux/actions/feed_act";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import Post from "../../components/Post/Post";
import Error from "../../components/Error/Error";
import { v4 as uuidv4 } from "uuid";
import { IPost } from "../../interfaces/IPost";
import Modal from "../../UI/Modal";
import Button from "react-bootstrap/Button";
import ImageSlider from "../../UI/ImageSlider";

const Feed = (props: any) => {
  const {
    userId,
    username,
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
  } = useContext(LoginContext);

  let img_src = "";
  // const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  let file_arr: any[] = [];
  let src_arr: string[] = [];

  useEffect(() => {
    props.onFetchFeed();
  }, []);

  useEffect(() => {
    window.URL.revokeObjectURL(img_src);
  });

  const postSubmit = (e: any) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append("userId", userId);
    bodyFormData.append("message", message);
    bodyFormData.append("img_name", uuidv4());

    //should be done server side
    bodyFormData.append("id", uuidv4());

    for (let i = 0; i < modalProps.file_arr.length; i++) {
      bodyFormData.append("filesToUpload[]", modalProps.file_arr[i]);
    }

    src_arr = [];
    file_arr = [];
    setShowModal(false);
    setModalProps(null);

    // const post_obj: IPost = {
    //   id: uuidv4(),
    //   userName: username,
    //   createdAt: new Date(),
    //   title: title,
    //   message: message,
    //   likes: [],
    //   commentList: [],
    // };

    props.onPostCreate(bodyFormData);
  };

  function getImg(e: any) {
    console.log(e.target.files);

    file_arr = Array.from(e.target.files);
    console.log("fffffffffffffffffffffff");
    console.log(file_arr);
    file_arr.map((img) => {
      let binaryData = [];
      binaryData.push(img);
      const blob = new Blob(binaryData);

      img_src = window.URL.createObjectURL(blob);

      src_arr.push(img_src);
    });

    setModalProps({ src_arr: src_arr, file_arr: file_arr });
  }

  function modalContent() {
    return (
      <>
        <form style={{ marginBottom: "50px" }} onSubmit={postSubmit}>
          {/* <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> */}
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
              // style={{ display: "none" }}
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

  return (
    <>
      <div>
        <h1>Posts feed page</h1>
        <img
          src="https://idsp2.s3-us-west-1.amazonaws.com//images/1619930874561_07_optional_middle_name_1.png"
          alt=""
        />
        <h2>Welcome: {username}</h2>
        <button onClick={() => setShowModal(true)}>Upload Post</button>
        <div>
          {props.feed.error ? (
            <Error message={props.feed.error} />
          ) : props.feed.posts.length > 0 ? (
            props.feed.posts.map((post: any) => {
              console.log("sssssssssssssssssssssssss");
              console.log(post);

              return <Post key={post.id} {...post}></Post>;
            })
          ) : (
            <div>
              <h2>loading...</h2>
            </div>
          )}
        </div>
      </div>
      {showModal && <Modal data={src_arr}>{modalContent()}</Modal>}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    feed: getFeed(state.feedState),
    error: getFeedError(state.feedState),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchFeed: () => dispatch(doFetchFeed()),
    onPostCreate: (post_obj: IPost) => dispatch(doPostCreate(post_obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
