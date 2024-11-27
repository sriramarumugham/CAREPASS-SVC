import { FastifyReply, FastifyRequest } from 'fastify';

var jwt = require('jsonwebtoken');

export const signToken = (userId: string): string => {
  const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY!, {
    expiresIn: '24h',
  });
  return token;
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.SECRET_KEY!);
  return decoded;
};

export const getUserIdFromRequestHeader = (
  req: FastifyRequest,
  res: FastifyReply,
): { userId: string } | void => {
  console.log('Request body:', req?.body);

  const authHeader = req?.headers?.authorization;
  console.log('Authorization header:', authHeader);

  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1]; // Extract token part

  try {
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      res.status(401).send({ message: 'Unauthorized' });
      return;
    }
    return decodedToken; // Typed as { userId: string }
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }
};
