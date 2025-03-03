import { ProposalType } from '../types/proposal.types';
import { ActivePlanModel } from './models/policy.schema';
const uuid = require('uuid');

export const insertActivePlans = async (
  proposalData: ProposalType,
  transactionId: string,
) => {
  const { proposalId, formDetails, createdBy } = proposalData;
  const activePlans = formDetails.map((detail) => ({
    planId: uuid.v4(),
    proposalId,
    purchasedDate: new Date(), // Set the current date as the purchase date
    transactionId: transactionId, // Set this later if you have a transaction ID
    userDetails: detail.userDetails,
    priceDetails: [{ price: detail.priceDetails.price }],
    createdBy,
  }));
  // Insert the documents into the ActivePlanModel
  const result = await ActivePlanModel.insertMany(activePlans);
  return result; // Return the inserted documents
};

export const getActivePlansByProposalId = async (proposalId: string) => {
  return await ActivePlanModel.find({ proposalId: proposalId });
};

export const getAllActivePlans = async (
  page: number = 1,
  limit: number = 10,
) => {
  const skip = (page - 1) * limit;

  const activePlans = await ActivePlanModel.find().skip(skip).limit(limit);

  const total = await ActivePlanModel.countDocuments();

  return {
    data: activePlans,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
