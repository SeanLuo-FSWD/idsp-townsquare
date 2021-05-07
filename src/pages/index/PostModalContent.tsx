import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";
import { postCreate } from "../../utils/api/posts.api";
import { v4 as uuidv4 } from "uuid";
import { IPost } from "../../interfaces/IPost";
import ImageSlider from "../../UI/ImageSlider";
import _ from "lodash";
import styles from "./PostModal.module.scss";

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

    // postCreate(bodyFormData, (err: Error, result: IPost[]) => {
    //   if (err) {
    //     setCerror(err.message);
    //   } else {
    //     setCerror("");
    //     setFeed(_.concat(result, feed));
    //   }
    // });

    // Faking the post here, above commented is the actual method

    const img_urls = modalProps ? modalProps.src_arr : [];
    let fake_post = {
      commentList: [],
      createdAt: new Date().toDateString(),
      id: uuidv4(),
      likes: [],
      message: message,
      userId: currentUser.id,
      username: currentUser.username,
      user: {
        img:
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
        username: "bob",
      },
      img_urls: img_urls,
    };
    postCreate(fake_post, (err: Error, result: IPost[]) => {
      console.log("fake_post fake_post fake_post");
      console.log(fake_post.img_urls);

      if (err) {
        setCerror(err.message);
      } else {
        setCerror("");

        addPostProp(result);
      }
    });
    setMessage("");
  };

  return (
    <>
      <form onSubmit={postSubmit}>
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

export default PostModalContent;
