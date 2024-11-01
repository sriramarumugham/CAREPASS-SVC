import { FastifyRequest } from 'fastify';

var jwt = require('jsonwebtoken');

export const signToken = (userId: string): string => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY!, {
    expiresIn: '24h',
  });
  return token;
};

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const getUserIdFromRequestHeader = (
  req: FastifyRequest,
): { userId: string } => {
  console.log('requst-body--', req.body);
  const authHeader = req.headers.authorization;

  console.log('authHeader--', authHeader);
  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1]; // Get the token part
  const decodedToken = verifyToken(token);
  return decodedToken as { userId: string };
};
