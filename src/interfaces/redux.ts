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

export default interface IFilter {
  person: {
    age: number;
    gender: string;
    location: string;
  };
  feed: {
    keyword: string[];
    hasImg: boolean;
  };
  error: string | null;
}

export default interface IAddedGroup {
  avatar: string;
  username: string;
  _id: string;
}
