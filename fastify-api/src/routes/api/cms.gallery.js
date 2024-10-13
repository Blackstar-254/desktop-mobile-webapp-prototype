import { users } from '../../lib/db/users.js';
import { fastify } from 'fastify';
import fs from 'fs';
/**
 * @typedef {import("fastify").RouteHandlerMethod} RouteHandlerMethod
 *
 */

const gallery_static_dir = 'public/gallery';
if (!fs.existsSync(gallery_static_dir)) {
  fs.mkdirSync(gallery_static_dir, { recursive: true });
}

Object.keys(users.data).map((user_id, i) => {
  const gallery_user_dir = `${gallery_static_dir}/${user_id}`;
  if (!fs.existsSync(gallery_user_dir)) {
    fs.mkdirSync(gallery_user_dir, { recursive: true });
  }
});

/**
 * @type {Record<string, RouteHandlerMethod>}
 */
export const gallery_routes = {
  '/api/cms/gallery': async function handler(request, reply) {
    const { body, method, url, headers } = request;
    const { 'client-id': client_id, 'visitor-id': visitor_id } = headers;

    if (!client_id || !visitor_id) {
      return { success: false };
    }
    const user = users.data[client_id];

    console.log({ method, url, headers, user, client_id });
    return { success: false };
  },
};
