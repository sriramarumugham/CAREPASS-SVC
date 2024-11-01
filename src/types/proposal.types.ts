import { Static, Type } from '@sinclair/typebox';

const BeneficiarySchema = Type.Object({
  fullName: Type.String(),
  age: Type.String(),
  relation: Type.String(),
  city: Type.String(),
});

const UserDetailsSchema = Type.Object({
  productId: Type.String(),
  fullName: Type.String(),
  age: Type.String(),
  primaryEmail: Type.String(),
  primaryMobile: Type.String(),
  beneficiaries: Type.Array(BeneficiarySchema),
});

const PriceDetailsSchema = Type.Object({
  price: Type.Number(),
});

const FormDetailSchema = Type.Object({
  priceDetails: PriceDetailsSchema,
  userDetails: UserDetailsSchema,
});

const ProposalSchema = Type.Object({
  proposalId: Type.String(),
  formDetails: Type.Array(FormDetailSchema),
  totalPrice: Type.Number(),
  createdBy: Type.String(),
});

type ProposalType = Static<typeof ProposalSchema>;
// Exporting TypeBox schemas
export {
  BeneficiarySchema,
  UserDetailsSchema,
  PriceDetailsSchema,
  FormDetailSchema,
  ProposalSchema,
  ProposalType,
};
