export default interface IPost {
  postId: number;
  userName: string;
  createdAt: Date;
  message: string;
  comments: string;
  likes: string;
  commentList: string[];
}
