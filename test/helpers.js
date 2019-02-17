import { graphql } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { default as typeDefs } from '../src/schema';
import resolvers from '../src/resolvers';
import models, { sequelize } from '../src/database/models';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export const runQuery = async (query, variables, authedUser) => {
  return graphql(schema, query, {}, { models, authedUser }, variables);
}

export const resetDB = async () => {
  return await sequelize.sync({ force: true });
}
