import fastifyFormbody from '@fastify/formbody';
import { FastifyPluginAsync } from 'fastify';
import {
  getActivePlansByProposalId,
  insertActivePlans,
} from '../../../../data-access/policy.repo';
import { getProposalById } from '../../../../data-access/proposal.repo';
import {
  getTransactionByRazorpayOrderId,
  getTransactionByTransactionId,
  updateTransactionStatus,
} from '../../../../data-access/transaction.repo';
import { webhookTransactionValidation } from '../../../../domain/webhook/webhook.request.schema';
import { ProposalType } from '../../../../types/proposal.types';
const {
  validateWebhookSignature,
} = require('razorpay/dist/utils/razorpay-utils');

const WebhookRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(fastifyFormbody);
  fastify.post(
    '/',
    { schema: webhookTransactionValidation },
    async (req, res) => {
      try {
        console.log('Content-Type:', req.headers['content-type']);

        console.log('Request Body:', JSON.stringify(req.body, null, 2));

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          req.body as unknown as any;
        const secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const isValidSignature = validateWebhookSignature(
          body,
          razorpay_signature,
          secret,
        );

        if (!isValidSignature) {
          throw new Error('Invalid signature');
        }

        const transactinoDetails =
          await getTransactionByRazorpayOrderId(razorpay_order_id);
        if (!transactinoDetails) {
          throw new Error('Transatino details not found!');
        }

        await updateTransactionStatus(
          transactinoDetails.transactionId,
          'success',
          req.body as unknown as object,
        );

        const proposal = await getProposalById(transactinoDetails.proposalId);

        const activePlans = await getActivePlansByProposalId(
          proposal?.proposalId!,
        );
        if (!activePlans || activePlans.length == 0) {
          const resonse = await insertActivePlans(
            proposal as ProposalType,
            transactinoDetails.transactionId,
          );
        }
        return res.redirect(
          `${process.env.PAYMENT_GATEWAY_REDIRECTION_LINK}/${transactinoDetails.transactionId}`,
        );
      } catch (error: any) {
        console.error('Error processing webhook:', error);
        return res.code(500).send({ error: 'Internal server error' });
      }
    },
  );
};

export default WebhookRoute;
