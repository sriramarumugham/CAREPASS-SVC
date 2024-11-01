import mongoose, { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {
  EPaymentGateway,
  ETransactionStatus,
  TransactionSchema,
} from '../../types/transaction.types';

const transactionSchema = new Schema({
  proposalId: { type: String, required: true },
  transactionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  transactionStatus: {
    type: String,
    enum: Object.values(ETransactionStatus), // Enum values
    required: true,
  },
  paymentGateway: {
    type: String,
    require: true,
    enum: Object.values(EPaymentGateway),
  },
  paymentGatewayOrderResponse: { type: Object },
  paymentGatewayPaymentResponse: { type: Object },
  amount: { type: Number, required: true },
});

export const TransactionModel = mongoose.model<TransactionSchema>(
  'Transaction',
  transactionSchema,
);
