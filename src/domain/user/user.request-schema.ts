import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import {
  CreateUserBodySchema,
  GetOtpBodySchema,
  UpdateUserBodySchema,
  UserSchema,
  ValidateOtpBodySchema,
} from '../../types/user.types';

export const creaetUserRequestValidation = {
  tags: ['user'],
  description: 'signin /signup new user',
  body: CreateUserBodySchema,
  response: {
    200: Type.Object({
      token: Type.String(),
      user: Type.Optional(UserSchema),
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

export const getPurchasesRequestValidation = {
  tags: ['user'],
  description: 'get user purchase history',
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Any(),
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

export const getActivePlansRequestValidation = {
  tags: ['user'],
  description: 'get active  plans',
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Any(),
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

export const updateUserRequestValidation = {
  tags: ['user'],
  description: 'Update user information',
  params: Type.Object({ userId: Type.String() }),
  body: UpdateUserBodySchema,
  response: {
    200: Type.Object({
      user: Type.Optional(UserSchema),
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

export const getOtpUserValidation = {
  tags: ['user'],
  description: 'get OTP ',
  body: GetOtpBodySchema,
  response: {
    200: Type.Object({
      message: Type.String(),
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

export const ValidateOtpValidation = {
  tags: ['user'],
  description: 'validate OTP ',
  body: ValidateOtpBodySchema,
  response: {
    200: Type.Object({
      token: Type.String(),
      user: Type.Optional(UserSchema),
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
