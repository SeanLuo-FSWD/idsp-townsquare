import { IPost } from "../../../interfaces/IPost";
import IFeed from "../../../interfaces/redux";

const getFeed = (feedState: IFeed) => {
  return feedState;
};

const getFeedError = (feedState: IFeed) => feedState.error;

export { getFeed, getFeedError };
