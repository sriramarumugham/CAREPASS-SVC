import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import { CreateUserBodySchema, UserSchema } from '../../types/user.types';

export const webhookTransactionValidation = {
  tags: ['payment-callback'],
  response: {
    200: Type.Object({
      message: Type.Optional(Type.String()),
    }),
    400: Type.Object({
      error: Type.String(),
    }),
    404: Type.Object({
      error: Type.String(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;
