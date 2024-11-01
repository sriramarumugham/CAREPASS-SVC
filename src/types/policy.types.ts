import { Static, Type } from '@sinclair/typebox';
import { UserDetailsSchema } from './proposal.types';

const ActivePlanSchema = Type.Object({
  planId: Type.String(),
  proposalId: Type.String(),
  purchasedDate: Type.String({
    format: 'date-time',
    default: new Date().toISOString(),
  }),
  transactionId: Type.String(),
  userDetails: UserDetailsSchema,
  priceDetails: Type.Array(
    Type.Object({
      price: Type.Number(),
    }),
  ),
  createdBy: Type.String(),
});

// Static type for TypeScript
type ActivePlanType = Static<typeof ActivePlanSchema>;

export { ActivePlanSchema, ActivePlanType };
