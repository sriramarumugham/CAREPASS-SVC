import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';

export const getAllTransactionRequestSchema = {
  tags: ['admin'],
  response: {
    200: Type.Object({
      data: Type.Any(),
    }),
    404: Type.Any(),
    500: Type.Any(),
  },
} satisfies FastifySchema;

export const getAllActivePlansRequestSchema = {
  tags: ['admin'],
  response: {
    200: Type.Object({
      data: Type.Any(),
    }),
    404: Type.Object({
      error: Type.String(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;
