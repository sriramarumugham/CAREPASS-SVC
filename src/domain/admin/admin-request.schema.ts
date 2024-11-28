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
