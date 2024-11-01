import { ProposalModel } from './models/proposal.schema';
const uuid = require('uuid');

export const createProposalRepo = async (proposalData: {
  formDetails: { beneficiaries: any[] };
  totalPrice: number;
  createdBy: string;
}) => {
  console.log('ITEMSSS___', proposalData.formDetails?.beneficiaries);
  const newProposal = new ProposalModel({
    proposalId: uuid.v4(),
    ...proposalData,
  });

  await newProposal.save();
  return newProposal;
};

export const getProposalById = async (proposalId: string) => {
  const proposal = await ProposalModel.findOne({ proposalId: proposalId });
  return proposal;
};
