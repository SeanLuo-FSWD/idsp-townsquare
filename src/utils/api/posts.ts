// import { posts } from "../../FakeDb/posts";
import axios from "axios";
import SERVER_URL from "../../constants/server_url";

const fetchFeed = async (cb: Function) => {
  console.log("process.env.NODE_ENV");
  console.log(process.env.NODE_ENV);

  try {
    const posts = await axios.get(`${SERVER_URL}/ts/posts`);
    cb(null, posts.data);
  } catch (error) {
    cb(error);
  }
};

export default fetchFeed;
