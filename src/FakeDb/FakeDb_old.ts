// export const users = [
const users = [
  {
    id: "1",
    email: "bob@bob.com",
    username: "Bob",
    age: 5,
    gender: "male",
    location: "Burnaby",
    last_login: new Date().toDateString(),
    followed: ["2", "3"],
    password: "bob@bob.com",
    img:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
  },
  {
    id: "2",
    email: "beth@beth.com",
    username: "beth",
    age: 35,
    gender: "female",
    location: "Burnaby",
    img: "http://www.saltysfishandchips.ca/images/fish_chips.jpg",
    last_login: new Date().toDateString(),
    followed: ["1", "3"],
    password: "beth@beth.com",
  },
  {
    id: "3",
    email: "vince@vince.com",
    username: "Vince",
    age: 25,
    gender: "male",
    location: "Vancouver",
    img:
      "https://cdn.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://www.saltys.com/wp-content/uploads/2020/01/good-for-you-crab-1170x781.jpg",
    last_login: new Date().toDateString(),
    followed: [],
    password: "vince@vince.com",
  },
  {
    id: "4",
    email: "gates@gmail.com",
    username: "Richard",
    age: 15,
    gender: "other",
    location: "Richmond",
    img:
      "https://kids.kiddle.co/images/thumb/b/b4/Cow_eating_some_grass.jpg/500px-Cow_eating_some_grass.jpg",
    last_login: new Date().toDateString(),
    followed: [],
    password: "Denisha",
  },
];

// export const posts = [
const posts = [
  {
    id: "2",
    userId: "4",
    username: "Richard",
    createdAt: new Date().toDateString(),
    img_urls: [
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bbyoda-1575303784.jpeg?resize=480:*",
      "https://c4.wallpaperflare.com/wallpaper/635/116/944/fiction-warhammer-40000-warhammer-art-wallpaper-preview.jpg",
    ],
    message:
      "000 111 222 333 There was something in the tree. It was difficult to tell from the ground, but Rachael could see movement. She squinted her eyes and peered in the direction of the movement, trying to decipher exactly what she had spied.",
    likes: [
      {
        id: "l21",
        userId: "99",
        postId: "3",
        username: "john",
      },
      { id: "l32", userId: 2, postId: "2", username: "jack" },
    ],
    commentList: [
      {
        id: "c21",
        userId: "98",
        username: "aaa",
        postId: "5",
        createdAt: new Date().toDateString(),
        message: "aaa comment",
      },
      {
        id: "c21",
        userId: "97",
        username: "bbb",
        postId: "2",
        createdAt: new Date().toDateString(),
        message: "bbb comment",
      },
    ],
  },
  {
    id: "5",
    userId: "1",
    username: "Bob",
    createdAt: new Date().toDateString(),
    img_urls: [],
    message:
      "333 Dave wasn't exactly sure how he had ended up in this predicament. He ran through all the events that had lead to this current situation and it still didn't make sense. He wanted to spend some time to try and make sense of it all, but he had higher priorities at the moment.",
    likes: [
      {
        id: "l51",
        userId: "99",
        postId: "5",
        username: "john",
      },
      { id: "l52", userId: 2, username: "jack", postId: "5" },
    ],
    commentList: [
      {
        id: "c51",
        userId: "99",
        username: "john",
        createdAt: new Date().toDateString(),
        message: "john comment 1",
        postId: "5",
      },
      {
        id: "c52",
        userId: "98",
        username: "aaa",
        createdAt: new Date().toDateString(),
        message: "aaa comment",
        postId: "5",
      },
      {
        id: "c53",
        userId: "97",
        username: "bbb",
        createdAt: new Date().toDateString(),
        message: "bbb comment",
        postId: "5",
      },
    ],
  },
  {
    id: "4",
    userId: "2",
    username: "beth",
    createdAt: new Date().toDateString(),
    img_urls: [
      "https://i.pinimg.com/originals/b8/fe/0d/b8fe0da10ed33f5a31a44ae9d03cd40e.jpg",
    ],
    message:
      "222 333 She's asked the question so many times that she barely listened to the answers anymore. The answers were always the same. Well, not exactly the same, but the same in a general sense. A more accurate description was the answers never surprised her.",
    likes: [
      {
        id: "l41",
        userId: "99",
        postId: "4",
        username: "john",
      },
      { id: "l42", userId: 2, postId: "4", username: "jack" },
      { id: "l43", userId: 3, postId: "4", username: "nonexist" },
    ],
    commentList: [
      {
        id: "c41",
        userId: "99",
        username: "john",
        createdAt: new Date().toDateString(),
        message: "john comment 1",
        postId: "5",
      },
    ],
  },
  {
    id: "3",
    userId: "3",
    username: "vince",
    createdAt: new Date().toDateString(),
    img_urls: [],
    message:
      "111 222 333 There was something in the tree. It was difficult to tell from the ground, but Rachael could see movement. She squinted her eyes and peered in the direction of the movement, trying to decipher exactly what she had spied.",
    likes: [
      {
        id: "l31",
        userId: "99",
        postId: "3",
        username: "john",
      },
      { id: "l32", userId: 2, postId: "3", username: "jack" },
    ],
    commentList: [
      {
        id: "c32",
        userId: "98",
        username: "aaa",
        postId: "5",
        createdAt: new Date().toDateString(),
        message: "aaa comment",
      },
      {
        id: "c33",
        userId: "97",
        username: "bbb",
        postId: "5",
        createdAt: new Date().toDateString(),
        message: "bbb comment",
      },
    ],
  },
];

export { users, posts };
