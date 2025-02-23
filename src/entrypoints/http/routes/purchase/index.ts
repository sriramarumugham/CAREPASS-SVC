import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { randomUUID } from 'crypto';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { createProposalRepo } from '../../../../data-access/proposal.repo';
import { createTransactionRepo } from '../../../../data-access/transaction.repo';
import {
  CreateFormDataType,
  purchaseRequestBodyValicaiton,
} from '../../../../domain/purchase/pruchase.request-schema';
import {
  EPaymentGateway,
  ETransactionStatus,
} from '../../../../types/transaction.types';
import {
  getUserIdFromRequestHeader,
  verifyToken,
} from '../../../../utils/auth-util';
import { validatePurchaseData } from '../../../../utils/product';
const Razorpay = require('razorpay');

const Purchase: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/',
      { schema: purchaseRequestBodyValicaiton },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const user = getUserIdFromRequestHeader(req, res);

          const body = req.body as CreateFormDataType;

          console.log(`BODY__ ${JSON.stringify(body?.formDetails, null, 2)}`);
          await validatePurchaseData(body);
          const response = await createProposalRepo({
            createdBy: user?.userId!,
            formDetails: body.formDetails as any,
            totalPrice: body.totalPrice,
          });
          const transactionId = randomUUID();

          // todo remove hard coded values;
          const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
          });

          const options = {
            amount: body.totalPrice * 100,
            currency: 'INR',
            receipt: transactionId,
            payment_capture: 1,
          };

          const paymentGatewayOrderResponse =
            await razorpay.orders.create(options);

          const transaction = await createTransactionRepo(
            response.proposalId,
            ETransactionStatus.Initiated,
            body.totalPrice,
            EPaymentGateway.RAZORPAY,
            transactionId,
            paymentGatewayOrderResponse,
          );

          console.log('Transaction created transaction');
          return res.code(200).send({
            message: 'Order created!',
            data: {
              order_id: paymentGatewayOrderResponse.id,
              amount: paymentGatewayOrderResponse.amount,
              currency: paymentGatewayOrderResponse.currency,
              receipt: paymentGatewayOrderResponse.receipt,
            },
          });
        } catch (error: any) {
          console.error(error);
          return res
            .code(500)
            .send({ error: error.message || 'Internal Server Error' });
        }
      },
    );
};

export default Purchase;

//  creat  a new api called payment capture
