import { posts } from "../FakeDb/posts";
import axios from "axios";

const fetchFeed = async () => {
  const posts = await axios.get("http://localhost:8080/ts/posts");

  return posts.data;
};

export default fetchFeed;
