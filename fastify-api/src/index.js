import { fastify } from './lib/initialise.js';
import { env } from './env.js';
import { api_routes } from './routes/api/index.js';
// Declare a route
fastify.get('/', async function handler(request, reply) {
  return { hello: 'world' };
});

Object.keys(api_routes).map((key) => {
  const handler = api_routes[key];
  if (!key.includes('|')) {
    fastify.use(key, api_routes[key]);
    console.log(`registered route: ${key}`);
    return;
  }
  const [methods, route] = key.split('|');
  methods.split(',').map((meth) => {
    switch (meth) {
      case 'POST':
        {
          fastify.post(route, api_routes[key]);
        }
        break;
      case 'GET':
        {
          fastify.get(route, api_routes[key]);
        }
        break;
      default:
        console.log(`bad method|route: ${key}`);
        return;
    }
    console.log(`registered route: ${key}`);
  });
});

// Run the server!
try {
  await fastify.listen({ port: env.API_PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
