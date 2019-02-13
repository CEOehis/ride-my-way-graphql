import { generateToken, decodeToken, getAuthenticatedUser } from "../auth";

describe('auth util test', () => {
  describe('generateToken', () => {
    it('generates a jwt token', () => {
      const token = generateToken({}, '30m');
      expect(typeof token).toBe('string');
    });
  });

  describe('decodeToken', () => {
    it('decodes a valid token', async () => {
      const user = {
        id: '15',
        username: 'hanna',
        email: 'hannah@mail.com'
      };
      const token = generateToken(user, '10m');

      const {exp, iat, ...decoded} = await decodeToken(token);
      expect(decoded).toEqual(user);
    });

    it('returns an error object for invalid or expired tokens', async () => {
      expect(await decodeToken('some.invalid.token')).toBeInstanceOf(Error);
    });
  });

  describe('getAuthenticatedUser', () => {
    let req = {
      headers: {
        authorization: ''
      }
    };
    it('returns a falsy value if no token is provided', async () => {
      expect(await getAuthenticatedUser(req)).toBeUndefined();
    });

    it('returns an object', async () => {
      req.headers.authorization = 'some.token.here';

      expect(typeof await getAuthenticatedUser(req)).toBe('object');
    });
  });
});
