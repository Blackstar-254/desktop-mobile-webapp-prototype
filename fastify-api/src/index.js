import { fastify } from './lib/initialise/index.js';
import { env } from './env.js';
import { getUnique } from './lib/utils/global_reference.js';
import { make_query } from './lib/db/common_queries.js';
import { users } from './lib/db/users.js';
import { gallery_routes } from './routes/api/cms.gallery.js';
// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

Object.keys(gallery_routes).map((key) => {
  fastify.get(key, gallery_routes[key]);
});

// Run the server!
try {
  await fastify.listen({ port: env.API_PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
