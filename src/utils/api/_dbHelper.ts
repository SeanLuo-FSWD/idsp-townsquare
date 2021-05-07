import { users, posts } from "../../FakeDb/FakeDb";

export class DbHelper {
  filter: any = {};

  constructor(filter: any) {
    this.filter = filter;
  }

  getPostFromPost = () => {
    let feed_filter_posts = [];

    if (!this.filter.applied) {
      return posts;
    }
    if (this.filter.feed.keywords.length != 0) {
      let kw_posts = [];
      console.log("1111111111111111111111");
      console.log(this.filter.feed.keywords);

      const kw_arr = this.filter.feed.keywords;
      for (let i = 0; i < posts.length; i++) {
        let alive = true;
        for (let j = 0; j < kw_arr.length; j++) {
          console.log("2222222222222222");
          console.log(posts[i].message);
          console.log(kw_arr[j]);

          if (posts[i].message.includes(kw_arr[j])) {
            console.log("3333333333333333");

            continue;
          } else {
            alive = false;
            break;
          }
        }

        if (alive) {
          console.log("444444444444444444");
          kw_posts.push(posts[i]);
        }
      }

      feed_filter_posts = kw_posts;
    } else {
      feed_filter_posts = posts;
    }

    if (this.filter.feed.hasImg === true) {
      console.log("1111111111111111111111");
      console.log("1111111111111111111111");
      feed_filter_posts = feed_filter_posts.filter((post: any) => {
        console.log("2222222222222222");
        console.log(post);
        return post.img_urls.length > 0;
      });
    }

    return feed_filter_posts;
  };

  checkPersonFromPerson = (user: any) => {
    let ageCondition = true;
    let genderCondition = true;
    let locCondition = true;
    if (this.filter.people.age) {
      ageCondition =
        user.age >= this.filter.people.age[0] &&
        user.age <= this.filter.people.age[1];
    }
    if (this.filter.people.gender) {
      genderCondition = this.filter.people.gender.includes(user.gender);
    }
    if (this.filter.people.location) {
      locCondition = this.filter.people.location.includes(user.location);
    }

    if (ageCondition && genderCondition && locCondition) {
      if (this.filter.people.followed) {
        //Faking the followed user here, in real BE, would use req.user
        console.log("wassssup here?");

        if (user.id === "2") {
          return user;
        }
      } else {
        return user;
      }
    }
  };
}
