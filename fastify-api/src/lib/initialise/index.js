// Import the framework and instantiate it
import Fastify from 'fastify';
import postgres from 'postgres';
import { env } from '../../env.js';

import middie from '@fastify/middie';
import cors from 'cors';

import dnsPrefetchControl from 'dns-prefetch-control';
import frameGuard from 'frameguard';
import hsts from 'hsts';
import ienoopen from 'ienoopen';
import xssProtection from 'x-xss-protection';

console.log('initialise server');

export const client = await postgres(env.DATABASE_URL);
console.log(`connected to ${env.DATABASE_URL}`);
export const fastify = Fastify({
  logger: true,
});

await fastify.register(middie);
fastify.use(cors());
fastify.use(dnsPrefetchControl());
fastify.use(frameGuard());
fastify.use(hsts());
fastify.use(ienoopen());
fastify.use(xssProtection());
