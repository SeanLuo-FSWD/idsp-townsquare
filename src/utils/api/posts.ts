// import { posts } from "../../FakeDb/posts";
import axios from "axios";
import SERVER_URL from "../../constants/server_url";

const fetchFeed = async (cb: Function) => {
  try {
    const posts = await axios.get(`${SERVER_URL}/ts/posts`);
    cb(null, posts.data);
  } catch (error) {
    cb(error);
  }
};

const likePost = async (userId: string, postId: string, cb: Function) => {
  axios
    .post(`${SERVER_URL}/ts/like_post`, {
      userId: userId,
      postId: postId,
    })
    .then((response) => {
      console.log("likePost response");
      console.log(response);
      cb(null, response.status);
    })
    .catch((err) => {
      console.log("likePost error");
      console.log(err);
      cb(err);
    });
};

export { fetchFeed, likePost };
