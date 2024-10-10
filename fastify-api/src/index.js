import { fastify } from './lib/initialise/index.js';
import { env } from './env.js';
// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

// Run the server!
try {
  await fastify.listen({ port: env.API_PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
