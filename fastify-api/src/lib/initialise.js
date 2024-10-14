// Import the framework and instantiate it
import Fastify from 'fastify';
import { env } from '../env.js';

import middie from '@fastify/middie';
import cors from 'cors';

import dnsPrefetchControl from 'dns-prefetch-control';
import frameGuard from 'frameguard';
import hsts from 'hsts';
import ienoopen from 'ienoopen';
import xssProtection from 'x-xss-protection';
import Client from 'pg/lib/client.js';
import { getUnique } from './utils/global_reference.js';

console.log('initialise server');

export const client_pre = getUnique('db:client', () => {
  const cl = new Client({
    user: env.DATABASE_USER,
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_DATABASENAME,
  });

  cl.connect();
  return cl;
});

export const client = client_pre.data;

console.log(`connected to ${env.DATABASE_URL}`);

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};
const fastify_pre = getUnique('fastify', () =>
  Fastify({
    logger: envToLogger[env.NODE_ENV] ?? true,
  }),
);

export const fastify = fastify_pre.data;
await fastify.register(middie);
fastify.use(cors());
fastify.use(dnsPrefetchControl());
fastify.use(frameGuard());
fastify.use(hsts());
fastify.use(ienoopen());
fastify.use(xssProtection());
