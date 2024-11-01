import { Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import { TransactionSchema } from '../../types/transaction.types';

export const getTransactionDetailsRequestValidation = {
  tags: ['transaction/gettransaction'],
  params: Type.Object({
    transactionId: Type.String(),
  }),
  response: {
    200: Type.Object({
      data: TransactionSchema,
    }),
    404: Type.Object({
      error: Type.String(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;
