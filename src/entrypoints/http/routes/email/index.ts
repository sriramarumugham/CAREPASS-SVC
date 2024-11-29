import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { sendEmailSchema } from '../../../../domain/admin/admin-request.schema';
// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

import { createErrorResponse } from '../../../../utils/response';

const EmailRoute: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify
    .withTypeProvider<TypeBoxTypeProvider>()
    .post(
      '/send-email',
      { schema: sendEmailSchema },
      async (req: FastifyRequest, res: FastifyReply) => {
        try {
          const { to, subject, text, html } = req.body as {
            to: string;
            subject: string;
            text?: string;
            html?: string;
          };
          await sendEmail({ to, subject, text, html });
          res.send({ success: true, message: 'Email sent successfully!' });
        } catch (error: any) {
          console.error('Error fetching transactions:', error);
          createErrorResponse(
            res,
            error?.message || 'Error fetching transactions',
            error?.status,
          );
        }
      },
    );
};

export default EmailRoute;

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string; // Recipient's email
  subject: string; // Email subject
  text?: string; // Plain text content
  html?: string; // HTML content
}): Promise<void> {
  try {
    const SMTP_CONFIG = {
      host: 'mail.carepass.in',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(SMTP_CONFIG);

    // Email options
    const mailOptions = {
      from: `"CarePass Support" <support@carepass.in>`, // Sender's email
      to,
      subject,
      text,
      html,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

// Hello  Mahantesh,
// PFB

// Email Id's

// Password

// support@carepass.in

// w$(o)rEIdqX6JP

// info@carepass.in

// JEMdZ;ZtD]V*H

// partners@carepass.in

// 09(hN1,sZ=xd

// SMTP : mail.carepass.in

// Port:  465
