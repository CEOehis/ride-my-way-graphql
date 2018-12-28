import { GraphQLServer } from 'graphql-yoga';
import db from './database/models';

const typeDefs = `
type Query {
  info: String!
  getUsers: [User!]
}

type User {
  id: ID!
}
`;

const resolvers = {
  Query: {
    info: () => 'This is the GraphQL API for Ride My Way',

    getUsers: async () => {
      const users = await db.User.findAll();
      return users;
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => console.log('Server is running on http://localhost:4000 🚀🚀🚀'));
