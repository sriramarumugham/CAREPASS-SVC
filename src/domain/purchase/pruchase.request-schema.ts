import { Static, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';

// Define UserDetails schema
const UserDetailsSchema = Type.Object({
  productId: Type.String(),
  fullName: Type.String(),
  age: Type.String(),
  primaryEmail: Type.String(),
  primaryMobile: Type.String(),
  beneficiaries: Type.Optional(Type.Array(Type.Any())),
  criticalIllnessBeneficiary: Type.Optional(
    Type.Array(
      Type.Object({
        fullName: Type.String(),
        isSelected: Type.Boolean(),
        relation: Type.String(),
      }),
    ),
  ),
  superTopUpBeneficiary: Type.Optional(
    Type.Array(
      Type.Optional(
        Type.Object({
          fullName: Type.Any(),
          isSelected: Type.Any(),
          relation: Type.Any(),
        }),
      ),
    ),
  ),
  superTopUpInsurance: Type.Optional(
    Type.Array(
      Type.Optional(
        Type.Object({
          fullName: Type.Any(),
          isSelected: Type.Any(),
          relation: Type.Any(),
          id: Type.Any(),
        }),
      ),
    ),
  ),
});

// Define PriceDetails schema
const PriceDetailsSchema = Type.Object({
  price: Type.Number(),
});

// Define FormDetails schema
const FormDetailsSchema = Type.Object({
  priceDetails: PriceDetailsSchema,
  userDetails: UserDetailsSchema,
});

// Define the complete request body schema
export const CreateFormDataSchema = Type.Object({
  formDetails: Type.Array(FormDetailsSchema),
  totalPrice: Type.Number(),
});

export type CreateFormDataType = Static<typeof CreateFormDataSchema>;
// Define the validation for the API route
export const purchaseRequestBodyValicaiton = {
  tags: ['form/create'],
  // body: Type.Any(),
  response: {
    200: Type.Object({
      message: Type.String(),
      data: Type.Optional(Type.Any()), // Or any other properties you want to return
    }),
    400: Type.Object({
      error: Type.String(),
    }),
    500: Type.Object({
      error: Type.String(),
    }),
  },
} satisfies FastifySchema;
