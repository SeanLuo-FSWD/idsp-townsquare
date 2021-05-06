// import { posts } from "../../FakeDb/posts";
import axios from "axios";
import MOCK_URL from "../../constants/mock_server_url";
import API_URL from "../../constants/api_url";
import { TComment } from "../../interfaces/IPost";

const postCreate_old = (post_obj: {}, cb: Function) => {
  axios
    .post(`${MOCK_URL}/ts/create_post`, {
      post_obj,
    })
    .then((response) => {
      console.log("postCreate response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("postCreate error");
      console.log(err);
      cb(err);
    });
};

const postCreate = (bodyFormData: any, cb: Function) => {
  axios({
    method: "POST",
    // url: `${MOCK_URL}/ts/create_post`,
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

const fetchFeed = async (cb: Function) => {
  try {
    const posts = await axios.get(`${MOCK_URL}/api/post`);

    console.log(posts.data.reverse());

    cb(null, posts.data);
  } catch (error) {
    cb(error);
  }
};

const likePost = (like_obj: any, cb: Function) => {
  axios
    .post(`${MOCK_URL}/ts/like_post`, like_obj)
    .then((response) => {
      console.log("likePost response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("likePost error");
      console.log(err);
      cb(err);
    });
};

const addComment = (comment_obj: TComment, cb: Function) => {
  console.log("comment_objcomment_objcomment_objcomment_obj");

  console.log(comment_obj);

  axios
    .post(`${MOCK_URL}/ts/add_comment`, {
      userId: comment_obj.userId,
      id: comment_obj.id,
      username: comment_obj.username,
      createdAt: comment_obj.createdAt,
      message: comment_obj.message,
      postId: comment_obj.postId,
    })
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
};

export { fetchFeed, likePost, addComment, postCreate };