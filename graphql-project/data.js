const authors = [
  {
    id: "1",
    name: "Kate",
    surname: "Chopin",
    age: 45,
  },
  {
    id: "2",
    name: "Zeyneb",
    surname: "Öztürk",
    age: 25,
    books: [
      { id: "1", title: "Test title", score: 9, isPublished: false },
      { id: "2", title: "Test title 2", score: 9, isPublished: false },
    ],
  },
];

const books = [
  {
    id: "1",
    title: "The Awakening",
    author_id: "1",
    score: 9.6,
    isPublished: true,
  },
  {
    id: "2",
    title: "Deneme kitap",
    author_id: "2",
    score: 6,
    isPublished: false,
  },
  {
    id: "3",
    title: "Deneme kitap 2",
    author_id: "2",
    score: 7.6,
    isPublished: true,
  },
];

module.exports = {
  authors,
  books,
};
