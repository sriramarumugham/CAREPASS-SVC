import {
  CreateUserBodyDocument,
  UpdateUserBodyDocument,
  UserDocument,
} from '../types/user.types';
import { ActivePlanModel } from './models/policy.schema';
import { userModel } from './models/user.schema';

const createUserRepo = async (
  body: CreateUserBodyDocument,
): Promise<UserDocument | null> => {
  return await userModel.create(body);
};

const updateUserRepo = async (
  userId: string,
  body: Partial<UpdateUserBodyDocument>,
): Promise<UserDocument | null> => {
  // Update the user document by userId and return the updated document
  return await userModel.findOneAndUpdate(
    { userId },
    { $set: body }, // Use $set to update only the provided fields
    { new: true }, // Return the updated document and run validators
  );
};

const getUserRepo = async (email: string): Promise<UserDocument | null> => {
  return await userModel.findOne({ email: email });
};
const getUserByUserId = async (
  userId: string,
): Promise<UserDocument | null> => {
  return await userModel.findOne({ userId: userId });
};

const getActivePlansRepo = async (email: string) => {
  return await ActivePlanModel.aggregate([
    {
      $match: { 'userDetails.primaryEmail': email },
    },
    {
      $lookup: {
        from: 'products', // Collection name for ProductModel
        localField: 'userDetails.productId', // Field from ActivePlan to match with Product
        foreignField: 'productId', // Field from Product to match
        as: 'productDetails', // Name for the joined data
      },
    },
    {
      $unwind: '$productDetails', // Unwind to treat array result as a single object
    },
    {
      $project: {
        planId: 1,
        proposalId: 1,
        purchasedDate: 1,
        transactionId: 1,
        userDetails: 1,
        priceDetails: 1,
        createdBy: 1,
        productName: '$productDetails.productName', // Get the productName
      },
    },
  ]);
};
const getPurchasesRepo = async (userId: string) => {
  return await ActivePlanModel.aggregate([
    {
      $match: { createdBy: userId },
    },
    {
      $lookup: {
        from: 'products', // Collection name for ProductModel
        localField: 'userDetails.productId', // Field from ActivePlan to match with Product
        foreignField: 'productId', // Field from Product to match
        as: 'productDetails', // Name for the joined data
      },
    },
    {
      $unwind: '$productDetails', // Unwind to treat array result as a single object
    },
    {
      $project: {
        planId: 1,
        proposalId: 1,
        purchasedDate: 1,
        transactionId: 1,
        userDetails: 1,
        priceDetails: 1,
        createdBy: 1,
        productName: '$productDetails.productName', // Get the productName
      },
    },
  ]);
};

export {
  getUserRepo,
  createUserRepo,
  getPurchasesRepo,
  getActivePlansRepo,
  getUserByUserId,
  updateUserRepo,
};
