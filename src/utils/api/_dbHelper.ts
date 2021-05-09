import { db } from "../../FakeDb/FakeDb";

export class DbHelper {
  filter: any = {};
  cUser: any = {};

  constructor(filter: any, cUser: any) {
    this.filter = filter;
    this.cUser = cUser;
  }

  getPostFromPost = () => {
    let feed_filter_posts = [];

    if (!this.filter.applied) {
      return db.posts;
    }
    if (this.filter.feed.keywords.length != 0) {
      let kw_posts = [];
      const kw_arr = this.filter.feed.keywords;
      for (let i = 0; i < db.posts.length; i++) {
        let alive = true;
        for (let j = 0; j < kw_arr.length; j++) {
          if (db.posts[i].message.includes(kw_arr[j])) {
            continue;
          } else {
            alive = false;
            break;
          }
        }

        if (alive) {
          kw_posts.push(db.posts[i]);
        }
      }

      feed_filter_posts = kw_posts;
    } else {
      feed_filter_posts = db.posts;
    }

    if (this.filter.feed.hasImg === true) {
      feed_filter_posts = feed_filter_posts.filter((post: any) => {
        return post.img_urls.length > 0;
      });
    }

    return feed_filter_posts;
  };

  checkPersonFromPerson = (user: any) => {
    let ageCondition = true;
    let genderCondition = true;
    let locCondition = true;

    const pplfilter = this.filter.people;

    if (pplfilter.age.length > 0) {
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
        if (this.cUser.followed.includes(user.id)) {
          return user;
        }
      } else {
        return user;
      }
    }
    return; // added
  };
}
