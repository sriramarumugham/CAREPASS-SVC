import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync } from 'fastify';
import { createErrorResponse } from '../../../../utils/response';

const UserAuth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get('/', { schema: {} }, async (req: any, res) => {
      try {
        return { message: 'Care pass backend!' };
      } catch (error: any) {
        console.error(error);
        createErrorResponse(res, error?.message, error?.status);
      }
    });
};

export default UserAuth;
