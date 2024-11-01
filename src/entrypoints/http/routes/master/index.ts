import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  getAllProducts,
  insertOrUpdateProducts,
} from '../../../../data-access/product.repo';
import {
  creaetProductRequestValidation,
  getProductReqeustValidation,
} from '../../../../domain/master/master.request-schema';
import { creaetUserRequestValidation } from '../../../../domain/user/user.request-schema';
import { ProductType } from '../../../../types/product.type';
import { CreateUserBodyDocument } from '../../../../types/user.types';
import { createErrorResponse } from '../../../../utils/response';
var jwt = require('jsonwebtoken');

const UserAuth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/product',
      { schema: creaetProductRequestValidation },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const body = req.body as ProductType[];

          console.log('body___', body);

          await insertOrUpdateProducts(body);

          return res.code(200).send({ message: 'Inserted successfully!' });
        } catch (error: any) {
          console.error(error);
          createErrorResponse(
            res,
            error?.message || 'Error inserthing productr',
            error?.status,
          );
        }
      },
    )
    .get(
      '/product',
      { schema: getProductReqeustValidation },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const products = await getAllProducts();
          return res.code(200).send({ products: products });
        } catch (error: any) {
          console.error(error);
          createErrorResponse(
            res,
            error?.message || 'Error inserthing productr',
            error?.status,
          );
        }
      },
    );
};

export default UserAuth;
