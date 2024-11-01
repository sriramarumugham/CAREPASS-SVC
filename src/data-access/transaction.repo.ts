import { EPaymentGateway } from '../types/transaction.types';
import { TransactionModel } from './models/transaction.schema';

export const createTransactionRepo = async (
  proposalId: string,
  status: string,
  amount: number,
  paymentGateway: EPaymentGateway,
  transactionId: string,
  paymentGatewayOrderResponse: Object,
) => {
  const transaction = new TransactionModel({
    proposalId,
    transactionStatus: status,
    amount: amount,
    paymentGateway,
    transactionId,
    paymentGatewayOrderResponse,
  });
  // Save the transaction to the database
  const savedTransaction = await transaction.save();

  // Return the saved transaction document
  return savedTransaction;
};

export const getTransactionByTransactionId = async (transactionId: string) => {
  return await TransactionModel.findOne({ transactionId: transactionId });
};

export const getTransactionByRazorpayOrderId = async (id: string) => {
  return await TransactionModel.findOne({
    'paymentGatewayOrderResponse.id': id,
  });
};

export const updateTransactionStatus = async (
  transactionId: string,
  newStatus: string,
  paymentGatewayPaymentResponse?: object,
) => {
  const updatedTransaction = await TransactionModel.findOneAndUpdate(
    { transactionId: transactionId },
    {
      transactionStatus: newStatus,
      paymentGatewayPaymentResponse: paymentGatewayPaymentResponse,
    },
    { new: true }, // Return the updated document
  );
  return updatedTransaction;
};

export const getAllTransactions = async () => {
  return await TransactionModel.aggregate([
    {
      $lookup: {
        from: 'proposals', // Collection name for proposals
        localField: 'proposalId',
        foreignField: 'proposalId',
        as: 'proposalDetails',
      },
    },
    {
      $unwind: '$proposalDetails', // Unwind to get the first matched proposal
    },
    {
      $lookup: {
        from: 'users', // Collection name for users
        localField: 'proposalDetails.createdBy', // Refer directly to `createdBy`
        foreignField: 'userId', // Match `userId` in the users collection
        as: 'userDetails1',
      },
    },
    {
      $unwind: {
        path: '$userDetails1',
        preserveNullAndEmptyArrays: true, // Optional, if no user is found, keep the transaction
      },
    },
    {
      $project: {
        proposalDetails: 0, // Exclude proposalDetails from the final output
      },
    },
  ]);
};
