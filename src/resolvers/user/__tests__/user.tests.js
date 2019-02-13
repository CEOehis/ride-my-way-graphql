import { runQuery } from '../../../../test/helpers';
import { User, sequelize } from '../../../database/models';

describe('User', () => {
  let user;
  beforeEach(async () => {
    const isTest = process.env.NODE_ENV === 'test';
    await sequelize.sync({ force: isTest});
    user = await User.create({
      username: 'testuser',
      fullName: 'test user',
      password: 'password',
      email: 'testuser@mail.com'
    });
  });

  it('should getUsers', async () => {
    const result = await runQuery(`
      {
        users: getUsers {
          id
          username
          fullName
          email
          phone
        }
      }
    `, {}, user);

    expect(result.errors).toBeUndefined();
    expect(typeof result.data.users).toEqual('object');
    expect(result.data.users[0].username).toEqual(user.username);
  });

  it('should return error for unathenticated user', async () => {
    const result = await runQuery(`
      {
        users: getUsers {
          id
          username
          fullName
          email
          phone
        }
      }
    `, {});

    expect(result.errors).toBeDefined();
    expect(result.errors[0].message).toEqual('You are not authenticated');
  });

  it('should sign up a user', async () => {
    const result = await runQuery(`
      mutation newUser($username: String!, $email: String!, $password: String!, $fullName: String!) {
        signUp(username: $username, email: $email, password: $password, fullName: $fullName) {
          user {
            id
            username
            email
          }
          token
        }
      }
    `, {username: 'newuser', email: 'nu@mail.com', password: 'password', fullName: 'New user'});

    expect(result.errors).toBeUndefined();
    expect(typeof result.data.signUp).toBe('object');
    expect(typeof result.data.signUp.token).toBe('string');
    expect(result.data.signUp.user).toHaveProperty('id', 'username', 'email');
  });

  it('should sign in a user', async () => {
    const result = await runQuery(`
      mutation login($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          user {
            id
            username
            email
          }
          token
        }
      }
    `, {email: 'testuser@mail.com', password: 'password'});

    expect(result.errors).toBeUndefined();
    expect(typeof result.data.signIn).toBe('object');
    expect(typeof result.data.signIn.token).toBe('string');
    expect(result.data.signIn.user).toHaveProperty('id', 'username', 'email')
  });

  it('should return error for invalid credentials', async () => {
    const result = await runQuery(`
      mutation login($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          user {
            id
            username
            email
          }
          token
        }
      }
    `, {email: 'unexistent@mail.com', password: 'password'});

    expect(result.errors).toBeDefined();
    expect(result.errors[0].message).toEqual('Invalid login or password');
  });

  it('should return error for invalid credentials', async () => {
    const result = await runQuery(`
      mutation login($email: String!, $password: String!) {
        signIn(email: $email, password: $password) {
          user {
            id
            username
            email
          }
          token
        }
      }
    `, {email: 'testuser@mail.com', password: 'invalidpassword'});

    expect(result.errors).toBeDefined();
    expect(result.errors[0].message).toEqual('Invalid login or password');
  });
});
