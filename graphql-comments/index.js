const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const { users, posts, comments } = require("./data");

const typeDefs = gql`
  type User {
    id: ID!
    fullName: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
  }

  type Comment {
    id: ID!
    text: String!
    post_id: ID!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!

    posts: [Post!]!
    post(id: ID!): Post!

    comments: [Comment!]!
    comment(id: ID!): Comment!
  }
`;

const resolvers = {
  Query: {
    //user
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),
    //post
    posts: () => posts,
    post: (parent, args) => posts.find((post) => post.id === args.id),

    //comment
    comments: () => comments,
    comment: (parent, args) =>
      comments.find((comment) => comment.id === args.id),
  },
  User: {
    posts: (parent) => posts.filter((post) => post.user_id === parent.id),
  },
  Post: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
  },
  Comment: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
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

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
