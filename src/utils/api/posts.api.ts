// import { db.posts } from "../../FakeDb/db.posts";

import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import API_URL from "../../constants/api_url";
import { TComment } from "../../interfaces/IPost";
import { db } from "../../FakeDb/FakeDb";
import { DbHelper } from "./_dbHelper";
import _ from "lodash";

const getLikesByPostId = (postId: string, cb: Function) => {
  axios
    .get(`${API_URL}/post/like/${postId}`, {
      withCredentials: true,
    })
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      console.log("getLikesByPostId error");
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
};

const getAllCommentsByPostId = (postId: string, cb: Function) => {
  axios
    .get(`${API_URL}/comment/${postId}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("getFullPostByPostId response");
      console.log(response);
      cb(null, response);
    })
    .catch((err) => {
      console.log("getFullPostByPostId error");
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
};

const getFullPostByPostId = (postId: string, cb: Function) => {
  axios
    .get(`${API_URL}/post/${postId}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("getFullPostByPostId response");
      console.log(response);
      cb(null, response);
    })
    .catch((err) => {
      console.log("getFullPostByPostId error");
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
};

const deletePost = (postId: string, cb: Function) => {
  console.log("deletePost called");

  axios
    .post(
      `${API_URL}/post/delete`,
      { postId: postId },
      { withCredentials: true }
    )
    .then((response) => {
      console.log("deletePost response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("deletePost error");
      console.log(err);
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
};

const postFilterSubmit = (filter: any, cb: Function) => {
  console.log("postFilterSubmit postFilterSubmit postFilterSubmit");

  cb(null, db.posts);
};

const postCreate = (bodyFormData: any, cb: Function) => {
  axios({
    method: "POST",
    url: `${API_URL}/post/create`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  })
    .then(function (response) {
      console.log("postCreate response");
      console.log(response);
      cb(null, response.data);
    })
    .catch(function (err) {
      console.log("postCreate error");
      console.log(err);
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
};

const fetchFeed = (feedPg: any, cUser: any, cb: Function) => {
  axios
    .post(
      `${API_URL}/post`,
      { feedPg: feedPg },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
      console.log("fetchFeed");
      console.log(response.data);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("fetchFeed error");
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
};

const toggleLikePost = (postId: string, receiverId: string, cb: Function) => {
  axios
    .post(
      `${API_URL}/post/like`,
      { postId, receiverId },
      { withCredentials: true }
    )
    .then((response) => {
      console.log("toggleLikePost response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("toggleLikePost error");
      console.log(err);
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });
  // cb(null, like_arr);
};

const createComment = (comment_obj: TComment, cb: Function) => {
  console.log("comment_objcomment_objcomment_objcomment_obj");
  console.log(comment_obj);

  axios
    .post(`${API_URL}/comment/`, comment_obj, { withCredentials: true })
    .then((response) => {
      console.log("add_comment response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("add_comment error");
      console.log(err);
      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }
    });

  // cb(null, comment_obj);
};

export {
  fetchFeed,
  toggleLikePost,
  createComment,
  postCreate,
  postFilterSubmit,
  deletePost,
  getFullPostByPostId,
  getAllCommentsByPostId,
  getLikesByPostId,
};
