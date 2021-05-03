import { IPost } from "./IPost";
import { IUser } from "./IUser";

export default interface IFeed {
  posts: IPost[];
  error: string | null;
}

export default interface IUsers {
  users: IUser[];
  error: string | null;
}
