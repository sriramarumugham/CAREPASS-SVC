import mongoose, { Document, Schema } from 'mongoose';
import { ProductType } from '../../types/product.type';
const mongooseProductSchema = new Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    price: { type: Number, required: true },
    pricePerBeneficiary: { type: Number, required: true },
    productStatus: { type: String, required: true },
    noOfDependent: { type: Number, required: true },
    subProducts: [{ type: String }],
    formSchema: [
      {
        sectionTitle: { type: String, required: true },
        fields: [
          {
            name: { type: String, required: true },
            label: { type: String, required: true },
            type: { type: String, required: true },
            required: { type: Boolean }, // Optional
            options: [
              {
                label: { type: String },
                value: { type: String },
              },
            ],
            maxCount: { type: Number },
            fields: [{ type: Schema.Types.Mixed }], // Use Mixed for nested fields
          },
        ],
      },
    ],
  },
  { timestamps: true },
);
// Create the Mongoose model
export const ProductModel = mongoose.model<ProductType>(
  'Product',
  mongooseProductSchema,
);

// Define TypeBox static type for validation
