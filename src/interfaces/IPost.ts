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
  userId: string;
  username: string;
  createdAt: Date;
  message: string;
  commentId: string;
};
