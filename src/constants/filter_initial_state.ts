const FILTER_INITIAL_STATE: any = {
  feedPg: {
    applied: false,
    people: {
      age: [0, 100],
      gender: ["female", "male", "other"],
      location: ["Burnaby", "Richmond", "Coquitlam", "Vancouver", "Surrey"],
      followed: false,
    },
    feed: {
      keywords: [],
      hasImg: false,
    },
  },
  peoplePg: {
    applied: false,
    people: {
      age: [0, 100],
      gender: ["female", "male", "other"],
      location: ["Burnaby", "Richmond", "Coquitlam", "Vancouver", "Surrey"],
      followed: false,
    },
    feed: {
      keywords: [],
      hasImg: false,
    },
  },

  error: null,
};

export default FILTER_INITIAL_STATE;
