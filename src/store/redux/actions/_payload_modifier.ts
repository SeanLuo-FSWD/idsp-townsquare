import { schema, normalize } from "normalizr";
import { IPost, TLikes } from "../../../interfaces/IPost";

function normalizing(result: IPost[]) {
  const commentSchema = new schema.Entity("commentList");
  const likesSchema = new schema.Entity("likes");

  const feedSchema = new schema.Entity("posts", {
    commentList: [commentSchema],
    likes: [likesSchema],
  });

  const normed_data = normalize(result, [feedSchema]);
  console.log("normed_data, normed_data, normed_data, normed_data");

  console.log(normed_data);
  return normed_data;
}

export { normalizing };
