import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { postCreate } from "../../utils/api/posts.api";
import { IPost } from "../../interfaces/IPost";
import ImageSlider from "../../UI/ImageSlider";
import _ from "lodash";
import styles from "./PostModalContent.module.scss";

function PostModalContent({ addPostProp }: any) {
  const [message, setMessage] = useState("");
  const {
    currentUser,
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

  function getImg(e: any) {
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

  const postSubmit = (e: any) => {
    e.preventDefault();

    let bodyFormData = new FormData();
    bodyFormData.append("text", message);

    if (modalProps && modalProps.file_arr.length > 0) {
      for (let i = 0; i < modalProps.file_arr.length; i++) {
        bodyFormData.append("filesToUpload[]", modalProps.file_arr[i]);
      }
    }
    src_arr = [];
    file_arr = [];
    setShowModal("");
    setModalProps(null);

    // DO NOT DELETE
    console.log("000000000000000000000");
    console.log(bodyFormData);

    postCreate(bodyFormData, (err: Error, result: IPost[]) => {
      if (err) {
        setCerror(err.message);
      } else {
        setCerror("");
        console.log("postCreate postCreate postCreate postCreate");
        console.log(result);

        addPostProp(result);
      }
    });
    // Faking the post here, above commented is the ACTUAL method

    // const img_urls = modalProps ? modalProps.src_arr : [];
    // let postObj = {
    //   commentList: [],
    //   createdAt: new Date().toDateString(),
    //   id: uuidv4(),
    //   likes: [],
    //   message: message,
    //   userId: currentUser.userId,
    //   username: currentUser.username,
    //   img_urls: img_urls,
    // };

    // postCreate(postObj, (err: Error, result: IPost[]) => {
    //   if (err) {
    //     setCerror(err.message);
    //   } else {
    //     setCerror("");

    //     addPostProp(result);
    //   }
    // });

    setMessage("");
  };

  return (
    <>
      <div className={styles.postModal}>
        <form className={styles.createPostForm} onSubmit={postSubmit}>
          <textarea
            rows={4}
            cols={50}
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

            <input

              className={styles.chooseFiles}
              type="file"
              id="myFile"
              name="filename"
              // accept="image/png"
              accept="image"
              multiple
              onChange={(e) => getImg(e)}
            />


          <input className={styles.createPostSubmit} type="submit" />
        </form>
        <div className={styles.postPreview}>
          {modalProps && <ImageSlider slides={modalProps.src_arr} />}
        </div>
      </div>
    </>
  );
}

export default PostModalContent;
