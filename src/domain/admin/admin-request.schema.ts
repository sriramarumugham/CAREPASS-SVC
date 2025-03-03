import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';

export const getAllTransactionRequestSchema = {
  tags: ['admin'],
  querystring: Type.Object({
    page: Type.Optional(Type.Number({ minimum: 1 })),
    limit: Type.Optional(Type.Number({ minimum: 1 })),
  }),
  response: {
    200: Type.Object({
      data: Type.Array(Type.Any()),
      total: Type.Number(),
      page: Type.Number(),
      totalPages: Type.Number(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;

export const getAllActivePlansRequestSchema = {
  tags: ['admin'],
  querystring: Type.Object({
    page: Type.Optional(Type.Number({ minimum: 1 })),
    limit: Type.Optional(Type.Number({ minimum: 1 })),
  }),
  response: {
    200: Type.Object({
      data: Type.Array(Type.Any()),
      total: Type.Number(),
      page: Type.Number(),
      totalPages: Type.Number(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;

export const sendEmailSchema = {
  tags: ['admin'],
  body: Type.Object({
    to: Type.String(), // Recipient's email
    subject: Type.String(), // Email subject
    text: Type.Optional(Type.String()), // Plain text content
    html: Type.Optional(Type.String()), // HTML content
  }),
  response: {
    200: Type.Any(),
    400: Type.Object({
      error: Type.String(), // Validation error message
    }),
    500: Type.Object({
      error: Type.String(), // Server error message
    }),
  },
} satisfies FastifySchema;

export const loginRequestSchema = {
  tags: ['auth'],
  body: Type.Object({
    // email: Type.String({ format: 'email' }),
    // password: Type.String({ minLength: 6 }),
  }),
  response: {
    200: Type.Object({
      token: Type.String(),
    }),
    401: Type.Object({
      error: Type.String(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;
