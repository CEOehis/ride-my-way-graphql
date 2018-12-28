import { User } from '../database/models';

module.exports = {
  info: () => 'This is the GraphQL API for Ride My Way',

  getUsers: async () => {
    const users = await User.findAll();
    return users;
  }
};