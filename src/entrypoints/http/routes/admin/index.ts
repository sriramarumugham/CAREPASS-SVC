import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getAllActivePlans } from '../../../../data-access/policy.repo';
import { getAllTransactions } from '../../../../data-access/transaction.repo';
import {
  getAllActivePlansRequestSchema,
  getAllTransactionRequestSchema,
} from '../../../../domain/admin/admin-request.schema';
import { createErrorResponse } from '../../../../utils/response';

const AdminRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      '/transactions',
      { schema: getAllTransactionRequestSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const transactions = await getAllTransactions();
          return res.code(200).send({ data: transactions });
        } catch (error: any) {
          console.error('Error fetching transactions:', error);
          createErrorResponse(
            res,
            error?.message || 'Error fetching transactions',
            error?.status,
          );
        }
      },
    )
    .get(
      '/active-plans',
      { schema: getAllActivePlansRequestSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const activePlans = await getAllActivePlans();
          return res.code(200).send({ data: activePlans });
        } catch (error: any) {
          console.error('Error fetching active plans:', error);
          createErrorResponse(
            res,
            error?.message || 'Error fetching active plans',
            error?.status,
          );
        }
      },
    );
};

export default AdminRoutes;
