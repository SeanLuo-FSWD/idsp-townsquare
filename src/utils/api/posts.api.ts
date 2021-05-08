// import { db.posts } from "../../FakeDb/db.posts";

import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
// import API_URL from "../../constants/api_url";
import { TComment } from "../../interfaces/IPost";
import { db } from "../../FakeDb/FakeDb";
import { DbHelper } from "./_dbHelper";
// const postCreate = (bodyFormData: any, cb: Function) => {
//   axios({
//     method: "POST",
//     url: `${MOCK_URL}/post`,
//     // url: `${API_URL}/post`,
//     data: bodyFormData,
//     headers: { "Content-Type": "multipart/form-data" },
//     withCredentials: true,
//   })
//     .then(function (response) {
//       console.log("postCreate response");
//       console.log(response);
//       cb(null, response.data);
//     })
//     .catch(function (err) {
//       console.log("postCreate error");
//       console.log(err);
//       cb(err);
//     });
// };

const postRemove = (postId: string, cb: Function) => {
  cb(null, 200);
};

const postFilterSubmit = (filter: any, cb: Function) => {
  console.log("postFilterSubmit postFilterSubmit postFilterSubmit");

  cb(null, db.posts);
};

const postCreate = (fake_post: any, cuser: any, cb: Function) => {
  // db.posts.push(fake_post);

  // db.posts.unshift(fake_post);
  // console.log("1111111111111111111111");

  // console.log("ALL THE POSTS ALL THE POSTS ALL THE POSTS");
  // const dbpost = [fake_post, ...db.posts];
  // const dbpost = db.posts;
  // console.log(dbpost);

  // const newdb = { ...db, posts: dbpost };

  const return_post = { ...fake_post, ["user"]: cuser };

  cb(null, return_post);
};

const fetchFeed = (feedPg: any, cUser: any, cb: Function) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("fetchFeed");
  console.log(feedPg);

  let filtered_posts: any = [];
  let desired_posts: any = [];
  let feed_filter_posts: any = [];
  let db_helper = new DbHelper(feedPg, cUser);

  if (!feedPg.applied) {
    desired_posts = db.posts;

    for (let i = 0; i < desired_posts.length; i++) {
      for (let j = 0; j < db.users.length; j++) {
        if (db.users[j].id === desired_posts[i].userId) {
          desired_posts[i] = {
            ...desired_posts[i],
            ["user"]: { username: db.users[j].username, img: db.users[j].img },
          };
        }
      }
    }

    cb(null, desired_posts);
    return;
  } else {
    feed_filter_posts = db_helper.getPostFromPost();

    filtered_posts = feed_filter_posts;

    const pf = feedPg.people;
    filtered_posts = filtered_posts.filter((p: any) => {
      let user = db.users.find((u) => u.id == p.userId);

      if (feedPg.people) {
        if (db_helper.checkPersonFromPerson(user)) {
          return p;
        }
      }
    });

    desired_posts = filtered_posts;

    for (let i = 0; i < desired_posts.length; i++) {
      for (let j = 0; j < db.users.length; j++) {
        if (db.users[j].id === desired_posts[i].userId) {
          desired_posts[i] = {
            ...desired_posts[i],
            ["user"]: { username: db.users[j].username, img: db.users[j].img },
          };
        }
      }
    }

    cb(null, desired_posts);
    return;

    // try {
    //   const db.posts = await axios.get(`${MOCK_URL}/api/post`);

    //   console.log(db.posts.data.reverse());

    //   cb(null, db.posts.data);
    // } catch (error) {
    //   cb(error);
    // }
  }
};

const likePost = (like_arr: any, cb: Function) => {
  console.log("likePost likePost likePost likePost");

  // axios
  //   .post(`${MOCK_URL}/ts/like_post`, like_arr)
  //   .then((response) => {
  //     console.log("likePost response");
  //     console.log(response);
  //     cb(null, response.data);
  //   })
  //   .catch((err) => {
  //     console.log("likePost error");
  //     console.log(err);
  //     cb(err);
  //   });
  cb(null, like_arr);
};

const addComment = (comment_obj: TComment, cb: Function) => {
  console.log("comment_objcomment_objcomment_objcomment_obj");

  // console.log(comment_obj);
  // cb(null, comment_obj);

  // axios
  //   .post(`${MOCK_URL}/ts/add_comment`, {
  //     userId: comment_obj.userId,
  //     id: comment_obj.id,
  //     username: comment_obj.username,
  //     createdAt: comment_obj.createdAt,
  //     message: comment_obj.message,
  //     postId: comment_obj.postId,
  //   })
  //   .then((response) => {
  //     console.log("add_comment response");
  //     console.log(response);
  //     cb(null, response.data);
  //   })
  //   .catch((err) => {
  //     console.log("add_comment error");
  //     console.log(err);
  //     cb(err);
  //   });

  cb(null, comment_obj);
};

export {
  fetchFeed,
  likePost,
  addComment,
  postCreate,
  postFilterSubmit,
  postRemove,
};
