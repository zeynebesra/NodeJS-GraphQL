const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { books, authors } = require("./data");
const typeDefs = gql`
  type Author {
    id: ID!
    name: String
    surname: String
    age: Int
    books(filter: String): [Book!]
  }

  type Book {
    id: ID!
    title: String
    author: Author
    author_id: String!
    score: Float
    isPublished: Boolean
  }

  type Query {
    books: [Book!]
    book(id: ID!): Book!
    authors: [Author!]
    author(id: ID!): Author!
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    book: (parent, args) => books.find((book) => book.id === args.id),

    authors: () => authors,
    author: (parent, args) => authors.find((author) => author.id === args.id),
  },
  Book: {
    author: (parent) =>
      authors.find((author) => author.id === parent.author_id),
  },

  Author: {
    books: (parent, args) => {
      let filtered = books.filter((book) => book.author_id === parent.id);
      if (args.filter) {
        filtered = filtered.filter((book) =>
          book.title.toLowerCase().startsWith(args.filter.toLowerCase())
        );
      }
      return filtered;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => console.log(`Apollo server is up at ${url}`));
