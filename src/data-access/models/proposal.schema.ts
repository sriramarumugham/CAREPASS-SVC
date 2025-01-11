import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const beneficiarySchema = new Schema({
  fullName: { type: String, required: true },
  age: { type: String, required: true },
  relation: { type: String, required: true },
  city: { type: String },
});

export const criticalBeneficiarySchema = new Schema({
  fullName: { type: String, required: true },
  isSelected: { type: Boolean },
});
criticalBeneficiarySchema.pre('save', function (next) {
  if (this.id && !mongoose.Types.ObjectId.isValid(this.id)) {
    this.id = new mongoose.Types.ObjectId();
  }
  next();
});

export const userDetailsSchema = new Schema({
  productId: { type: String, required: true },
  fullName: { type: String, required: true },
  age: { type: String, required: true },
  primaryEmail: { type: String, required: true },
  primaryMobile: { type: String, required: true },
  beneficiaries: { type: [beneficiarySchema], default: [] },
  superTopUpInsurance: { type: String },
  sumAssured: { type: String },
  criticalIllnessBeneficiary: {
    type: [criticalBeneficiarySchema],
    default: [],
  },
});

const priceDetailsSchema = new Schema({
  price: { type: Number, required: true },
});

const formDetailSchema = new Schema({
  priceDetails: { type: priceDetailsSchema, required: true },
  userDetails: { type: userDetailsSchema, required: true },
});

const proposalSchema = new Schema(
  {
    proposalId: { type: String, default: uuidv4 },
    formDetails: { type: [formDetailSchema], required: true },
    totalPrice: { type: Number, required: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true },
);

// Exporting the model
export const ProposalModel = mongoose.model('Proposal', proposalSchema);
