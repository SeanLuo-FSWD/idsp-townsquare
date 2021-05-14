const db = {
  users: [
    {
      id: "1",
      email: "bob@bob.com",
      username: "bob",
      age: 5,
      gender: "male",
      location: "Burnaby",
      last_login: new Date().toDateString(),
      followed: ["2", "3"],
      password: "bob@bob.com",
      img:
        "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      alert: [
        { type: "liked", postId: "5", username: "vince", id: "9" },
        { type: "commented", postId: "5", username: "beth", id: "8" },
        { type: "followed", userId: "2", username: "beth", id: "7" },
      ],
      chats: ["1", "2"],
    },
    {
      id: "2",
      email: "beth@beth.com",
      username: "beth",
      age: 35,
      gender: "female",
      location: "Burnaby",
      img:
        "https://d2k0ddhflgrk1i.cloudfront.net/_processed_/f/0/csm_nicholas_smeele_profile_square_3e56eadec7.jpg",
      last_login: new Date().toDateString(),
      followed: ["1", "3"],
      password: "beth@beth.com",
      chats: ["1"],
    },
    {
      id: "3",
      email: "vince@vince.com",
      username: "vince",
      age: 25,
      gender: "male",
      location: "Vancouver",
      img:
        "https://sunrift.com/wp-content/uploads/2014/12/Blake-profile-photo-square.jpg",
      last_login: new Date().toDateString(),
      followed: [],
      password: "vince@vince.com",
      chats: ["2"],
    },
    {
      id: "4",
      email: "gates@gmail.com",
      username: "richard",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://64.media.tumblr.com/e2a530423601b12e1bf0bcbedb74384b/tumblr_pad0bae3lq1wsv7oso4_400.png",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "5",
      email: "bates@gmail.com",
      username: "richard",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLsHOfu_zeYIfOSdvTNTPRQKWsC7Yug2NHcEHbVpaZj2KW8bDENpgIdf2TTqJ-2K1uh94&usqp=CAU",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "6",
      email: "aates@gmail.com",
      username: "Jim",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://res-1.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco/v1443584492/vosgqpvicpjgknz2rn2l.png",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "7",
      email: "hates@gmail.com",
      username: "Joe",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://miro.medium.com/max/640/0*J9rnGfydbw0hf-oU.png",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "8",
      email: "qates@gmail.com",
      username: "Joe",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=6&m=638756792&s=612x612&w=0&h=4OBakrSLCzjRrgvAe1ZV0jkReI_88u3bUM7FV_UA5dc=",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "9",
      email: "lates@gmail.com",
      username: "Joe",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=6&m=638756792&s=612x612&w=0&h=4OBakrSLCzjRrgvAe1ZV0jkReI_88u3bUM7FV_UA5dc=",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "10",
      email: "tates@gmail.com",
      username: "Joe",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://ctwbdc.org/wp-content/uploads/2019/05/Shivonne-Mathison-Cura-Square-Shot.jpg",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
    {
      id: "11",
      email: "lllkates@gmail.com",
      username: "Joe",
      age: 15,
      gender: "other",
      location: "Richmond",
      img:
        "https://i.imgur.com/eW4axvK.png",
      last_login: new Date().toDateString(),
      followed: [],
      password: "Denisha",
      chats: [],
    },
  ],
  chats: [
    {
      id: "1",
      chatters: [
        {
          userId: "1",
          username: "bob",
          img:
            "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
        },
        {
          userId: "2",
          username: "beth",
          img:
            "https://media.istockphoto.com/photos/beautiful-woman-posing-against-dark-background-picture-id638756792?k=6&m=638756792&s=612x612&w=0&h=4OBakrSLCzjRrgvAe1ZV0jkReI_88u3bUM7FV_UA5dc=",
        },
      ],
      messages: [
        {
          id: "1",
          userId: "2",
          timeStamp: new Date().toString(),
          text: "hello bob",
        },
        {
          id: "2",
          userId: "1",
          timeStamp: new Date().toString(),
          text: "Hey beth",
        },
        {
          id: "3",
          userId: "2",
          timeStamp: new Date().toString(),
          text: "how are you?",
        },
      ],
    },
    {
      id: "2",
      chatters: [
        {
          userId: "1",
          username: "bob",
          img:
            "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
        },
        {
          userId: "3",
          username: "vince",
          img:
            "https://miro.medium.com/max/640/0*J9rnGfydbw0hf-oU.png",
        },
      ],
      messages: [
        {
          id: "1",
          userId: "1",
          timeStamp: new Date().toString(),
          text: "sup vince",
        },
        {
          id: "2",
          userId: "3",
          timeStamp: new Date().toString(),
          text: "not much, you?",
        },
      ],
    },
  ],
  posts: [
    {
      id: "2",
      userId: "4",
      username: "Natasha",
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
          username: "Jessica",
          postId: "5",
          createdAt: new Date().toDateString(),
          message: "Awesome shot!",
        },
        {
          id: "c21",
          userId: "97",
          username: "Jacob",
          postId: "2",
          createdAt: new Date().toDateString(),
          message: "Great picture.",
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
      username: "Kevin",
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
      username: "Vince",
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
  ],
};

export { db };
