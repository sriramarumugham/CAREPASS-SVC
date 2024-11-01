import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductType } from '../types/product.type';
import { ProductModel } from './models/product.schem';

// export async function insertOrUpdateProducts(
//   req: FastifyRequest,
//   reply: FastifyReply,
// ) {
//   const products = req.body; // Expecting an array of products

//   let session;

//   try {
//     // Start a session for atomic operation
//     session = await ProductModel.startSession();
//     session.startTransaction();

//     // Step 1: Delete all existing products
//     await ProductModel.deleteMany({}, { session });

//     // Step 2: Insert new products in bulk
//     await ProductModel.insertMany(products, { session });

//     // Commit transaction
//     await session.commitTransaction();
//     session.endSession();

//     return reply.send({
//       message: 'Products collection overridden successfully',
//     });
//   } catch (error) {
//     if (session) {
//       // If an error occurs, abort transaction and end session
//       await session.abortTransaction();
//       session.endSession();
//     }

//     return reply
//       .status(500)
//       .send({ error: 'Failed to override products collection' });
//   }
// }

export const insertOrUpdateProducts = async (products: ProductType[]) => {
  let session;

  try {
    // Start a session for atomic operation
    session = await ProductModel.startSession();
    session.startTransaction();

    // Step 1: Delete all existing products
    await ProductModel.deleteMany({}, { session });

    // Step 2: Insert new products in bulk
    await ProductModel.insertMany(products, { session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    if (session) {
      // If an error occurs, abort transaction and end session
      await session.abortTransaction();
      session.endSession();
    }
    throw error;
  }
};
export const getAllProducts = async (): Promise<ProductType[] | null> => {
  return await ProductModel.find();
};
export const fetchProductsByIds = async (productIds: string[]) => {
  return await ProductModel.find({ productId: { $in: productIds } });
};
