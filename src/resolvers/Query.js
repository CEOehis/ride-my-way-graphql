module.exports = {
  info: () => 'This is the GraphQL API for Ride My Way',

  getUsers: async (_, __, { models, authedUser }) => {
    if(!authedUser) {
      throw new Error('You are not authenticated');
    }
    const users = await models.User.findAll();
    return users;
  }
};