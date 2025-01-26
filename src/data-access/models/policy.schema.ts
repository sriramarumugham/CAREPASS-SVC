import mongoose, { Document, Schema } from 'mongoose';
import { ActivePlanType } from '../../types/policy.types';
import { userDetailsSchema } from './proposal.schema';

const ActivePlanSchema: Schema = new Schema(
  {
    planId: { type: String, required: true },
    proposalId: { type: String, required: true },
    purchasedDate: { type: Date, default: Date.now },
    transactionId: { type: String, required: true },
    userDetails: { type: userDetailsSchema, required: true },
    priceDetails: [
      {
        price: { type: Number, required: true },
      },
    ],
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

export const ActivePlanModel = mongoose.model<ActivePlanType>(
  'ActivePlan',
  ActivePlanSchema,
);
