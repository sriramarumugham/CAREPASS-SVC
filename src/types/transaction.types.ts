import { Static, Type } from '@sinclair/typebox';
import { v4 as uuidv4 } from 'uuid';

// Define the enum for transaction status
export enum ETransactionStatus {
  Initiated = 'initiated',
  Success = 'success',
  Failure = 'failure',
  Reversed = 'reversed',
}

export enum EPaymentGateway {
  RAZORPAY = 'RAZORPAY',
}

// TypeBox schema for Transaction
export const TransactionSchema = Type.Object({
  proposalId: Type.String(),
  transactionId: Type.String({ default: uuidv4() }),
  createdAt: Type.String({
    format: 'date-time',
    default: new Date().toISOString(),
  }),
  paymentGateway: Type.Enum(EPaymentGateway),
  paymentGatewayOrderResponse: Type.Any(),
  paymentGatewayPaymentResponse: Type.Optional(Type.Any()),
  transactionStatus: Type.Enum(ETransactionStatus),
  amount: Type.Number(), // Enum for status
});

export type TransactionSchema = Static<typeof TransactionSchema>;
