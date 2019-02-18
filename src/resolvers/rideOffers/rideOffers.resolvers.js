export default {
  Mutation: {
    createRideOffer: async function createRideOffer(parent, args,{ models, authedUser }) {
      if(!authedUser || authedUser instanceof Error) {
        const errorMessage = authedUser ? authedUser.message : 'You are not authenticated';
        throw new Error(errorMessage);
      }

      const { input } = args;
      /*
        TODO: create custom handler for errors that can parse an error object
        and properly format the errors before returning for graphql to handle
        this would likely be used in a try catch
      */
      const rideOffer = await models.RideOffer.create({...input, userId: authedUser.id});

      return rideOffer;
    }
  },

  RideOffer: {
    offeredBy: async function user(rideOffer, args, { models }) {
      return await models.User.findByPk(rideOffer.userId);
    }
  }

};