// import { posts } from "../../FakeDb/posts";

import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
// import API_URL from "../../constants/api_url";
import { TComment } from "../../interfaces/IPost";
import { users, posts } from "../../FakeDb/FakeDb";
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

const postFilterSubmit = (filter: any, cb: Function) => {
  cb(null, posts);
};

const postCreate = (fake_post: any, cb: Function) => {
  console.log("ggggggggggggggggggggggg");
  console.log("ggggggggggggggggggggggg");
  console.log(fake_post);

  // posts.push(fake_post);
  // posts.unshift(fake_post);

  cb(null, fake_post);
};

const fetchFeed = (feedPg: any, cb: Function) => {
  let filtered_posts: any = [];
  let desired_posts: any = [];
  let feed_filter_posts: any = [];

  if (!feedPg.applied) {
    desired_posts = posts;

    for (let i = 0; i < desired_posts.length; i++) {
      for (let j = 0; j < users.length; j++) {
        console.log("???????? look for new post");
        console.log(desired_posts[i]);

        if (users[j].id === desired_posts[i].userId) {
          console.log("--------------------");
          console.log("fffffffffffffffffffffff");
          console.log(users[j]);
          console.log("desired_posts[i].userId " + desired_posts[i].userId);

          desired_posts[i] = {
            ...desired_posts[i],
            ["user"]: { username: users[j].username, img: users[j].img },
          };

          console.log("xxxxxxxxxxxxxxxxxxxxxx");
          console.log(desired_posts[i]);
        }
      }
    }
    cb(null, desired_posts);
  } else {
    let db_helper = new DbHelper(feedPg);

    feed_filter_posts = db_helper.getPostFromPost();

    filtered_posts = feed_filter_posts;
    //// ==================================== all above objectified

    const pf = feedPg.people;
    filtered_posts = filtered_posts.filter((p: any) => {
      // get Person

      let user = users.find((u) => u.id == p.userId);
      console.log("okay why is this even running given no filter applied?");
      console.log(feedPg.people);

      if (feedPg.people) {
        if (db_helper.checkPersonFromPerson(user)) {
          return p;
        }
      }
    });

    // cb(null, filtered_posts);
    desired_posts = filtered_posts;

    console.log("ddddddddddddddddddddddd");
    console.log("ddddddddddddddddddddddd");
    for (let i = 0; i < desired_posts.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (users[j].id === desired_posts[i].userId) {
          console.log("fffffffffffffffffffffff");
          console.log("fffffffffffffffffffffff");
          console.log("users[j].id " + users[j]);
          console.log("desired_posts[i].userId " + desired_posts[i].userId);

          desired_posts[i] = {
            ...desired_posts[i],
            ["user"]: { username: users[j].username, img: users[j].img },
          };
        }
      }
    }

    console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
    console.log("desired posts");
    console.log(desired_posts);

    cb(null, desired_posts);

    // try {
    //   const posts = await axios.get(`${MOCK_URL}/api/post`);

    //   console.log(posts.data.reverse());

    //   cb(null, posts.data);
    // } catch (error) {
    //   cb(error);
    // }
  }
};

const likePost = (like_arr: any, cb: Function) => {
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

export { fetchFeed, likePost, addComment, postCreate, postFilterSubmit };
