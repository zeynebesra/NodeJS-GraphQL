const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { users, events, participants, locations } = require("./data");
const { nanoid } = require("nanoid");

const typeDefs = gql`
  type Event {
    id: ID!
    title: String!
    desc: String!
    date: String!
    from: String
    to: String
    location_id: String
    user_id: String
    user: User
    location: Location
    participants: [Participant!]!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    events: [Event]!
  }

  input CreateUserInput {
    username: String!
    email: String!
  }

  input UpdateUserInput {
    username: String
    email: String
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Location {
    id: ID!
    name: String!
    desc: String!
    lat: String!
    Ing: String!
  }

  type Participant {
    id: ID!
    user_id: String!
    event_id: String!
    user: User!
  }

  type Query {
    # Event
    events: [Event!]!
    event(id: ID!): Event!

    # User
    users: [User!]!
    user(id: ID!): User!

    # Location
    locations: [Location!]!
    location(id: ID!): Location!

    # Participant
    participants: [Participant!]!
    participant(id: ID): Participant!
  }

  type Mutation {
    # User
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!
  }
`;

const resolvers = {
  //Mutation
  Mutation: {
    createUser: (parent, { data }) => {
      const user = {
        id: nanoid(),
        ...data,
      };
      users.push(user);
      return user;
    },
    updateUser: (parent, { id, data }) => {
      const user_index = users.findIndex((user) => user.id === id);

      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const updated_user = (users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updated_user;
    },
    deleteUser: (parent, { id }) => {
      const user_index = users.findIndex((user) => user.id === id);
      if (user_index === -1) {
        throw new Error("User not found.");
      }

      const deleted_user = users[user_index];
      users.splice(user_index, 1);

      return deleted_user;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },
  },
  Query: {
    users: () => users,
    user: (parent, args) => users.find((user) => user.id === args.id),

    events: () => events,
    event: (parent, args) => events.find((event) => event.id === args.id),
    locations: () => locations,
    location: (parent, args) =>
      locations.find((location) => location.id === args.id),
    participants: () => participants,
    participant: (parent, args) =>
      participants.find((participant) => participant.id === args.id),
  },
  Event: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
    participants: (parent) =>
      participants.filter((participant) => participant.event_id === parent.id),
    location: (parent) =>
      locations.find((location) => location.id === parent.location_id),
  },
  Participant: {
    user: (parent) => users.find((user) => user.id === parent.user_id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
