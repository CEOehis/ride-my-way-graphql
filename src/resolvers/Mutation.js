module.exports = {
  signUp: async function signUp(parent, args, { models }, info) {
    const { username, fullName, email, password } = args
    const user = await models.User.create({
      username,
      fullName,
      email,
      password,
    });

    return user;
  }
};