import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';

import { ProductSchema } from '../../types/product.type';

export const creaetProductRequestValidation = {
  tags: ['product'],
  body: Type.Array(Type.Any()),
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

export const getProductReqeustValidation = {
  tags: ['product'],
  response: {
    200: Type.Object({
      products: Type.Array(Type.Any()),
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
