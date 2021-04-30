export interface IPost {
  id: string;
  userName: string;
  createdAt: Date;
  title: string;
  message: string;
  likes: TLikes[];
  commentList: TComment[];
}

export type TLikes = {
  userId: string;
  username: string;
};

export type TComment = {
  id: string;
  userId: string;
  username: string;
  createdAt: Date;
  message: string;
  postId: string;
};
