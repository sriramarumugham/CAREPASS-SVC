import { Static, Type } from '@sinclair/typebox';

export const ProductSchema = Type.Object({
  productId: Type.String(),
  productName: Type.String(),
  productDescription: Type.String(),
  price: Type.Number(),
  pricePerBeneficiary: Type.Number(),
  productStatus: Type.String(),
  noOfDependent: Type.Number(),
  subProducts: Type.Array(Type.String()), // Array of sub-product IDs
  formSchema: Type.Array(
    Type.Object({
      sectionTitle: Type.String(),
      fields: Type.Array(
        Type.Object({
          name: Type.String(),
          label: Type.String(),
          type: Type.String(),
          required: Type.Boolean(),
          options: Type.Optional(
            Type.Array(
              Type.Object({
                label: Type.String(),
                value: Type.String(),
              }),
            ),
          ),
          maxCount: Type.Optional(Type.Number()), // Optional max count for array types
          fields: Type.Optional(
            Type.Array(
              Type.Object({
                name: Type.String(),
                label: Type.String(),
                type: Type.String(),
                required: Type.Boolean(),
                options: Type.Optional(
                  Type.Array(
                    Type.Object({
                      label: Type.String(),
                      value: Type.String(),
                    }),
                  ),
                ),
              }),
            ),
          ), // Nested fields for beneficiaries
        }),
      ),
    }),
  ),
});

export type ProductType = Static<typeof ProductSchema>;
