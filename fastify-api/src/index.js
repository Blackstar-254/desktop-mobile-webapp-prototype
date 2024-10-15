import { fastify } from './lib/initialise.js';
import { env } from './env.js';
import { api_routes } from './routes/api/index.js';
// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

Object.keys(api_routes).map((key) => {
  fastify.get(key, api_routes[key]);
  console.log(`registered route: ${key}`);
});

// Run the server!
try {
  await fastify.listen({ port: env.API_PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
