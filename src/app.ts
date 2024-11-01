import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload';
import cors from '@fastify/cors';
import { config } from 'dotenv';

import { FastifyPluginAsync } from 'fastify';

import { join } from 'path';

import { TypeBoxValidatorCompiler } from '@fastify/type-provider-typebox';
import { createNamespace } from 'cls-hooked';
import { connectDb } from './data-access/db/db.config';
config();
export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

const currentUserNameSpace = createNamespace('current-user');
const updateCurrentUserNameSpace = (key: string, value: any) => {
  currentUserNameSpace.set(key, value);
};

import formBody from '@fastify/formbody';

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts,
): Promise<void> => {
  void fastify.setValidatorCompiler(TypeBoxValidatorCompiler);

  await fastify.register(cors, {
    origin: ['*'],
    allowedHeaders: '*',
  });
  // await fastify.register(formBody);

  void fastify.register(AutoLoad, {
    dir: join(__dirname, './plugins'),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, './entrypoints/http/routes'),
    options: { ...options, prefix: 'carepass/api/v1' },
  });

  connectDb();
  config();
};

export default app;
export { app, options, currentUserNameSpace };
