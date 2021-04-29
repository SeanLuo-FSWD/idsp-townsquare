// import { posts } from "../../FakeDb/posts";
import axios from "axios";
import SERVER_URL from "../../constants/server_url";
import { TComment } from "../../interfaces/IPost";

const fetchFeed = async (cb: Function) => {
  try {
    const posts = await axios.get(`${SERVER_URL}/ts/posts`);
    cb(null, posts.data);
  } catch (error) {
    cb(error);
  }
};

const likePost = async (
  userId: string,
  username: string,
  postId: string,
  liked: boolean,
  cb: Function
) => {
  axios
    .post(`${SERVER_URL}/ts/like_post`, {
      userId: userId,
      username: username,
      liked: liked,
      postId: postId,
    })
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

const addComment = async (comment_obj: TComment, cb: Function) => {
  console.log("comment_objcomment_objcomment_objcomment_obj");

  console.log(comment_obj);

  axios
    .post(`${SERVER_URL}/ts/add_comment`, {
      userId: comment_obj.userId,
      commentId: comment_obj.commentId,
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

export { fetchFeed, likePost, addComment };
