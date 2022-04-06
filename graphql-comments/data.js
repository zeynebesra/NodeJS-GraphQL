const users = [
  {
    id: "1",
    fullName: "Zeyneb Esra Öztürk",
    age: 25,
  },
  {
    id: "2",
    fullName: "Eda Öztürk",
    age: 58,
  },
];

const posts = [
  {
    id: "1",
    title: "Zey in postu",
    user_id: "1",
  },
  {
    id: "2",
    title: "Zey in postu",
    user_id: "1",
  },
];

const comments = [
  {
    id: "1",
    text: "naberr",
    post_id: "1",
    user_id: "2",
  },
  {
    id: "2",
    text: "nasılsın",
    post_id: "1",
    user_id: "1",
  },
  {
    id: "3",
    text: "iyi misin",
    post_id: "2",
    user_id: "2",
  },
];
module.exports = { users, posts, comments };
