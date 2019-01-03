import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user, expiresIn) => {
  const { id, email, username } = user;
  return jwt.sign({ id, email, username }, process.env.SECRET, { expiresIn });
};

export const decodeToken = async (token) => {
  try {
    return await jwt.verify(token, process.env.SECRET);
  } catch (e) {
    throw new Error('Your session has expired');
  }
}

export const getAuthenticatedUser = async (req) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    return decodeToken(token);
  }
}
