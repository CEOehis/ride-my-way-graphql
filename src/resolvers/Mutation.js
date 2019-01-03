import { generateToken } from '../utils/auth';

module.exports = {
  signUp: async function signUp(parent, args, { models }) {
    const { username, fullName, email, password } = args;
    const user = await models.User.create({
      username,
      fullName,
      email,
      password,
    });

    const token = generateToken(user, '30m');

    return {
      user,
      token,
    };
  },

  signIn: async function signIn(parent, args, { models }) {
    const { email, password } = args;
    const user = await models.User.findOne({
      where: {
        email,
      }
    });

    if(!user) {
      throw new Error('Invalid login or password');
    }

    const isValid = await user.validatePassword(password);

    if(!isValid) {
      throw new Error('Invalid login or password');
    }

    const token = generateToken(user, '30m');

    return {
      user,
      token,
    };
  }
};