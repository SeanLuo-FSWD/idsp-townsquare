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
      console.log("getLikesByPostId response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("getLikesByPostId error");
      cb(null, error);
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
    .catch((error) => {
      console.log("getFullPostByPostId error");
      cb(null, error);
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
    .catch((error) => {
      console.log("getFullPostByPostId error");
      cb(null, error.response.data.message);
    });
};

const postRemove = (postId: string, cb: Function) => {
  cb(null, 200);
};

const postFilterSubmit = (filter: any, cb: Function) => {
  console.log("postFilterSubmit postFilterSubmit postFilterSubmit");

  cb(null, db.posts);
};

const postCreate = (bodyFormData: any, cb: Function) => {
  axios({
    method: "POST",
    url: `${API_URL}/post`,
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
      cb(err);
    });
};

const fetchFeed = (feedPg: any, cUser: any, cb: Function) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("fetchFeed");
  axios
    .get(`${API_URL}/post`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("fetchFeed response");
      console.log(response.data);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("fetchFeed error");
      cb(null, error);
    });
};

const toggleLikePost = (postId: any, cb: Function) => {
  console.log("1111111111111111111111");
  console.log(postId);

  axios
    .post(`${API_URL}/post/like`, { postId: postId }, { withCredentials: true })
    .then((response) => {
      console.log("toggleLikePost response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("toggleLikePost error");
      console.log(err);
      cb(err);
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
      cb(err);
    });

  // cb(null, comment_obj);
};

export {
  fetchFeed,
  toggleLikePost,
  createComment,
  postCreate,
  postFilterSubmit,
  postRemove,
  getFullPostByPostId,
  getAllCommentsByPostId,
  getLikesByPostId,
};
