export interface IPost {
  postId: string;
  userName: string;
  createdAt: Date;
  message: string;
  likes: TLikes[];
  commentList: TComment[];
}

export type TLikes = {
  userId: string;
  username: string;
};

export type TComment = {
  commentId: string;
  userId: string;
  username: string;
  createdAt: Date;
  message: string;
  postId: string;
};
