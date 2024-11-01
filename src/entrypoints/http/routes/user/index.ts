import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import {
  createUserRepo,
  getActivePlansRepo,
  getPurchasesRepo,
  getUserByUserId,
  getUserRepo,
  updateUserRepo,
} from '../../../../data-access/user.repo';
import {
  creaetUserRequestValidation,
  getActivePlansRequestValidation,
  getPurchasesRequestValidation,
  updateUserRequestValidation,
} from '../../../../domain/user/user.request-schema';
import {
  CreateUserBodyDocument,
  UpdateUserBodyDocument,
} from '../../../../types/user.types';
import {
  getUserIdFromRequestHeader,
  signToken,
} from '../../../../utils/auth-util';
import { createErrorResponse } from '../../../../utils/response';
var jwt = require('jsonwebtoken');

const UserAuth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/',
      { schema: creaetUserRequestValidation },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const body = req.body as CreateUserBodyDocument;

          let user = await getUserRepo(body.email as string);
          if (!user) {
            user = await createUserRepo(body);
          }

          const token = signToken(user?.userId!);

          return res.code(200).send({ user: user, token });
        } catch (error: any) {
          console.error(error);
          createErrorResponse(
            res,
            error?.message || 'Error createing user',
            error?.status,
          );
        }
      },
    )
    .put(
      '/:userId', // Route to update user
      { schema: updateUserRequestValidation },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const { userId } = req.params as { userId: string }; // Extract userId from params
          const body = req.body as Partial<UpdateUserBodyDocument>; // Use Partial to accept optional fields

          const updatedUser = await updateUserRepo(userId, body); // Assume updateUserRepo handles the update logic

          return res.code(200).send({ user: updatedUser });
        } catch (error: any) {
          console.error(error);
          createErrorResponse(
            res,
            error?.message || 'Error updating user',
            error?.status,
          );
        }
      },
    )
    .get(
      '/purchases',
      { schema: getPurchasesRequestValidation },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          const purchases = await getPurchasesRepo(user.userId);
          return res.code(200).send({ data: purchases, message: 'purchases' });
        } catch (error: any) {
          console.error(error);
          return res.code(500).send({ error: 'Internal Server Error' });
        }
      },
    )
    .get(
      '/active-plans',
      { schema: getActivePlansRequestValidation },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const user = getUserIdFromRequestHeader(req);
          const userDetails = await getUserByUserId(user?.userId);
          const activePlans = await getActivePlansRepo(userDetails?.email!); // Implement this function to fetch active plans
          return res
            .code(200)
            .send({ data: activePlans, message: 'active-plans' });
        } catch (error: any) {
          console.error(error);
          return res.code(500).send({ error: 'Internal Server Error' });
        }
      },
    );
};

export default UserAuth;
