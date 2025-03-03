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

export const getAllTransactions = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;

  const transactions = await TransactionModel.aggregate([
    {
      $lookup: {
        from: 'proposals',
        localField: 'proposalId',
        foreignField: 'proposalId',
        as: 'proposalDetails',
      },
    },
    { $unwind: '$proposalDetails' },
    {
      $lookup: {
        from: 'users',
        localField: 'proposalDetails.createdBy',
        foreignField: 'userId',
        as: 'userDetails1',
      },
    },
    {
      $unwind: {
        path: '$userDetails1',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        proposalDetails: 0,
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const total = await TransactionModel.countDocuments();

  return {
    data: transactions,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
