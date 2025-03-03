import * as jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'supersecret';

export const createJWT = (payload: object, expiresIn = '1h'): string => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

export const verifyJWT = (token: string): any => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
