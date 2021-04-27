import { posts } from "../../FakeDb/posts";
import axios from "axios";

const fetchFeed = async (cb: Function) => {
  try {
    const posts = await axios.get("http://localhost:8080/ts/posts");
    cb(null, posts.data);
  } catch (error) {
    cb(error);
  }
};

export default fetchFeed;
