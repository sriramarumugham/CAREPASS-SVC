import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { getAllActivePlans } from '../../../../data-access/policy.repo';
import { getAllTransactions } from '../../../../data-access/transaction.repo';
import {
  getAllActivePlansRequestSchema,
  getAllTransactionRequestSchema,
  loginRequestSchema,
} from '../../../../domain/admin/admin-request.schema';
import { createJWT, verifyJWT } from '../../../../utils/admin-auth.util';
import { createErrorResponse } from '../../../../utils/response';

const AdminRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .get(
      '/transactions',
      { schema: getAllTransactionRequestSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          authenticate(req, res);
          const transactions = await getAllTransactions();
          return res.code(200).send(transactions);
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
          authenticate(req, res);
          const activePlans = await getAllActivePlans();
          return res.code(200).send(activePlans);
        } catch (error: any) {
          console.error('Error fetching active plans:', error);
          createErrorResponse(
            res,
            error?.message || 'Error fetching active plans',
            error?.status,
          );
        }
      },
    )
    .post(
      '/login',
      { schema: loginRequestSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const { email, password } = req.body as {
            email: string;
            password: string;
          };

          const adminEmail = process.env.ADMIN_EMAIL || 'admin@carepass.com';
          const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

          if (email === adminEmail && password === adminPassword) {
            const token = createJWT({ email });
            return res.code(200).send({ token });
          }
          return res.code(401).send({ error: 'Invalid credentials' });
        } catch (error: any) {
          console.error('Error during login:', error);
          return res
            .code(500)
            .send({ error: error?.message || 'Error logging in' });
        }
      },
    );
};

export default AdminRoutes;

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.code(401).send({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.code(401).send({ error: 'Invalid token' });
  }
  try {
    // Verify token; attach decoded payload to req if needed.
    (req as any).user = verifyJWT(token);
  } catch (error) {
    return res.code(401).send({ error: 'Invalid token' });
  }
}
