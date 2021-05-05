export const users = [
  {
    id: "1",
    email: "bob@bob.com",
    username: "bob",
    age: 5,
    gender: "male",
    location: "burnaby",
    last_login: new Date(),
    following: ["2"],
    password: "bob@bob.com",
    img:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
  },
  {
    id: "2",
    email: "alice@alice.com",
    username: "alice",
    age: 50,
    gender: "female",
    location: "vancouver",
    img: "http://www.saltysfishandchips.ca/images/fish_chips.jpg",
    last_login: new Date(),
    following: ["1", "3"],
    password: "alice@alice.com",
  },
  {
    id: "3",
    email: "josh@josh.com",
    username: "josh",
    age: 30,
    gender: "male",
    location: "richmond",
    img:
      "https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.saltys.com/wp-content/uploads/2020/01/good-for-you-crab-1170x781.jpg",
    last_login: new Date(),
    following: [],
    password: "josh@josh.com",
  },
  {
    id: "4",
    email: "cow@cow.com",
    username: "cow",
    age: 30,
    gender: "other",
    location: "richmond",
    img:
      "https://kids.kiddle.co/images/thumb/b/b4/Cow_eating_some_grass.jpg/500px-Cow_eating_some_grass.jpg",
    last_login: new Date(),
    following: [],
    password: "cow@cow.com",
  },
];

export const posts = [
  {
    id: "5",
    userId: "1",
    username: "bob",
    createdAt: new Date(),
    title: "Lorem, ipsum dolor ",
    message:
      "sit amet consectetur adipisicing elit. Maxime deserunt debitis voluptatem modi commodi nostrum officiis minima ut ipsa harum temporibus eum, asperiores soluta, repudiandae qui culpa vel sit dolores.",
    likes: [
      {
        id: "l51",
        userId: "1",
        postId: "5",
        username: "john",
      },
      { id: "l52", userId: 2, username: "jack", postId: "5" },
    ],
    commentList: [
      {
        id: "c51",
        userId: "1",
        username: "john",
        createdAt: new Date(),
        message: "john comment 1",
        postId: "5",
      },
      {
        id: "c52",
        userId: "2",
        username: "aaa",
        createdAt: new Date(),
        message: "aaa comment",
        postId: "5",
      },
      {
        id: "c53",
        userId: "3",
        username: "bbb",
        createdAt: new Date(),
        message: "bbb comment",
        postId: "5",
      },
    ],
  },
  {
    id: "4",
    userId: "2",
    title: "super post",
    username: "alice",
    createdAt: new Date(),
    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt debitis voluptatem modi commodi nostrum officiis minima ut ipsa harum temporibus eum, asperiores soluta, repudiandae qui culpa vel sit dolores.",
    likes: [
      {
        id: "l41",
        userId: "1",
        postId: "4",
        username: "john",
      },
      { id: "l42", userId: 2, postId: "4", username: "jack" },
      { id: "l43", userId: 3, postId: "4", username: "nonexist" },
    ],
    commentList: [
      {
        id: "c41",
        userId: "1",
        username: "john",
        createdAt: new Date(),
        message: "john comment 1",
        postId: "5",
      },
    ],
  },
  {
    id: "3",
    userId: "3",
    username: "josh",
    title: "title post 2 lorem",
    createdAt: new Date(),

    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime deserunt debitis voluptatem modi commodi nostrum officiis minima ut ipsa harum temporibus eum, asperiores soluta, repudiandae qui culpa vel sit dolores.",
    likes: [
      {
        id: "l31",
        userId: "1",
        postId: "3",
        username: "john",
      },
      { id: "l32", userId: 2, postId: "3", username: "jack" },
    ],
    commentList: [
      {
        id: "c32",
        userId: "2",
        username: "aaa",
        postId: "5",
        createdAt: new Date(),
        message: "aaa comment",
      },
      {
        id: "c33",
        userId: "3",
        username: "bbb",
        postId: "5",
        createdAt: new Date(),
        message: "bbb comment",
      },
    ],
  },
];
