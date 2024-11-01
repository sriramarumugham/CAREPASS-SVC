import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getTransactionByTransactionId } from '../../../../data-access/transaction.repo';
import { getTransactionDetailsRequestValidation } from '../../../../domain/transaction/transaction-request.schema';
import { createErrorResponse } from '../../../../utils/response';

const TransactionRoutes: FastifyPluginAsync = async (
  fastify,
): Promise<void> => {
  fastify.withTypeProvider<TypeBoxTypeProvider>().get(
    '/:transactionId',
    {
      schema: getTransactionDetailsRequestValidation,
    },
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        const params = req.params as { transactionId: string };
        const transactionId = params.transactionId;
        // Fetch transaction details from the database
        if (!transactionId) {
          return res.code(404).send({ error: 'Transaction not found' });
        }
        const response = await getTransactionByTransactionId(transactionId);

        if (!response) {
          return res.code(404).send({ error: 'Transaction not found' });
        }

        return res.code(200).send({ data: response });
      } catch (error: any) {
        console.error(error);
        createErrorResponse(
          res,
          error?.message || 'Error fetching transaction details',
          error?.status,
        );
      }
    },
  );
};

export default TransactionRoutes;
