// import { posts } from "../../FakeDb/posts";

import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
// import API_URL from "../../constants/api_url";
import { TComment } from "../../interfaces/IPost";
import { users, posts } from "../../FakeDb/FakeDb";

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
  cb(null, fake_post);
};

const fetchFeed = async (f_filter: any, cb: Function) => {
  let filtered_posts: any = [];
  let desired_posts: any = [];
  console.log("2222222222222222");
  console.log(f_filter);

  if (f_filter) {
    if (f_filter.feedFilter && Object.keys(f_filter.feedFilter).length !== 0) {
      if (f_filter.feedFilter.keywords) {
        const kw_arr = f_filter.feedFilter.keywords;
        for (let i = 0; i < posts.length; i++) {
          let alive = true;
          for (let j = 0; j < kw_arr.length; j++) {
            if (posts[i].message.includes(kw_arr[j])) {
              continue;
            } else {
              alive = false;
              break;
            }
          }

          if (alive) {
            filtered_posts.push(posts[i]);
          }
        }
      } else {
        filtered_posts = posts;
      }

      if (f_filter.feedFilter.hasImg) {
        filtered_posts = filtered_posts.filter((post: any) => {
          return post.img_urls.length > 0;
        });
      }
    }

    if (f_filter && f_filter.peopleFilter) {
      const pf = f_filter.peopleFilter;
      filtered_posts = posts.filter((p: any) => {
        // get Person
        console.log("3333333333333333");
        console.log(filtered_posts);
        console.log(p);

        let user = users.find((u) => u.id == p.userId);

        if (user) {
          console.log("444444444444444444");

          console.log(user);
          console.log(pf);

          //perform all logic for that p
          let ageCondition = true;
          let genderCondition = true;
          let locCondition = true;
          if (pf.age) {
            ageCondition = user.age >= pf.age[0] && user.age <= pf.age[1];
          }
          if (pf.gender) {
            genderCondition = pf.gender.includes(user.gender);
          }
          if (pf.location) {
            console.log("55555555555555555");
            console.log("55555555555555555");
            console.log(pf.location);
            console.log(user.location);

            locCondition = pf.location.includes(user.location);
            console.log("zzzzzzzzzzzzzzzzzzzzzzz");
            console.log(ageCondition);
            console.log(genderCondition);
            console.log(locCondition);
          }

          // if (pf.followed) {
          //   console.log("55555555555555555");
          //   console.log(p.userId);
          //   console.log(user.followed);

          //   followedCondition = user.followed.includes(p.userId);
          // }

          if (ageCondition && genderCondition && locCondition) {
            return p;
          }
        } else {
          cb(new Error("user not found"));
          return;
        }
      });

      if (pf.followed) {
        filtered_posts = filtered_posts.filter((p: any) => {
          if (["2"].includes(p.userId)) {
            return p;
          }
        });
      }
    }

    // cb(null, filtered_posts);
    desired_posts = filtered_posts;
  } else {
    // cb(null, posts);
    desired_posts = posts;
  }

  for (let i = 0; i < desired_posts.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[j].id === desired_posts[i].userId) {
        desired_posts[i] = {
          ...desired_posts[i],
          ["user"]: { username: users[j].username, img: users[j].img },
        };
      }
    }
  }

  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(desired_posts);

  cb(null, desired_posts);

  // try {
  //   const posts = await axios.get(`${MOCK_URL}/api/post`);

  //   console.log(posts.data.reverse());

  //   cb(null, posts.data);
  // } catch (error) {
  //   cb(error);
  // }
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
