import IPost from "./IPost";

export default interface IFeed {
  posts: IPost[];
  error: string | null;
}
